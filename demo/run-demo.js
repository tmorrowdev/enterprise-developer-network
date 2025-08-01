const { EnterpriseHooks } = require('../workflow-triggers/enterprise-hooks');

class DemoScenarios {
  constructor() {
    this.hooks = new EnterpriseHooks();
  }

  async newDeveloperOnboarding() {
    console.log('🎯 Demo: New Developer Onboarding (Marcus Rodriguez)');
    
    const code = `var isLoading = false; console.log('Button clicked'); return <button>Login</button>;`;
    const result = await this.hooks.checkCodeStandards(code, 'javascript');
    console.log('Standards Check:', result);
    
    const learning = this.hooks.suggestLearning('dev_002');
    console.log('Learning Suggestions:', learning);
  }

  async strugglingDeveloperDetection() {
    console.log('🎯 Demo: Struggling Developer Detection');
    const analysis = this.hooks.analyzeProductivity('dev_002');
    console.log('Productivity Analysis:', analysis);
  }

  async codeStandardsEnforcement() {
    console.log('🎯 Demo: Real-time Code Standards');
    const badCode = `const password = "hardcoded123"; console.log("Debug", password);`;
    const result = await this.hooks.checkCodeStandards(badCode, 'javascript');
    console.log('Violations:', result.violations);
    console.log('Suggestions:', result.suggestions);
  }

  async runAll() {
    await this.newDeveloperOnboarding();
    console.log('\n---\n');
    await this.strugglingDeveloperDetection();
    console.log('\n---\n');
    await this.codeStandardsEnforcement();
  }
}

new DemoScenarios().runAll();