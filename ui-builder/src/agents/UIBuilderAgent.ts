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
      timeout: 120000, // 2 minutes timeout
      maxRetries: 3
    });
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

      // Step 2: Get relevant design system components
      if (progressCallback) {
        progressCallback({ stage: 'components', message: 'Fetching design system components...' });
      }

      const availableComponents = await this.designSystemHTTP.listComponents();
      const componentContext = this.buildComponentContext(availableComponents);

      // Step 3: Generate UI code
      if (progressCallback) {
        progressCallback({ stage: 'generating', message: 'Generating UI code...' });
      }

      const systemPrompt = await this.buildSystemPrompt(framework, componentContext);
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
      const componentContext = this.buildComponentContext(availableComponents);

      const systemPrompt = await this.buildRefinementSystemPrompt(framework, componentContext);
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
    const tools = this.designSystemTools.getToolDefinitions();
    
    const response = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000, // Increased for longer HTML templates
      system: systemPrompt,
      tools: tools,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Handle tool calls if present
    if (response.content.some(content => content.type === 'tool_use')) {
      return await this.handleToolCalls(response, prompt, systemPrompt);
    }

    const content = response.content[0];
    return content.type === 'text' ? content.text : '';
  }

  private async handleToolCalls(response: any, originalPrompt: string, systemPrompt: string, depth: number = 0): Promise<string> {
    // Prevent infinite recursion by limiting depth to 3 callbacks
    const MAX_RECURSION_DEPTH = 3;
    if (depth >= MAX_RECURSION_DEPTH) {
      console.warn(`Maximum recursion depth (${MAX_RECURSION_DEPTH}) reached in handleToolCalls. Extracting final text response.`);
      const finalContent = response.content.find((content: any) => content.type === 'text');
      
      // If we have text content, return it; otherwise try to generate a basic template
      if (finalContent && finalContent.text && !finalContent.text.includes('tool_use')) {
        return finalContent.text;
      }
      
      // As fallback, generate a basic template with the user's request
      console.log('Generating fallback template due to recursion limit');
      return this.generateFallbackTemplate();
    }
    console.log(`🔄 HandleToolCalls depth ${depth} - Processing ${response.content.filter((c: any) => c.type === 'tool_use').length} tool calls`);
    
    const messages = [
      { role: 'user', content: originalPrompt },
      { role: 'assistant', content: response.content }
    ];

    // Process each tool call
    for (const content of response.content) {
      if (content.type === 'tool_use') {
        try {
          const toolResult = await this.designSystemTools.handleToolCall(content.name, content.input);
          const formattedResult = this.designSystemTools.formatToolResult(content.name, toolResult);
          
          messages.push({
            role: 'user',
            content: [
              {
                type: 'tool_result',
                tool_use_id: content.id,
                content: formattedResult
              }
            ]
          });
        } catch (error) {
          console.error(`Error executing tool ${content.name}:`, error);
          messages.push({
            role: 'user',
            content: [
              {
                type: 'tool_result',
                tool_use_id: content.id,
                content: `Error: ${(error as Error).message}`,
                is_error: true
              }
            ]
          });
        }
      }
    }

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
    try {
      // Get template from MCP server instead of local file
      return await this.designSystemHTTP.getTemplate();
    } catch (error) {
      console.error('Error loading template from MCP server:', error);
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
          "@cre8_dev/cre8-wc": "https://esm.sh/npm/@cre8_dev/cre8-wc",
          "lit": "https://esm.sh/npm/lit@latest"
        }
      }
    </script>
  <script type="module" lang="ts">
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
  }

  private async buildSystemPrompt(framework: string, componentContext: string): Promise<string> {
    const usagePatterns = await this.buildComponentUsagePatterns();
    const exampleTemplate = await this.loadExampleTemplate();

    return `You are an expert Lit web component developer specializing in creating accessible, responsive web interfaces using the Cre8 Web Components library (@cre8_dev/cre8-wc). 

AVAILABLE MCP TOOLS - USE THESE ACTIVELY:
You have access to the following tools to get real-time information about the design system:

1. **list_components** - ALWAYS call this first to see all available components
2. **get_component_examples** - Use this to get specific usage examples for components you want to use
3. **get_component** - Get detailed documentation for specific components
4. **generate_component_code** - Generate properly formatted component code
5. **validate_usage** - Validate your component usage before finalizing
6. **get_design_tokens** - Get design system tokens for styling

IMPORTANT: ALWAYS use these tools to get current component information. The static context below may be outdated.

WORKFLOW (Use tools efficiently):
1. For SIMPLE requests (1-2 components): Use existing component knowledge, minimal tool calls
2. For COMPLEX UIs: Prefer cre8-wc components, supplement with native HTML + design tokens
3. Call list_components and get_component_examples only when needed
4. NEVER call validate_usage unless there's a specific error

COMPONENT PRIORITY:
1. First choice: Use cre8-wc components when available
2. Second choice: Native HTML with design tokens for layouts and complex structures
3. Always apply design system styling via CSS custom properties

DESIGN SYSTEM CONTEXT:
${componentContext}

COMPONENT USAGE PATTERNS:
${usagePatterns}

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

STEP 1: ASSESS AND PLAN
- For simple UIs: Use cre8-wc components directly with minimal tool calls
- For complex UIs: Use tools to discover components, then mix cre8-wc with native HTML

STEP 2: GET COMPONENTS (if needed)
Only call tools for complex UIs or unfamiliar components.

STEP 3: GENERATE UI
Create the HTML following the exact template structure provided in the system prompt.

CRITICAL REQUIREMENTS:
- PREFER cre8-wc components when available 
- SUPPLEMENT with native HTML + design tokens for complex layouts
- Follow the exact Lit web component template structure
- REPLACE ONLY the comment "/* please insert the HTML template here */" with your components
- DO NOT rewrite the render() method - keep it exactly as shown in template
- Use the customCss variable with design tokens for styling
- Make it responsive and accessible
- The custom element MUST be named 'generated-interface'

STEP 4: VALIDATE (Optional)
Use validate_usage to check your component usage if needed.

STEP 5: GENERATE FINAL OUTPUT
After using the tools to gather component information, generate the complete HTML document following the mandatory template structure exactly. 

CRITICAL: Replace ONLY the placeholder comment in the render method, not the entire method structure.

IMPORTANT: Your final response must be the complete HTML document, not tool results or explanations. Output only the HTML code in the exact template structure provided in the system prompt.`;
  }

  private async buildRefinementSystemPrompt(framework: string, componentContext: string): Promise<string> {
    const usagePatterns = await this.buildComponentUsagePatterns();

    return `You are refining an existing Lit web component HTML page that uses cre8-wc components based on user feedback. 

DESIGN SYSTEM CONTEXT:
${componentContext}

COMPONENT USAGE PATTERNS:
${usagePatterns}

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