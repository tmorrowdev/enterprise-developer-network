import { exec } from 'child_process';

export class DesignUsageTrigger {
  async onComponentUsage(component: string, props: any) {
    const validation = await this.validateUsage(component, props);
    const suggestions = await this.getSuggestions(component);
    
    if (!validation.valid) {
      console.log(`❌ Invalid ${component} usage:`, validation.errors);
    }
    
    console.log(`💡 Suggestions for ${component}:`, suggestions);
  }

  private validateUsage(component: string, props: any): Promise<any> {
    return new Promise((resolve) => {
      exec(`echo '{"component":"${component}","props":${JSON.stringify(props)}}' | node ../mcp-servers/dist/design-system/server.js`,
        (error, stdout) => {
          resolve({ valid: !stdout.includes('Invalid'), errors: stdout });
        });
    });
  }

  private async getSuggestions(component: string) {
    return [`Use ${component} with consistent spacing`, `Follow design tokens for ${component}`];
  }
}