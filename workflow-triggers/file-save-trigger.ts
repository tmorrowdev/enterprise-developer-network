import { exec } from 'child_process';

export class FileSaveTrigger {
  async onFileSave(filePath: string, content: string) {
    const fileExt = filePath.split('.').pop();
    
    if (['ts', 'js', 'jsx', 'tsx'].includes(fileExt || '')) {
      this.runStandardsCheck(content);
    }
  }

  private runStandardsCheck(content: string) {
    const violations = [];
    if (content.includes('console.log')) violations.push('Remove console.log');
    if (content.includes('var ')) violations.push('Use const/let');
    if (content.includes('password') && content.includes('=')) violations.push('No hardcoded secrets');
    
    if (violations.length > 0) {
      console.log(`❌ Standards violations: ${violations.join(', ')}`);
      this.suggestFixes(violations);
    } else {
      console.log('✅ Code passes all standards checks');
    }
  }

  private suggestFixes(violations: string[]) {
    violations.forEach(violation => {
      if (violation.includes('console.log')) {
        console.log('💡 Suggestion: Use proper logging library instead');
      }
      if (violation.includes('var')) {
        console.log('💡 Suggestion: Auto-fix available - use const/let');
      }
    });
  }
}