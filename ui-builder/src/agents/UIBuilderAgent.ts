import Anthropic from '@anthropic-ai/sdk';
import { v4 as uuidv4 } from 'uuid';
import type { DesignSystemHTTP, Component as MCPComponent } from '../services/DesignSystemHTTP.js';
import { DesignSystemTools } from '../tools/DesignSystemTools.js';

// UI Builder specific types

// UI Builder types
interface ComponentProperty {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  default?: any;
  options?: string[];
}

interface Component {
  name: string;
  tagName: string;
  description: string;
  variants?: string[];
  props: ComponentProperty[];
  examples: Array<{
    title: string;
    description: string;
    code: string;
  }>;
  slots?: Array<{ name: string; description: string }>;
  usage_frequency?: number;
}

interface TemplateValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  correctedCode?: string;
}

interface GenerationResult {
  conversationId: string;
  code: string;
  framework: string;
  components: string[];
  preview: {
    framework: string;
    hasStyles: boolean;
    hasInteractivity: boolean;
    componentCount: number;
    linesOfCode: number;
  };
  validation: TemplateValidationResult;
  metadata: {
    timestamp: Date;
    prompt: string;
    framework: string;
  };
}

interface RefinementResult {
  code: string;
  framework: string;
  components: string[];
  preview: {
    framework: string;
    hasStyles: boolean;
    hasInteractivity: boolean;
    componentCount: number;
    linesOfCode: number;
  };
  validation: TemplateValidationResult;
  changes: {
    linesAdded: number;
    linesRemoved: number;
    significantChange: boolean;
  };
  metadata: {
    timestamp: Date;
    feedback: string;
    framework: string;
  };
}

interface ProgressCallback {
  (progress: { stage: string; message: string }): void;
}

interface ConversationEntry {
  messages: Array<{ role: string; content: string }>;
  framework: string;
  timestamp: Date;
}

export class UIBuilderAgent {
  private designSystemHTTP: DesignSystemHTTP;
  private designSystemTools: DesignSystemTools;
  private conversations: Map<string, ConversationEntry> = new Map();
  private anthropic: Anthropic;
  private componentLibraryCache: string | null = null;

  constructor(designSystemHTTP: DesignSystemHTTP) {
    this.designSystemHTTP = designSystemHTTP;
    this.designSystemTools = new DesignSystemTools(designSystemHTTP);

    // Verify API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }

    // Initialize Anthropic client with extended timeout
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      timeout: 300000, // 5 minutes timeout
      maxRetries: 3
    });
  }

  private async getRelevantComponents(prompt: string, availableComponents: any[]): Promise<string> {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const componentFilePath = path.join(process.cwd(), '..', 'mcp-server-deployment', 'cre8-wc-components.md');
      const fullLibrary = fs.readFileSync(componentFilePath, 'utf8');
      
      // Start with full component list from MCP
      let result = 'AVAILABLE CRE8 WEB COMPONENTS:\n\n';
      availableComponents.forEach(comp => {
        result += `- ${comp.tagName}: ${comp.description}\n`;
      });
      
      // Identify likely components needed based on prompt keywords
      const neededComponents = this.identifyNeededComponents(prompt);
      
      // Search for specific component documentation for the most relevant ones
      result += '\n\nDETAILED DOCUMENTATION FOR RELEVANT COMPONENTS:\n\n';
      
      for (const componentName of neededComponents.slice(0, 5)) { // Limit to 5 most relevant
        const componentDoc = this.extractComponentDocumentation(fullLibrary, componentName);
        if (componentDoc) {
          result += componentDoc + '\n\n';
        }
      }
      
      // Add basic usage patterns
      result += this.getBasicUsagePatterns();
      
      return result;
    } catch (error) {
      console.error('Failed to load component library:', error);
      // Fallback to just the MCP component list
      let result = 'AVAILABLE CRE8 WEB COMPONENTS:\n\n';
      availableComponents.forEach(comp => {
        result += `- ${comp.tagName}: ${comp.description}\n`;
      });
      return result + '\n\n' + this.getBasicUsagePatterns();
    }
  }

  private identifyNeededComponents(prompt: string): string[] {
    const prompt_lower = prompt.toLowerCase();
    const components = new Set<string>();
    
    // Map keywords to component names
    const keywordMap: { [key: string]: string[] } = {
      'button': ['button'],
      'click': ['button'],
      'submit': ['button'],
      'form': ['field', 'button'],
      'input': ['field'],
      'email': ['field'],
      'text': ['field'],
      'password': ['field'],
      'card': ['card'],
      'container': ['card'],
      'box': ['card'],
      'alert': ['alert'],
      'message': ['alert'],
      'notification': ['alert'],
      'error': ['alert'],
      'success': ['alert'],
      'warning': ['alert'],
      'modal': ['modal'],
      'dialog': ['modal'],
      'popup': ['modal'],
      'overlay': ['modal'],
      'tab': ['tabs'],
      'navigation': ['tabs', 'dropdown'],
      'menu': ['dropdown'],
      'dropdown': ['dropdown'],
      'select': ['dropdown', 'select'],
      'icon': ['icon'],
      'badge': ['badge'],
      'status': ['badge'],
      'tag': ['badge'],
      'loading': ['loading-spinner'],
      'spinner': ['loading-spinner'],
      'table': ['table'],
      'list': ['list'],
      'grid': ['grid'],
      'layout': ['layout', 'grid']
    };
    
    // Check for keywords in prompt
    for (const [keyword, componentNames] of Object.entries(keywordMap)) {
      if (prompt_lower.includes(keyword)) {
        componentNames.forEach(comp => components.add(comp));
      }
    }
    
    // Always include common components
    components.add('button');
    components.add('card');
    
    return Array.from(components);
  }

  private extractComponentDocumentation(fullLibrary: string, componentName: string): string | null {
    // Search for component section in markdown
    const sectionPattern = new RegExp(`## ${componentName}([\\s\\S]*?)(?=## |$)`, 'i');
    const match = fullLibrary.match(sectionPattern);
    
    if (match) {
      const section = match[1].trim();
      // Extract just the properties table and basic info, skip verbose descriptions
      const propsMatch = section.match(/### Properties([\s\S]*?)(?=### |---|$)/);
      
      let result = `cre8-${componentName}:\n`;
      
      if (propsMatch) {
        const propsTable = propsMatch[1];
        // Extract property names and types from table
        const propRows = propsTable.match(/\| `([^`]+)` \| ([^|]+) \| ([^|]+) \|/g);
        
        if (propRows) {
          result += 'Properties:\n';
          propRows.slice(0, 8).forEach(row => { // Limit to 8 props to save tokens
            const propMatch = row.match(/\| `([^`]+)` \| ([^|]+) \| ([^|]+) \|/);
            if (propMatch) {
              const [, name, type, desc] = propMatch;
              result += `  - ${name}: ${type.trim()} - ${desc.trim().substring(0, 80)}...\n`;
            }
          });
        }
      }
      
      return result;
    }
    
    return null;
  }

  private getBasicUsagePatterns(): string {
    return `USAGE PATTERNS:
- All components use kebab-case: <cre8-button>, <cre8-card>, <cre8-field>
- Common props: variant, size, disabled, text, href
- Common slots: header, body, footer (for cards, modals)
- Button variants: primary, secondary, tertiary
- Sizes: sm, md, lg
- Use kebab-case attributes: full-width="true", not fullWidth="true"

EXAMPLES:
<cre8-button text="Click Me" variant="primary"></cre8-button>
<cre8-card>
  <div slot="header">Title</div>
  <div slot="body">Content</div>
</cre8-card>
<cre8-field label="Email" type="email" required="true"></cre8-field>`;
  }

  async generateUI(
    prompt: string,
    framework: string = 'html',
    progressCallback?: ProgressCallback
  ): Promise<GenerationResult> {
    const conversationId = uuidv4();

    try {
      // Step 1: Analyze requirements
      if (progressCallback) {
        progressCallback({ stage: 'analyzing', message: 'Analyzing UI requirements...' });
      }

      // Step 2: Get component list from MCP and relevant details from markdown
      if (progressCallback) {
        progressCallback({ stage: 'components', message: 'Fetching component list...' });
      }

      const availableComponents = await this.designSystemHTTP.listComponents();
      const componentLibrary = await this.getRelevantComponents(prompt, availableComponents);

      // Step 3: Generate UI code
      if (progressCallback) {
        progressCallback({ stage: 'generating', message: 'Generating UI code...' });
      }

      const systemPrompt = await this.buildSystemPrompt(framework, componentLibrary);
      const userPrompt = this.buildUserPrompt(prompt, framework);

      // Generate UI using Anthropic SDK
      const fullResponse = await this.queryAnthropic(userPrompt, systemPrompt);
      const generatedCode = this.extractCodeFromResponse(fullResponse);

      // Step 4: Basic validation (no API calls)
      let finalCode = generatedCode;

      // Skip template validation to avoid timeouts - agent prompts are sufficient
      const templateValidation = { isValid: true, errors: [], warnings: [], correctedCode: undefined };

      // Step 4: Validate and enhance code
      if (progressCallback) {
        progressCallback({ stage: 'validating', message: 'Validating generated code...' });
      }

      const validatedCode = await this.validateAndEnhanceCode(finalCode, framework);

      // Store conversation
      this.conversations.set(conversationId, {
        messages: [
          { role: 'user', content: userPrompt },
          { role: 'assistant', content: fullResponse }
        ],
        framework,
        timestamp: new Date()
      });

      if (progressCallback) {
        progressCallback({ stage: 'complete', message: 'UI generation complete!' });
      }

      return {
        conversationId,
        code: validatedCode,
        framework,
        components: this.extractUsedComponents(validatedCode),
        preview: this.generatePreviewData(validatedCode, framework),
        validation: templateValidation,
        metadata: {
          timestamp: new Date(),
          prompt: prompt,
          framework: framework
        }
      };

    } catch (error) {
      console.error('Error in generateUI:', error);
      throw new Error(`Failed to generate UI: ${(error as Error).message}`);
    }
  }

  async refineUI(
    code: string,
    feedback: string,
    framework: string = 'html',
    progressCallback?: ProgressCallback
  ): Promise<RefinementResult> {
    try {
      if (progressCallback) {
        progressCallback({ stage: 'analyzing', message: 'Analyzing feedback...' });
      }

      const availableComponents = await this.designSystemHTTP.listComponents();
      const componentLibrary = await this.getRelevantComponents(feedback, availableComponents);
      const systemPrompt = await this.buildRefinementSystemPrompt(framework, componentLibrary);
      const userPrompt = this.buildRefinementUserPrompt(code, feedback, framework);

      if (progressCallback) {
        progressCallback({ stage: 'refining', message: 'Applying improvements...' });
      }

      // Refine UI using Anthropic SDK
      const fullResponse = await this.queryAnthropic(userPrompt, systemPrompt);
      const refinedCode = this.extractCodeFromResponse(fullResponse);

      // Skip template validation for refinement to avoid timeouts
      let finalCode = refinedCode;
      const templateValidation = { isValid: true, errors: [], warnings: [], correctedCode: undefined };

      const validatedCode = await this.validateAndEnhanceCode(finalCode, framework);

      if (progressCallback) {
        progressCallback({ stage: 'complete', message: 'UI refinement complete!' });
      }

      return {
        code: validatedCode,
        framework,
        components: this.extractUsedComponents(validatedCode),
        preview: this.generatePreviewData(validatedCode, framework),
        validation: templateValidation,
        changes: this.analyzeChanges(code, validatedCode),
        metadata: {
          timestamp: new Date(),
          feedback: feedback,
          framework: framework
        }
      };

    } catch (error) {
      console.error('Error in refineUI:', error);
      throw new Error(`Failed to refine UI: ${(error as Error).message}`);
    }
  }

  private async queryAnthropic(
    prompt: string,
    systemPrompt: string
  ): Promise<string> {
    // No tools needed - all component info is embedded in system prompt
    const response = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const content = response.content[0];
    return content.type === 'text' ? content.text : '';
  }

  private async handleToolCalls(response: any, originalPrompt: string, systemPrompt: string, depth: number = 0): Promise<string> {
    // Add delay between recursive calls to prevent gateway timeouts
    if (depth > 0) {
      const delay = Math.min(1000 * Math.pow(1.5, depth - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    console.log(`🔄 HandleToolCalls depth ${depth} - Processing ${response.content.filter((c: any) => c.type === 'tool_use').length} tool calls`);
    
    const messages = [
      { role: 'user', content: originalPrompt },
      { role: 'assistant', content: response.content }
    ];

    // Batch process all tool calls in parallel for speed
    const toolCalls = response.content.filter((content: any) => content.type === 'tool_use');
    const toolResults = await Promise.allSettled(
      toolCalls.map(async (content: any) => {
        try {
          const toolResult = await this.designSystemTools.handleToolCall(content.name, content.input);
          const formattedResult = this.designSystemTools.formatToolResult(content.name, toolResult);
          return {
            tool_use_id: content.id,
            content: formattedResult,
            success: true
          };
        } catch (error) {
          console.error(`Error executing tool ${content.name}:`, error);
          return {
            tool_use_id: content.id,
            content: `Error: ${(error as Error).message}`,
            success: false
          };
        }
      })
    );

    // Add all tool results to messages
    toolResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        messages.push({
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: result.value.tool_use_id,
              content: result.value.content,
              is_error: !result.value.success
            }
          ]
        });
      } else {
        const toolCall = toolCalls[index];
        messages.push({
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolCall.id,
              content: `Tool execution failed: ${result.reason}`,
              is_error: true
            }
          ]
        });
      }
    });

    // Get final response from Claude with tool results
    const finalResponse = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000, // Increased for longer HTML templates
      system: systemPrompt,
      tools: this.designSystemTools.getToolDefinitions(),
      messages: messages as any
    });

    // Handle recursive tool calls if the final response also contains tool calls
    if (finalResponse.content.some(content => content.type === 'tool_use')) {
      return await this.handleToolCalls(finalResponse, originalPrompt, systemPrompt, depth + 1);
    }

    const finalContent = finalResponse.content.find(content => content.type === 'text');
    return finalContent ? finalContent.text : '';
  }

  private async generateFallbackTemplate(): Promise<string> {
    try {
      // Get the base template and insert a simple message
      const baseTemplate = await this.designSystemHTTP.getTemplate();
      
      // Replace the placeholder with a simple message
      const fallbackTemplate = baseTemplate.replace(
        '/* please insert the HTML template here */',
        '<p>UI generation in progress... Please try again or simplify your request.</p>'
      );
      
      return fallbackTemplate;
    } catch (error) {
      console.error('Error generating fallback template:', error);
      return '<!DOCTYPE html><html><head><title>Error</title></head><body><p>Unable to generate UI template</p></body></html>';
    }
  }

  private async loadExampleTemplate(): Promise<string> {
   
      // Fallback to a basic template if MCP call fails
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title></title>
  <script type="importmap">
      {
        "imports": {
           "@cre8_dev/cre8-wc": 'https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-wc@1.0.5',
         "lit": "https://cdn.jsdelivr.net/npm/lit@latest",
          "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@latest",
          "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@latest"
        }
      }
    </script>
  <script type="module">
    import '@cre8_dev/cre8-wc';
    import { html, unsafeCss, css, LitElement } from 'lit';

    const customCss = unsafeCss(css\`
      /* Custom CSS here */
    \`);

    class GeneratedInterface extends LitElement {
      static styles = [customCss];

      constructor() {
        super();
      }

      render() {
        return html\`
          <!-- Content here -->
        \`;
      }
    }

    customElements.define('generated-interface', GeneratedInterface);
  </script>
</head>
<body>
  <generated-interface></generated-interface>
</body>
</html>`;
  }

  private async buildSystemPrompt(framework: string, componentLibrary: string): Promise<string> {
    const exampleTemplate = await this.loadExampleTemplate();

    return `You are an expert Lit web component developer specializing in creating accessible, responsive web interfaces using the Cre8 Web Components library (@cre8_dev/cre8-wc). 

COMPLETE COMPONENT LIBRARY DOCUMENTATION:
${componentLibrary}

COMPONENT USAGE INSTRUCTIONS:
1. All components use the "cre8-" prefix (e.g., cre8-button, cre8-card, cre8-field)
2. Components support props/attributes as documented in the library above
3. Many components use slots for content organization (header, body, footer)
4. Always follow the property types and options specified in the documentation
5. Use kebab-case for attribute names in HTML (e.g., full-width, not fullWidth)

COMPONENT PRIORITY:
1. First choice: Use cre8-wc components when available (as documented above)
2. Second choice: Native HTML with design tokens for layouts and complex structures
3. Always apply design system styling via CSS custom properties

CRITICAL TEMPLATE REQUIREMENTS - FOLLOW THIS STRUCTURE EXACTLY:

${exampleTemplate}

MANDATORY RULES:
1. NEVER deviate from this exact template structure shown above
2. Import '@cre8_dev/cre8-wc' directly and extend LitElement 
3. Use ONLY @cre8_dev/cre8-wc components inside the render() method
4. Put ALL custom CSS in the customCss variable using unsafeCss(css\`...\`)
5. Use Lit's html template literal syntax inside render()
6. Define any properties with @property() or @state() decorators
7. Put event handlers and custom methods before render()
8. The custom element MUST be named 'generated-interface'
9. Keep the existing render() method structure EXACTLY as shown in the template
10. Replace the title with an appropriate one for the UI being generated
11. CRITICAL: Replace ONLY the comment "/* please insert the HTML template here */" with your cre8-wc components - DO NOT rewrite the entire render method
12. The render() method should look like: return html\` <your-components-here> \`;

STYLING APPROACH:
- Use CSS custom properties for design tokens
- Put all custom styles in the customCss variable
- Use Lit's css template literal syntax
- Make it responsive and accessible

FINAL OUTPUT REQUIREMENT: 
After using the available tools to gather component information, your final response must be the complete HTML document following the exact template structure above. Do not include tool results, explanations, or markdown - only output the raw HTML code that can be directly used as a complete web page.

CRITICAL: Limit tool usage to essential operations only. After gathering the necessary component information (typically 2-3 tool calls), generate the final HTML output. Do not make additional tool calls unless absolutely necessary.`;
  }

  private buildUserPrompt(prompt: string, framework: string): string {
    return `Create a complete HTML page based on this description:

${prompt}

CRITICAL REQUIREMENTS:
- Use cre8-wc components from the library documentation provided in the system prompt
- All component information is available in the system prompt - no additional lookups needed
- Follow the exact Lit web component template structure provided
- REPLACE ONLY the comment "/* please insert the HTML template here */" with your components
- DO NOT rewrite the render() method - keep it exactly as shown in template
- Use the customCss variable with design tokens for styling
- Make it responsive and accessible
- The custom element MUST be named 'generated-interface'
- Use kebab-case for all attributes (e.g., full-width="true", not fullWidth="true")

COMPONENT SELECTION:
- Prefer cre8-wc components when available (all documented in system prompt)
- Supplement with native HTML + design tokens for complex layouts
- Reference the complete component library documentation provided above

FINAL OUTPUT:
Generate the complete HTML document following the mandatory template structure exactly. Output only the HTML code in the exact template structure provided in the system prompt.`;
  }

  private async buildRefinementSystemPrompt(framework: string, componentLibrary: string): Promise<string> {
    return `You are refining an existing Lit web component HTML page that uses cre8-wc components based on user feedback. 

COMPLETE COMPONENT LIBRARY DOCUMENTATION:
${componentLibrary}

CRITICAL: MAINTAIN THE EXACT TEMPLATE STRUCTURE:
- Keep the importmap and module script structure
- Preserve the GeneratedInterface class extending LitElement
- Keep all content inside the render() method's html template
- Use customCss variable for styling with unsafeCss(css\`...\`) (note: unsafeCss not unsafeCSS)
- Maintain 'generated-interface' as the custom element name

REFINEMENT PRINCIPLES:
1. NEVER change the core template structure
2. Preserve existing functionality unless explicitly asked to change
3. Improve accessibility and usability within the template
4. Maintain cre8-wc component usage and design system compliance
5. Add missing features or fix issues mentioned in feedback
6. Keep responsive design intact
7. Put all changes inside the appropriate template sections

Always explain what changes you made and why, while maintaining the strict template structure.`;
  }

  private buildRefinementUserPrompt(code: string, feedback: string, framework: string): string {
    return `Here's the current Lit web component HTML page using cre8-wc components:

\`\`\`html
${code}
\`\`\`

User feedback:
${feedback}

CRITICAL: Maintain the EXACT template structure while applying the feedback. Do not change:
- The importmap and script structure
- The GeneratedInterface class structure
- The custom element name 'generated-interface'
- The overall template organization

Please refine the HTML page based on this feedback while strictly maintaining the template structure and cre8-wc component usage. Explain the changes you made.`;
  }

  private async buildComponentUsagePatterns(): Promise<string> {
    // Common HTML elements that might have cre8-wc equivalents
    const htmlElements = [
      'button', 'input', 'select', 'textarea', 'form', 'table', 'div', 'span', 
      'card', 'field', 'modal', 'alert', 'badge', 'checkbox', 'radio', 'switch',
      'nav', 'header', 'footer', 'section', 'article', 'aside', 'main',
      'dialog', 'details', 'summary', 'progress', 'meter', 'fieldset', 'legend',
      'tabs', 'tab', 'accordion', 'dropdown', 'tooltip', 'popover', 'calendar'
    ];

    const patterns: string[] = [];
    
    for (const htmlElement of htmlElements) {
      try {
        const examples = await this.designSystemHTTP.getComponentExamples(htmlElement);
        
        if (examples && examples.length > 0) {
          const componentName = `cre8-${htmlElement}`;
          patterns.push(`${htmlElement.toUpperCase()} → ${componentName}:`);
          
          // Format examples properly - show first 2 examples to keep it concise
          examples.slice(0, 2).forEach(example => {
            patterns.push(`  • ${example.title}: ${example.description}`);
            patterns.push(`    ${example.code.trim()}`);
          });
          
          patterns.push(''); // Add spacing
        }
      } catch (error) {
        // Silently continue if component doesn't exist
        continue;
      }
    }

    if (patterns.length === 0) {
      return 'No component usage patterns found in the design system.';
    }

    return `CRE8-WC COMPONENT USAGE PATTERNS:
${patterns.join('\n')}

KEY USAGE GUIDELINES:
- Replace standard HTML elements with their cre8-wc equivalents when available
- Always use the cre8- prefix for component names
- Use Lit's html template literal syntax: html\`<cre8-button text="Click Me"></cre8-button>\`
- All components support slots for flexible content structure
- Check component documentation for available props and variants
- Maintain semantic HTML structure even when using web components`;
  }

  private buildComponentContext(components: MCPComponent[]): string {
    if (!components || !components.length) {
      return 'No design system components available.';
    }

    return `AVAILABLE CRE8-WC COMPONENTS:
${components.map(comp =>
      `- ${comp.tagName}: ${comp.description}`
    ).join('\n')}

Use these components as custom HTML elements after loading the cre8-wc library.

Example usage:
<cre8-button text="Click Me" variant="primary" size="lg"></cre8-button>
<cre8-card>
  <div slot="header">Card Title</div>
  <div slot="body">Card content goes here</div>
  <div slot="footer">Card footer</div>
</cre8-card>
<cre8-field label="Email" type="email" required="true"></cre8-field>`;
  }

  private extractCodeFromResponse(responseText: string): string {
    // Extract code blocks from Claude's response
    const codeBlockRegex = /```html?\n([\s\S]*?)\n```/g;
    const matches = [...responseText.matchAll(codeBlockRegex)];

    if (matches.length > 0) {
      return matches[0][1].trim();
    }

    // If no code blocks found, return the entire response
    return responseText.trim();
  }

  private async validateTemplateCompliance(code: string): Promise<TemplateValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    let correctedCode: string | undefined;

    // Load the actual example template to validate against
    const exampleTemplate = await this.loadExampleTemplate();

    // Check for required template structure based on the actual example
    const requiredElements = [
      { pattern: /<!doctype html>|<!DOCTYPE html>/i, error: 'Missing DOCTYPE declaration' },
      { pattern: /<html lang="en">/, error: 'Missing or incorrect html tag with lang attribute' },
      { pattern: /<meta charset="UTF-8"/, error: 'Missing UTF-8 charset meta tag' },
      { pattern: /<meta name="viewport"/, error: 'Missing viewport meta tag' },
      { pattern: /<script type="importmap">/, error: 'Missing importmap script tag' },
      { pattern: /"@cre8_dev\/cre8-wc"/, error: 'Missing @cre8_dev/cre8-wc import in importmap' },
      { pattern: /"lit"/, error: 'Missing lit import in importmap' },
      { pattern: /import "@cre8_dev\/cre8-wc";|import '@cre8_dev\/cre8-wc';/, error: 'Missing direct @cre8_dev/cre8-wc import' },
      { pattern: /import { html, unsafeCss, css, LitElement } from "lit";|import { html, unsafeCSS, css, LitElement } from "lit";/, error: 'Missing or incorrect Lit imports' },
      { pattern: /class GeneratedInterface extends LitElement/, error: 'Missing GeneratedInterface class extending LitElement' },
      { pattern: /customElements\.define\("generated-interface", GeneratedInterface\);|customElements\.define\('generated-interface', GeneratedInterface\);/, error: 'Missing custom element definition' },
      { pattern: /<generated-interface><\/generated-interface>/, error: 'Missing generated-interface element in body' }
    ];

    for (const { pattern, error } of requiredElements) {
      if (!pattern.test(code)) {
        errors.push(error);
      }
    }

    // Check for incorrect patterns that should be avoide

   
    

    // Check for warnings - accept both unsafeCss and unsafeCSS since the example uses unsafeCSS
    if (!code.includes('const customCss = unsafeCss(css`') && !code.includes('const customCss = unsafeCSS(css`')) {
      warnings.push('customCss variable should use  "unsafeCss" with "css" imports and usage');
    }

    if (!code.includes('return html`')) {
      warnings.push('render() method should return html`...`');
    }

    // If there are errors, attempt to auto-correct
    if (errors.length > 0) {
      correctedCode = await this.attemptTemplateCorrection(code);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      correctedCode
    };
  }

  private async attemptTemplateCorrection(code: string): Promise<string> {
    const exampleTemplate = await this.loadExampleTemplate();
    
    // Use Claude to fix template compliance issues
    const correctionPrompt = `Fix this HTML code to match the exact template structure. Here is the code that needs fixing:

\`\`\`html
${code}
\`\`\`

Required template structure:
\`\`\`html
${exampleTemplate}
\`\`\`

Output the corrected HTML code following the exact template structure above. Preserve all cre8-wc components and content, just fix the template structure.`;

    const systemPrompt = `You are fixing HTML template structure. Your response must be the complete corrected HTML code, not questions or explanations.

RULES:
1. Output only the corrected HTML code
2. Preserve all cre8-wc components exactly as they are
3. Follow the exact template structure provided
4. Use unsafeCss (not unsafeCSS) 
5. Keep custom element name as 'generated-interface'
6. Do not ask questions - just fix and return the code`;

    try {
      const response = await this.queryAnthropic(correctionPrompt, systemPrompt);
      return this.extractCodeFromResponse(response);
    } catch (error) {
      console.error('Error in template correction:', error);
      return code; // Return original code if correction fails
    }
  }

  private async validateAndEnhanceCode(code: string, framework: string): Promise<string> {
    // Minimal validation - just return the code
    // Add basic accessibility reminder if missing
    if (!code.includes('aria-') && !code.includes('role=')) {
      console.log('Note: Consider adding ARIA attributes for better accessibility');
    }

    return code;
  }

  private extractUsedComponents(code: string): string[] {
    const componentRegex = /<cre8-([a-z-]+)/g;
    const matches = [...code.matchAll(componentRegex)];
    return [...new Set(matches.map(match => `cre8-${match[1]}`))];
  }

  private generatePreviewData(code: string, framework: string) {
    return {
      framework,
      hasStyles: code.includes('style') || code.includes('css'),
      hasInteractivity: code.includes('onClick') || code.includes('@click') || code.includes('addEventListener'),
      componentCount: (code.match(/<[a-zA-Z]/g) || []).length,
      linesOfCode: code.split('\n').length
    };
  }

  private analyzeChanges(originalCode: string, refinedCode: string) {
    const originalLines = originalCode.split('\n').length;
    const refinedLines = refinedCode.split('\n').length;

    return {
      linesAdded: Math.max(0, refinedLines - originalLines),
      linesRemoved: Math.max(0, originalLines - refinedLines),
      significantChange: Math.abs(refinedLines - originalLines) > 5
    };
  }
}