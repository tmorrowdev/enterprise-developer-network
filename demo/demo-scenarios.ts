import { EnterpriseHooks } from '../workflow-triggers/enterprise-hooks';

export class DemoScenarios {
  private hooks = new EnterpriseHooks();

  async newDeveloperOnboarding() {
    console.log('🎯 Demo: New Developer Onboarding (Marcus Rodriguez)');
    
    const code = `
      function LoginButton() {
        var isLoading = false;
        console.log('Button clicked');
        return <button onClick={handleClick}>Login</button>;
      }
    `;

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
}