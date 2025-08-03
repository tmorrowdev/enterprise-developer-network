class MCPClient {
  constructor(baseUrl = 'http://localhost:3002') {
    this.baseUrl = baseUrl;
  }

  async callTool(server, toolName, args) {
    const request = {
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    };

    const response = await fetch(`${this.baseUrl}/mcp/${server}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    return response.json();
  }

  async listTools(server) {
    const response = await fetch(`${this.baseUrl}/mcp/${server}/tools`);
    return response.json();
  }

  async validateCode(code, language) {
    return this.callTool('code-standards', 'validate_code', { code, language });
  }

  async getDeveloperMetrics(developerId) {
    return this.callTool('developer-analytics', 'get_developer_metrics', { developer_id: developerId });
  }

  async getComponent(name) {
    return this.callTool('design-system', 'get_component', { name });
  }

  async getOnboardingTasks(developerId) {
    return this.callTool('onboarding-assistant', 'get_onboarding_tasks', { developer_id: developerId });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MCPClient;
} else {
  window.MCPClient = MCPClient;
}