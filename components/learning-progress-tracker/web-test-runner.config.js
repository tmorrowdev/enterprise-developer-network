export default {
  // Test files
  files: '**/*.test.ts',
  
  // Test runner options
  nodeResolve: true,
  preserveSymlinks: true,
  
  // Coverage configuration
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85
    },
    include: [
      'learning-progress-tracker.ts'
    ],
    exclude: [
      '**/*.test.ts',
      '**/*.spec.ts',
      '**/node_modules/**'
    ]
  },

  // Test timeout
  testsStartTimeout: 30000,
  testsFinishTimeout: 120000,
  browserStartTimeout: 30000,

  // Test groups for parallel execution
  groups: [
    {
      name: 'unit',
      files: 'learning-progress-tracker.test.ts'
    },
    {
      name: 'comprehensive',
      files: 'learning-progress-tracker.comprehensive.test.ts'
    },
    {
      name: 'accessibility',
      files: 'learning-progress-tracker.accessibility.test.ts'
    },
    {
      name: 'performance',
      files: 'learning-progress-tracker.performance.test.ts'
    },
    {
      name: 'integration',
      files: 'learning-progress-tracker.integration.test.ts'
    },
    {
      name: 'cross-browser',
      files: 'learning-progress-tracker.cross-browser.test.ts'
    }
  ],

  // Concurrent testing
  concurrentBrowsers: 1,
  concurrency: 2,

  // Development mode
  watch: false,
  
  // Test environment setup
  testFramework: {
    config: {
      timeout: 10000,
      retries: 1
    }
  }
};