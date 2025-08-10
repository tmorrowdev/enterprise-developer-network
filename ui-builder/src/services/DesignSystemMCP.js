import { spawn } from 'child_process';
import path from 'path';

export class DesignSystemMCP {
  constructor() {
    this.serverPath = path.join(process.cwd(), '../mcp-servers/dist/design-system/server.js');
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async callMCPTool(toolName, args = {}) {
    const cacheKey = `${toolName}-${JSON.stringify(args)}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    return new Promise((resolve, reject) => {
      const request = {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: toolName,
          arguments: args
        }
      };

      const child = spawn('node', [this.serverPath], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`MCP server exited with code ${code}: ${stderr}`));
          return;
        }

        try {
          // Parse the JSON response from stdout
          const lines = stdout.trim().split('\n');
          const jsonLine = lines.find(line => line.startsWith('{"result"'));
          
          if (!jsonLine) {
            reject(new Error('No valid JSON response found'));
            return;
          }

          const response = JSON.parse(jsonLine);
          
          if (response.error) {
            reject(new Error(response.error.message || 'MCP tool error'));
            return;
          }

          const result = response.result;
          
          // Cache the result
          this.cache.set(cacheKey, {
            data: result,
            timestamp: Date.now()
          });

          resolve(result);
        } catch (error) {
          reject(new Error(`Failed to parse MCP response: ${error.message}`));
        }
      });

      child.on('error', (error) => {
        reject(new Error(`Failed to spawn MCP server: ${error.message}`));
      });

      // Send the request
      child.stdin.write(JSON.stringify(request) + '\n');
      child.stdin.end();
    });
  }

  async listComponents(format = 'detailed') {
    try {
      const result = await this.callMCPTool('list_components', { format });
      
      if (format === 'names-only') {
        // Parse the text response to extract component names
        const text = result.content[0].text;
        const lines = text.split('\n').filter(line => line.startsWith('cre8-'));
        return lines.map(tagName => ({ tagName, name: this.tagNameToComponentName(tagName) }));
      }
      
      // Parse detailed format
      const text = result.content[0].text;
      const componentRegex = /• \*\*(.+?)\*\* \(`(.+?)`\) - (.+)/g;
      const components = [];
      let match;
      
      while ((match = componentRegex.exec(text)) !== null) {
        components.push({
          name: match[1],
          tagName: match[2],
          description: match[3]
        });
      }
      
      return components;
    } catch (error) {
      console.error('Error listing components:', error);
      return [];
    }
  }

  async getComponent(name) {
    try {
      const result = await this.callMCPTool('get_component', { name });
      return this.parseComponentDocumentation(result.content[0].text);
    } catch (error) {
      console.error(`Error getting component ${name}:`, error);
      return null;
    }
  }

  async getComponentExamples(name, exampleType = null) {
    try {
      const args = { name };
      if (exampleType) {
        args.example_type = exampleType;
      }
      
      const result = await this.callMCPTool('get_component_examples', args);
      return this.parseExamples(result.content[0].text);
    } catch (error) {
      console.error(`Error getting examples for ${name}:`, error);
      return [];
    }
  }

  async validateComponentUsage(component, props) {
    try {
      const result = await this.callMCPTool('validate_usage', { component, props });
      return result.content[0].text;
    } catch (error) {
      console.error(`Error validating ${component}:`, error);
      return 'Validation failed';
    }
  }

  async generateComponentCode(component, props = {}, content = '', variant = null) {
    try {
      const args = { component, props, content };
      if (variant) {
        args.variant = variant;
      }
      
      const result = await this.callMCPTool('generate_component_code', args);
      return this.extractCodeFromMarkdown(result.content[0].text);
    } catch (error) {
      console.error(`Error generating code for ${component}:`, error);
      return `<${component}></${component}>`;
    }
  }

  async getDesignTokens(category = null) {
    try {
      const args = category ? { category } : {};
      const result = await this.callMCPTool('get_design_tokens', args);
      return this.parseDesignTokens(result.content[0].text);
    } catch (error) {
      console.error('Error getting design tokens:', error);
      return {};
    }
  }

  // Helper methods
  tagNameToComponentName(tagName) {
    return tagName.replace('cre8-', '').split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
  }

  parseComponentDocumentation(text) {
    const component = {
      name: '',
      tagName: '',
      description: '',
      props: [],
      examples: [],
      slots: []
    };

    const lines = text.split('\n');
    let currentSection = '';
    let currentProp = null;

    for (const line of lines) {
      if (line.startsWith('# ') && line.includes('Component')) {
        component.name = line.replace('# ', '').replace(' Component', '');
      } else if (line.startsWith('**Tag:**')) {
        component.tagName = line.match(/`(.+?)`/)?.[1] || '';
      } else if (line.startsWith('## Properties')) {
        currentSection = 'props';
      } else if (line.startsWith('## Slots')) {
        currentSection = 'slots';
      } else if (line.startsWith('## Usage Examples')) {
        currentSection = 'examples';
      } else if (line.startsWith('### ') && currentSection === 'props') {
        if (currentProp) {
          component.props.push(currentProp);
        }
        currentProp = { name: line.replace('### ', ''), type: '', description: '' };
      } else if (line.startsWith('- **Type:**') && currentProp) {
        currentProp.type = line.replace('- **Type:** ', '');
      } else if (line.startsWith('- **Description:**') && currentProp) {
        currentProp.description = line.replace('- **Description:** ', '');
      } else if (!component.description && line.trim() && !line.startsWith('#') && !line.startsWith('**')) {
        component.description = line.trim();
      }
    }

    if (currentProp) {
      component.props.push(currentProp);
    }

    return component;
  }

  parseExamples(text) {
    const examples = [];
    const exampleRegex = /## (.+?)\n(.+?)\n\n```html\n([\s\S]*?)\n```/g;
    let match;

    while ((match = exampleRegex.exec(text)) !== null) {
      examples.push({
        title: match[1],
        description: match[2],
        code: match[3]
      });
    }

    return examples;
  }

  parseDesignTokens(text) {
    const tokens = {};
    const lines = text.split('\n');
    let currentCategory = '';

    for (const line of lines) {
      if (line.startsWith('## ') && line.includes('Tokens')) {
        currentCategory = line.replace('## ', '').replace(' Tokens', '').toLowerCase();
        tokens[currentCategory] = [];
      } else if (line.startsWith('• **') && currentCategory) {
        const match = line.match(/• \*\*(.+?)\*\*: `(.+?)`/);
        if (match) {
          tokens[currentCategory].push({
            name: match[1],
            value: match[2]
          });
        }
      }
    }

    return tokens;
  }

  extractCodeFromMarkdown(text) {
    const codeMatch = text.match(/```html\n([\s\S]*?)\n```/);
    return codeMatch ? codeMatch[1] : text;
  }

  clearCache() {
    this.cache.clear();
  }
}