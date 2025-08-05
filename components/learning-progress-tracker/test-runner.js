#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TEST_SUITES = {
  unit: {
    name: 'Unit Tests',
    files: 'learning-progress-tracker.test.ts',
    timeout: 30000
  },
  comprehensive: {
    name: 'Comprehensive Tests',
    files: 'learning-progress-tracker.comprehensive.test.ts',
    timeout: 60000
  },
  accessibility: {
    name: 'Accessibility Tests',
    files: 'learning-progress-tracker.accessibility.test.ts',
    timeout: 45000
  },
  performance: {
    name: 'Performance Tests',
    files: 'learning-progress-tracker.performance.test.ts',
    timeout: 90000
  },
  integration: {
    name: 'Integration Tests',
    files: 'learning-progress-tracker.integration.test.ts',
    timeout: 60000
  }
};

const BROWSERS = {
  chrome: 'Chrome (Headless)',
  firefox: 'Firefox (Headless)',
  webkit: 'WebKit (Headless)'
};

class TestRunner {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      suites: {}
    };
    this.startTime = Date.now();
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
      reset: '\x1b[0m'
    };
    
    console.log(`${colors[level]}[${timestamp}] ${message}${colors.reset}`);
  }

  async runTestSuite(suiteKey, suite) {
    this.log(`Starting ${suite.name}...`, 'info');
    
    try {
      const command = `npx wtr ${suite.files} --coverage --timeout ${suite.timeout}`;
      const result = execSync(command, { 
        encoding: 'utf8',
        cwd: process.cwd(),
        env: { ...process.env, NODE_ENV: 'test' }
      });
      
      // Parse test results (simplified - would need proper parsing)
      const passed = (result.match(/✅/g) || []).length;
      const failed = (result.match(/❌/g) || []).length;
      
      this.results.suites[suiteKey] = {
        name: suite.name,
        passed,
        failed,
        total: passed + failed,
        status: failed === 0 ? 'PASSED' : 'FAILED',
        output: result
      };
      
      this.results.total += passed + failed;
      this.results.passed += passed;
      this.results.failed += failed;
      
      this.log(`${suite.name} completed: ${passed} passed, ${failed} failed`, 
               failed === 0 ? 'success' : 'error');
      
      return failed === 0;
    } catch (error) {
      this.log(`${suite.name} failed with error: ${error.message}`, 'error');
      this.results.suites[suiteKey] = {
        name: suite.name,
        passed: 0,
        failed: 1,
        total: 1,
        status: 'ERROR',
        error: error.message
      };
      this.results.failed += 1;
      this.results.total += 1;
      return false;
    }
  }

  async runCrossBrowserTests() {
    this.log('Running cross-browser compatibility tests...', 'info');
    
    const browsers = ['chrome', 'firefox'];
    const crossBrowserResults = {};
    
    for (const browser of browsers) {
      this.log(`Testing on ${BROWSERS[browser]}...`, 'info');
      
      try {
        const command = `npx wtr learning-progress-tracker.test.ts --puppeteer --coverage=false --browser ${browser}`;
        const result = execSync(command, { 
          encoding: 'utf8',
          timeout: 60000
        });
        
        crossBrowserResults[browser] = {
          browser: BROWSERS[browser],
          status: 'PASSED',
          output: result.slice(-200) // Last 200 chars for summary
        };
        
        this.log(`${BROWSERS[browser]} tests passed`, 'success');
      } catch (error) {
        crossBrowserResults[browser] = {
          browser: BROWSERS[browser],
          status: 'FAILED',
          error: error.message
        };
        
        this.log(`${BROWSERS[browser]} tests failed: ${error.message}`, 'error');
      }
    }
    
    return crossBrowserResults;
  }

  async runLinting() {
    this.log('Running ESLint...', 'info');
    
    try {
      execSync('npx eslint . --ext .ts', { 
        encoding: 'utf8',
        stdio: 'inherit'
      });
      this.log('ESLint passed', 'success');
      return true;
    } catch (error) {
      this.log('ESLint failed', 'error');
      return false;
    }
  }

  async runTypeChecking() {
    this.log('Running TypeScript type checking...', 'info');
    
    try {
      execSync('npx tsc --noEmit', { 
        encoding: 'utf8',
        stdio: 'inherit'
      });
      this.log('Type checking passed', 'success');
      return true;
    } catch (error) {
      this.log('Type checking failed', 'error');
      return false;
    }
  }

  async generateCoverageReport() {
    this.log('Generating coverage report...', 'info');
    
    try {
      // Run all tests with coverage
      execSync('npx wtr **/*.test.ts --coverage', {
        stdio: 'inherit'
      });
      
      this.log('Coverage report generated', 'success');
      return true;
    } catch (error) {
      this.log('Coverage report generation failed', 'error');
      return false;
    }
  }

  generateSummaryReport() {
    const duration = Date.now() - this.startTime;
    const report = {
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        success_rate: ((this.results.passed / this.results.total) * 100).toFixed(2),
        duration: `${(duration / 1000).toFixed(2)}s`,
        timestamp: new Date().toISOString()
      },
      suites: this.results.suites
    };
    
    // Write report to file
    fs.writeFileSync('test-results.json', JSON.stringify(report, null, 2));
    
    return report;
  }

  printSummary(report) {
    this.log('\n=== TEST SUMMARY ===', 'info');
    this.log(`Total Tests: ${report.summary.total}`, 'info');
    this.log(`Passed: ${report.summary.passed}`, 'success');
    this.log(`Failed: ${report.summary.failed}`, report.summary.failed > 0 ? 'error' : 'info');
    this.log(`Success Rate: ${report.summary.success_rate}%`, 
             report.summary.success_rate === '100.00' ? 'success' : 'warning');
    this.log(`Duration: ${report.summary.duration}`, 'info');
    
    this.log('\n=== SUITE RESULTS ===', 'info');
    Object.entries(report.suites).forEach(([key, suite]) => {
      const status = suite.status === 'PASSED' ? 'success' : 'error';
      this.log(`${suite.name}: ${suite.status} (${suite.passed}/${suite.total})`, status);
    });
  }

  async run() {
    this.log('Starting Learning Progress Tracker Test Suite', 'info');
    this.log('='.repeat(50), 'info');
    
    // 1. Run static analysis
    const lintPassed = await this.runLinting();
    const typeCheckPassed = await this.runTypeChecking();
    
    if (!lintPassed || !typeCheckPassed) {
      this.log('Static analysis failed. Aborting test run.', 'error');
      process.exit(1);
    }
    
    // 2. Run test suites
    const suiteResults = [];
    for (const [key, suite] of Object.entries(TEST_SUITES)) {
      const result = await this.runTestSuite(key, suite);
      suiteResults.push(result);
    }
    
    // 3. Run cross-browser tests
    const crossBrowserResults = await this.runCrossBrowserTests();
    
    // 4. Generate coverage report
    await this.generateCoverageReport();
    
    // 5. Generate and display summary
    const report = this.generateSummaryReport();
    this.printSummary(report);
    
    // 6. Exit with appropriate code
    const allPassed = suiteResults.every(result => result === true);
    const crossBrowserPassed = Object.values(crossBrowserResults).every(
      result => result.status === 'PASSED'
    );
    
    if (allPassed && crossBrowserPassed) {
      this.log('\n🎉 All tests passed! Component is ready for deployment.', 'success');
      process.exit(0);
    } else {
      this.log('\n❌ Some tests failed. Please review and fix issues.', 'error');
      process.exit(1);
    }
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  const runner = new TestRunner();
  
  switch (command) {
    case 'unit':
      await runner.runTestSuite('unit', TEST_SUITES.unit);
      break;
    case 'comprehensive':
      await runner.runTestSuite('comprehensive', TEST_SUITES.comprehensive);
      break;
    case 'accessibility':
      await runner.runTestSuite('accessibility', TEST_SUITES.accessibility);
      break;
    case 'performance':
      await runner.runTestSuite('performance', TEST_SUITES.performance);
      break;
    case 'integration':
      await runner.runTestSuite('integration', TEST_SUITES.integration);
      break;
    case 'coverage':
      await runner.generateCoverageReport();
      break;
    case 'lint':
      await runner.runLinting();
      break;
    case 'type-check':
      await runner.runTypeChecking();
      break;
    default:
      await runner.run();
  }
}

main().catch(error => {
  console.error('Test runner failed:', error);
  process.exit(1);
});