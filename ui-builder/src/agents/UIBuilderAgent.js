import Anthropic from '@anthropic-ai/sdk';
import { v4 as uuidv4 } from 'uuid';

export class UIBuilderAgent {
  constructor(designSystemMCP) {
    this.designSystemMCP = designSystemMCP;
    this.conversations = new Map(); // Store conversation history
    this.claudeCodeQuery = null;
    this.claudeCodeInitialized = false;
    
    // Verify API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }

    // Initialize fallback Anthropic client
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async initializeClaudeCode() {
    if (this.claudeCodeInitialized) {
      return;
    }

    try {
      // Use dynamic import for optional dependency
      const claudeCodeModule = await import('@anthropic-ai/claude-code');
      
      if (claudeCodeModule && typeof claudeCodeModule.query === 'function') {
        this.claudeCodeQuery = claudeCodeModule.query;
        console.log('✅ Claude Code SDK loaded successfully');
      } else {
        throw new Error('Claude Code SDK query function not found');
      }
    } catch (error) {
      console.warn('⚠️  Claude Code SDK not available, using direct Anthropic SDK only:', error.message);
      this.claudeCodeQuery = null;
    }
    
    this.claudeCodeInitialized = true;
  }

  async generateUI(prompt, framework = 'react', progressCallback = null) {
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
      
      const availableComponents = await this.designSystemMCP.listComponents();
      const componentContext = this.buildComponentContext(availableComponents);

      // Step 3: Generate UI code
      if (progressCallback) {
        progressCallback({ stage: 'generating', message: 'Generating UI code...' });
      }

      const systemPrompt = this.buildSystemPrompt(framework, componentContext);
      const userPrompt = this.buildUserPrompt(prompt, framework);

      // Use Claude Code SDK with MCP integration and fallback
      const fullResponse = await this.queryWithFallback(userPrompt, systemPrompt, framework);
      const generatedCode = this.extractCodeFromResponse(fullResponse);
      
      // Step 4: Validate and enhance code
      if (progressCallback) {
        progressCallback({ stage: 'validating', message: 'Validating generated code...' });
      }

      const validatedCode = await this.validateAndEnhanceCode(generatedCode, framework);

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
        metadata: {
          timestamp: new Date(),
          prompt: prompt,
          framework: framework
        }
      };

    } catch (error) {
      console.error('Error in generateUI:', error);
      throw new Error(`Failed to generate UI: ${error.message}`);
    }
  }

  async refineUI(code, feedback, framework = 'react', progressCallback = null) {
    try {
      if (progressCallback) {
        progressCallback({ stage: 'analyzing', message: 'Analyzing feedback...' });
      }

      const availableComponents = await this.designSystemMCP.listComponents();
      const componentContext = this.buildComponentContext(availableComponents);

      const systemPrompt = this.buildRefinementSystemPrompt(framework, componentContext);
      const userPrompt = this.buildRefinementUserPrompt(code, feedback, framework);

      if (progressCallback) {
        progressCallback({ stage: 'refining', message: 'Applying improvements...' });
      }

      // Use Claude Code SDK for refinement with fallback
      const fullResponse = await this.queryWithFallback(userPrompt, systemPrompt, framework);
      const refinedCode = this.extractCodeFromResponse(fullResponse);
      const validatedCode = await this.validateAndEnhanceCode(refinedCode, framework);

      if (progressCallback) {
        progressCallback({ stage: 'complete', message: 'UI refinement complete!' });
      }

      return {
        code: validatedCode,
        framework,
        components: this.extractUsedComponents(validatedCode),
        preview: this.generatePreviewData(validatedCode, framework),
        changes: this.analyzeChanges(code, validatedCode),
        metadata: {
          timestamp: new Date(),
          feedback: feedback,
          framework: framework
        }
      };

    } catch (error) {
      console.error('Error in refineUI:', error);
      throw new Error(`Failed to refine UI: ${error.message}`);
    }
  }

  buildSystemPrompt(framework, componentContext) {
    return `You are an expert UI developer specializing in creating accessible, responsive web interfaces using the Cre8 design system. Your task is to generate clean, production-ready ${framework} code.

DESIGN SYSTEM CONTEXT:
${componentContext}

FRAMEWORK: ${framework}

REQUIREMENTS:
1. Use ONLY Cre8 design system components when available
2. Follow accessibility best practices (semantic HTML, ARIA labels, keyboard navigation)
3. Implement responsive design using mobile-first approach
4. Use Cre8 design tokens for consistent styling
5. Include proper TypeScript types when applicable
6. Add meaningful comments for complex logic
7. Ensure components are reusable and well-structured

DESIGN TOKENS:
Always include the Cre8 design tokens CSS:
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css">

Use CSS custom properties like:
- Typography: var(--cre8-body-default-font-family), var(--cre8-title-large-font-size)
- Spacing: var(--cre8-spacing-md), var(--cre8-spacing-lg)
- Colors: Use semantic color tokens when available

OUTPUT FORMAT:
Provide complete, runnable code with:
1. All necessary imports
2. Proper component structure
3. Inline styles using design tokens
4. Accessibility attributes
5. Responsive design considerations

Generate modern, clean code that follows ${framework} best practices and design system principles.`;
  }

  buildUserPrompt(prompt, framework) {
    return `Create a ${framework} UI component based on this description:

${prompt}

Requirements:
- Use Cre8 design system components where possible
- Make it responsive and accessible
- Include proper styling with design tokens
- Add TypeScript types if using React/Vue
- Ensure the component is production-ready

Please provide the complete code with all necessary imports and styling.`;
  }

  buildRefinementSystemPrompt(framework, componentContext) {
    return `You are refining an existing ${framework} UI component based on user feedback. Your goal is to improve the code while maintaining design system consistency.

DESIGN SYSTEM CONTEXT:
${componentContext}

REFINEMENT PRINCIPLES:
1. Preserve existing functionality unless explicitly asked to change
2. Improve accessibility and usability
3. Maintain Cre8 design system compliance
4. Optimize code structure and performance
5. Add missing features or fix issues mentioned in feedback
6. Keep responsive design intact

Always explain what changes you made and why.`;
  }

  buildRefinementUserPrompt(code, feedback, framework) {
    return `Here's the current ${framework} code:

\`\`\`${framework === 'react' ? 'tsx' : framework}
${code}
\`\`\`

User feedback:
${feedback}

Please refine the code based on this feedback while maintaining design system consistency and best practices. Explain the changes you made.`;
  }

  async queryWithFallback(prompt, systemPrompt, framework) {
    // Initialize Claude Code SDK if not already done
    await this.initializeClaudeCode();

    // Try Claude Code SDK first if available
    if (this.claudeCodeQuery) {
      try {
        const response = await this.claudeCodeQuery({
          query: `${systemPrompt}\n\n${prompt}`,
          outputFormat: 'json',
          mcpConfig: process.env.MCP_CONFIG_PATH || './mcp-config.json',
          allowedTools: ['design-system'],
          appendSystemPrompt: `You are a UI generation agent. Focus on creating clean, accessible, production-ready ${framework} code using the Cre8 design system.`
        });

        // Check if response is valid and has async iterator
        if (response && typeof response[Symbol.asyncIterator] === 'function') {
          let fullResponse = '';

          // Process the streaming response
          for await (const message of response) {
            if (message.type === 'assistant' && message.content) {
              fullResponse += message.content;
            } else if (message.type === 'result' && message.content) {
              fullResponse += message.content;
            }
          }

          return fullResponse;
        } else {
          throw new Error('Invalid response format from Claude Code SDK');
        }
      } catch (error) {
        console.warn('Claude Code SDK failed, falling back to direct Anthropic SDK:', error.message);
      }
    }
    
    // Fallback to direct Anthropic SDK
    const response = await this.anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return response.content[0].text;
  }

  buildComponentContext(components) {
    if (!components || !components.length) {
      return 'No design system components available.';
    }

    return `AVAILABLE CRE8 COMPONENTS:
${components.slice(0, 20).map(comp => 
  `- ${comp.tagName}: ${comp.description}`
).join('\n')}

Use these components by including them as custom elements in your HTML or importing them in your framework of choice.

Example usage:
<cre8-button variant="primary" size="lg" text="Click Me"></cre8-button>
<cre8-card>
  <div slot="header">Card Title</div>
  <div slot="body">Card content</div>
</cre8-card>`;
  }

  extractCodeFromResponse(responseText) {
    // Extract code blocks from Claude's response
    const codeBlockRegex = /```(?:tsx?|jsx?|vue|svelte|html)?\n([\s\S]*?)\n```/g;
    const matches = [...responseText.matchAll(codeBlockRegex)];
    
    if (matches.length > 0) {
      return matches[0][1].trim();
    }
    
    // If no code blocks found, return the entire response
    return responseText.trim();
  }

  async validateAndEnhanceCode(code, framework) {
    // Basic validation and enhancement
    let enhancedCode = code;

    // Ensure design tokens are included
    if (!code.includes('cre8-design-tokens') && !code.includes('tokens_cre8.css')) {
      const tokenImport = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css">`;
      
      if (framework === 'react' || framework === 'vue') {
        enhancedCode = `// Import design tokens in your main CSS file or index.html:\n// ${tokenImport}\n\n${enhancedCode}`;
      } else {
        enhancedCode = `${tokenImport}\n\n${enhancedCode}`;
      }
    }

    // Add basic accessibility enhancements if missing
    if (!code.includes('aria-') && !code.includes('role=')) {
      console.log('Note: Consider adding ARIA attributes for better accessibility');
    }

    return enhancedCode;
  }

  extractUsedComponents(code) {
    const componentRegex = /<cre8-([a-z-]+)/g;
    const matches = [...code.matchAll(componentRegex)];
    return [...new Set(matches.map(match => `cre8-${match[1]}`))];
  }

  generatePreviewData(code, framework) {
    return {
      framework,
      hasStyles: code.includes('style') || code.includes('css'),
      hasInteractivity: code.includes('onClick') || code.includes('@click') || code.includes('addEventListener'),
      componentCount: (code.match(/<[a-zA-Z]/g) || []).length,
      linesOfCode: code.split('\n').length
    };
  }

  analyzeChanges(originalCode, refinedCode) {
    const originalLines = originalCode.split('\n').length;
    const refinedLines = refinedCode.split('\n').length;
    
    return {
      linesAdded: Math.max(0, refinedLines - originalLines),
      linesRemoved: Math.max(0, originalLines - refinedLines),
      significantChange: Math.abs(refinedLines - originalLines) > 5
    };
  }
}