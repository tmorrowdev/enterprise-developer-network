const data = require('../data/enterprise-data.json');

class EnterpriseHooks {
  async checkCodeStandards(code, language) {
    const standards = data.code_standards[language];
    if (!standards) return { valid: true, suggestions: [] };

    const violations = [];
    const suggestions = [];

    if (code.includes('console.log')) {
      violations.push('console.log detected');
      suggestions.push('Use proper logging framework');
    }

    if (code.includes('var ')) {
      violations.push('var usage detected');
      suggestions.push('Use const/let instead of var');
    }

    if (code.includes('password') && code.includes('=')) {
      violations.push('hardcoded secret detected');
      suggestions.push('Use environment variables');
    }

    if (code.includes('<button')) {
      suggestions.push('Consider using Button component from design system');
    }

    return { 
      valid: violations.length === 0, 
      violations, 
      suggestions,
      designSystemSuggestions: this.getComponentSuggestions(code)
    };
  }

  getComponentSuggestions(code) {
    const suggestions = [];
    
    if (code.includes('<button')) {
      suggestions.push({
        component: 'Button',
        usage: '<Button variant="primary">Click me</Button>',
        frequency: 245
      });
    }

    return suggestions;
  }

  analyzeProductivity(developerId) {
    const dev = data.developer_profiles.find(d => d.id === developerId);
    if (!dev) return null;

    const metrics = dev.productivity_metrics;
    return {
      performance: metrics.feature_completion_rate > 80 ? 'excellent' : 
                  metrics.feature_completion_rate > 60 ? 'good' : 'needs_improvement',
      recommendations: dev.learning_recommendations,
      struggles: dev.recent_struggles || []
    };
  }

  suggestLearning(developerId) {
    const dev = data.developer_profiles.find(d => d.id === developerId);
    if (!dev) return [];

    return dev.learning_recommendations.map(rec => {
      const path = data.learning_paths.find(p => p.title === rec);
      return {
        title: rec,
        difficulty: path?.difficulty || 'intermediate',
        estimatedHours: path?.estimated_hours || 10
      };
    });
  }
}

module.exports = { EnterpriseHooks };