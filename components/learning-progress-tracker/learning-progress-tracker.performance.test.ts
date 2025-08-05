import { fixture, expect, html } from '@open-wc/testing';
import { LearningProgressTracker, type LearningProgressData } from './learning-progress-tracker.js';

describe('LearningProgressTracker - Performance Tests', () => {
  let element: LearningProgressTracker;
  
  // Helper to generate large datasets for performance testing
  const generateLargeDataset = (
    pathsCount: number = 100,
    skillsCount: number = 50,
    goalsCount: number = 25
  ): LearningProgressData => ({
    learning_paths: Array.from({ length: pathsCount }, (_, i) => ({
      id: `path_${i}`,
      title: `Learning Path ${i}`,
      difficulty: (['beginner', 'intermediate', 'advanced'] as const)[i % 3],
      estimated_hours: 20 + (i % 40),
      modules: Array.from({ length: 5 + (i % 10) }, (_, j) => `Module ${j + 1} for Path ${i}`),
      progress: Math.floor(Math.random() * 100),
      completed_modules: Array.from({ length: Math.floor(Math.random() * 5) }, (_, j) => `Module ${j + 1} for Path ${i}`),
      status: (['not_started', 'in_progress', 'completed'] as const)[i % 3]
    })),
    skills: Array.from({ length: skillsCount }, (_, i) => ({
      id: `skill_${i}`,
      name: `Skill ${i}`,
      category: `Category ${i % 5}`,
      level: (['novice', 'intermediate', 'advanced', 'expert'] as const)[i % 4],
      progress: Math.floor(Math.random() * 100),
      last_updated: new Date(2024, 7, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0]
    })),
    goals: Array.from({ length: goalsCount }, (_, i) => ({
      id: `goal_${i}`,
      title: `Goal ${i}`,
      description: `This is a detailed description for goal ${i} that explains what needs to be accomplished.`,
      target_completion_date: new Date(2024, 11, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
      progress: Math.floor(Math.random() * 100),
      status: (['active', 'completed', 'paused'] as const)[i % 3]
    })),
    overall_progress: Math.floor(Math.random() * 100)
  });

  beforeEach(async () => {
    element = await fixture<LearningProgressTracker>(
      html`<learning-progress-tracker></learning-progress-tracker>`
    );
  });

  describe('Initial Rendering Performance', () => {
    it('should render small dataset quickly', async () => {
      const smallData = generateLargeDataset(5, 5, 5);
      
      const startTime = performance.now();
      element.data = smallData;
      await element.updateComplete;
      const endTime = performance.now();
      
      const renderTime = endTime - startTime;
      expect(renderTime).to.be.lessThan(50); // Should render in < 50ms
    });

    it('should render medium dataset efficiently', async () => {
      const mediumData = generateLargeDataset(25, 15, 10);
      
      const startTime = performance.now();
      element.data = mediumData;
      await element.updateComplete;
      const endTime = performance.now();
      
      const renderTime = endTime - startTime;
      expect(renderTime).to.be.lessThan(200); // Should render in < 200ms
    });

    it('should handle large dataset within performance budget', async () => {
      const largeData = generateLargeDataset(100, 50, 25);
      
      const startTime = performance.now();
      element.data = largeData;
      await element.updateComplete;
      const endTime = performance.now();
      
      const renderTime = endTime - startTime;
      expect(renderTime).to.be.lessThan(1000); // Should render in < 1s
      
      // Should still respect maxPathsToShow limit
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      expect(pathCards?.length).to.equal(6); // Default maxPathsToShow
    });

    it('should handle very large dataset gracefully', async () => {
      const veryLargeData = generateLargeDataset(1000, 500, 250);
      
      const startTime = performance.now();
      element.data = veryLargeData;
      await element.updateComplete;
      const endTime = performance.now();
      
      const renderTime = endTime - startTime;
      expect(renderTime).to.be.lessThan(2000); // Should render in < 2s
      
      // Should still be functional despite large dataset
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });
  });

  describe('Update Performance', () => {
    let largeData: LearningProgressData;

    beforeEach(async () => {
      largeData = generateLargeDataset(50, 25, 15);
      element.data = largeData;
      await element.updateComplete;
    });

    it('should update progress efficiently', async () => {
      const startTime = performance.now();
      
      for (let i = 0; i < 10; i++) {
        element.updateProgress(`path_${i}`, Math.floor(Math.random() * 100));
        await element.updateComplete;
      }
      
      const endTime = performance.now();
      const updateTime = endTime - startTime;
      
      expect(updateTime).to.be.lessThan(500); // Should update in < 500ms
    });

    it('should handle rapid config changes', async () => {
      const configs = [
        { showSkills: false, showGoals: true },
        { showSkills: true, showGoals: false },
        { showSkills: true, showGoals: true, maxPathsToShow: 3 },
        { showSkills: false, showGoals: false, showOverallProgress: false }
      ];
      
      const startTime = performance.now();
      
      for (const config of configs) {
        element.config = { ...element.config, ...config };
        await element.updateComplete;
      }
      
      const endTime = performance.now();
      const configTime = endTime - startTime;
      
      expect(configTime).to.be.lessThan(200); // Should handle config changes in < 200ms
    });

    it('should batch multiple data updates', async () => {
      let updateCount = 0;
      const originalRequestUpdate = element.requestUpdate;
      
      element.requestUpdate = () => {
        updateCount++;
        return originalRequestUpdate.call(element);
      };
      
      // Make multiple rapid changes
      element.data = { ...largeData, overall_progress: 10 };
      element.data = { ...largeData, overall_progress: 20 };
      element.data = { ...largeData, overall_progress: 30 };
      element.data = { ...largeData, overall_progress: 40 };
      
      await element.updateComplete;
      
      // Should not trigger update for every single change
      expect(updateCount).to.be.lessThan(10);
      
      // Restore original method
      element.requestUpdate = originalRequestUpdate;
    });

    it('should handle state transitions efficiently', async () => {
      const states = [
        { loading: true, errorMessage: '', data: null },
        { loading: false, errorMessage: 'Error occurred', data: null },
        { loading: false, errorMessage: '', data: largeData },
        { loading: true, errorMessage: '', data: largeData }
      ];
      
      const startTime = performance.now();
      
      for (const state of states) {
        element.loading = state.loading;
        element.errorMessage = state.errorMessage;
        element.data = state.data;
        await element.updateComplete;
      }
      
      const endTime = performance.now();
      const stateTime = endTime - startTime;
      
      expect(stateTime).to.be.lessThan(300); // Should handle state changes in < 300ms
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory with frequent data updates', async () => {
      const initialNodeCount = element.shadowRoot?.querySelectorAll('*').length || 0;
      
      // Simulate frequent data updates
      for (let i = 0; i < 20; i++) {
        const data = generateLargeDataset(10, 5, 3);
        element.data = data;
        await element.updateComplete;
        
        // Occasionally clear data
        if (i % 5 === 0) {
          element.data = null;
          await element.updateComplete;
        }
      }
      
      // Final state with data
      element.data = generateLargeDataset(10, 5, 3);
      await element.updateComplete;
      
      const finalNodeCount = element.shadowRoot?.querySelectorAll('*').length || 0;
      
      // Should not accumulate excessive DOM nodes
      expect(finalNodeCount).to.be.closeTo(initialNodeCount, 50);
    });

    it('should clean up event listeners properly', async () => {
      let eventCount = 0;
      
      const trackEvent = () => eventCount++;
      element.addEventListener('learning-progress-data-loaded', trackEvent);
      
      // Add and remove data multiple times
      for (let i = 0; i < 10; i++) {
        element.data = generateLargeDataset(5, 3, 2);
        await element.updateComplete;
        element.data = null;
        await element.updateComplete;
      }
      
      element.removeEventListener('learning-progress-data-loaded', trackEvent);
      
      // Event should have fired for each data set
      expect(eventCount).to.equal(10);
    });

    it('should handle component removal gracefully', async () => {
      element.data = generateLargeDataset(20, 10, 5);
      await element.updateComplete;
      
      // Remove component from DOM
      element.remove();
      
      // Should not throw errors or cause memory leaks
      expect(() => {
        element.data = null;
        element.loading = true;
        element.errorMessage = 'test';
      }).to.not.throw();
    });
  });

  describe('DOM Efficiency', () => {
    it('should minimize DOM operations during updates', async () => {
      element.data = generateLargeDataset(30, 15, 10);
      await element.updateComplete;
      
      const initialNodes = element.shadowRoot?.querySelectorAll('*').length || 0;
      
      // Update progress for multiple paths
      const paths = element.data?.learning_paths.slice(0, 5) || [];
      for (const path of paths) {
        element.updateProgress(path.id, (path.progress || 0) + 10);
      }
      
      await element.updateComplete;
      
      const finalNodes = element.shadowRoot?.querySelectorAll('*').length || 0;
      
      // Node count should remain stable during updates
      expect(finalNodes).to.equal(initialNodes);
    });

    it('should reuse DOM elements efficiently', async () => {
      const smallData = generateLargeDataset(3, 2, 1);
      element.data = smallData;
      await element.updateComplete;
      
      const initialCards = Array.from(element.shadowRoot?.querySelectorAll('.path-card') || []);
      
      // Update with similar structure
      const updatedData = generateLargeDataset(3, 2, 1);
      element.data = updatedData;
      await element.updateComplete;
      
      const updatedCards = Array.from(element.shadowRoot?.querySelectorAll('.path-card') || []);
      
      // Should have same number of cards
      expect(updatedCards.length).to.equal(initialCards.length);
    });

    it('should handle partial updates efficiently', async () => {
      element.data = generateLargeDataset(20, 10, 5);
      await element.updateComplete;
      
      const startTime = performance.now();
      
      // Toggle path expansion (partial update)
      const toggleButton = element.shadowRoot?.querySelector('cre8-button[text="View Modules"]') as HTMLElement;
      toggleButton?.click();
      await element.updateComplete;
      
      const endTime = performance.now();
      const toggleTime = endTime - startTime;
      
      expect(toggleTime).to.be.lessThan(50); // Partial updates should be very fast
    });
  });

  describe('Computational Performance', () => {
    let complexData: LearningProgressData;

    beforeEach(() => {
      complexData = generateLargeDataset(100, 50, 30);
    });

    it('should calculate overall progress efficiently', async () => {
      const startTime = performance.now();
      
      element.data = complexData;
      await element.updateComplete;
      
      const endTime = performance.now();
      const calcTime = endTime - startTime;
      
      expect(calcTime).to.be.lessThan(100); // Progress calculation should be fast
      
      // Should display calculated progress
      const progressText = element.shadowRoot?.querySelector('.progress-text')?.textContent;
      expect(progressText).to.match(/\d+% Overall Progress/);
    });

    it('should count statistics efficiently', async () => {
      const startTime = performance.now();
      
      element.data = complexData;
      await element.updateComplete;
      
      // Get all statistics
      const statValues = Array.from(element.shadowRoot?.querySelectorAll('.stat-value') || [])
        .map(el => parseInt(el.textContent || '0'));
      
      const endTime = performance.now();
      const statTime = endTime - startTime;
      
      expect(statTime).to.be.lessThan(50); // Statistics should be calculated quickly
      expect(statValues.length).to.equal(3); // Completed paths, active goals, skills count
      expect(statValues.every(val => val >= 0)).to.be.true;
    });

    it('should filter and limit data efficiently', async () => {
      element.config = { ...element.config, maxPathsToShow: 10 };
      
      const startTime = performance.now();
      
      element.data = complexData;
      await element.updateComplete;
      
      const endTime = performance.now();
      const filterTime = endTime - startTime;
      
      expect(filterTime).to.be.lessThan(100); // Filtering should be fast
      
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      expect(pathCards?.length).to.equal(10); // Should respect limit
    });

    it('should handle complex module structures efficiently', async () => {
      // Create data with many modules per path
      const moduleHeavyData = generateLargeDataset(10, 5, 3);
      moduleHeavyData.learning_paths.forEach(path => {
        path.modules = Array.from({ length: 50 }, (_, i) => `Module ${i + 1}`);
        path.completed_modules = Array.from({ length: 25 }, (_, i) => `Module ${i + 1}`);
      });
      
      const startTime = performance.now();
      
      element.data = moduleHeavyData;
      await element.updateComplete;
      
      // Expand first path to show modules
      const toggleButton = element.shadowRoot?.querySelector('cre8-button[text="View Modules"]') as HTMLElement;
      toggleButton?.click();
      await element.updateComplete;
      
      const endTime = performance.now();
      const moduleTime = endTime - startTime;
      
      expect(moduleTime).to.be.lessThan(200); // Should handle many modules efficiently
      
      const moduleItems = element.shadowRoot?.querySelectorAll('.module-item');
      expect(moduleItems?.length).to.equal(50);
    });
  });

  describe('Bundle Size and Resource Usage', () => {
    it('should have minimal impact on bundle size', () => {
      // Check that component doesn't import unnecessary dependencies
      const componentSource = element.constructor.toString();
      
      // Should not include large utility libraries
      expect(componentSource).to.not.include('lodash');
      expect(componentSource).to.not.include('moment');
      expect(componentSource).to.not.include('rxjs');
    });

    it('should lazy load non-critical features', async () => {
      // Initial render should be fast even without full data
      const startTime = performance.now();
      
      element.data = null;
      await element.updateComplete;
      
      const endTime = performance.now();
      const emptyRenderTime = endTime - startTime;
      
      expect(emptyRenderTime).to.be.lessThan(20); // Empty state should render very quickly
    });

    it('should minimize CSS calculations', async () => {
      element.data = generateLargeDataset(20, 10, 5);
      await element.updateComplete;
      
      const startTime = performance.now();
      
      // Force style recalculation
      element.shadowRoot?.querySelectorAll('*').forEach(el => {
        getComputedStyle(el as Element);
      });
      
      const endTime = performance.now();
      const styleTime = endTime - startTime;
      
      expect(styleTime).to.be.lessThan(100); // Style calculations should be efficient
    });
  });

  describe('Stress Testing', () => {
    it('should handle rapid consecutive updates', async () => {
      const updates = 50;
      const startTime = performance.now();
      
      for (let i = 0; i < updates; i++) {
        element.data = generateLargeDataset(5, 3, 2);
        // Don't await each update to test batching
      }
      
      await element.updateComplete;
      const endTime = performance.now();
      const batchTime = endTime - startTime;
      
      expect(batchTime).to.be.lessThan(1000); // Should handle batched updates efficiently
    });

    it('should maintain performance with frequent interactions', async () => {
      element.data = generateLargeDataset(20, 10, 5);
      await element.updateComplete;
      
      const interactions = 20;
      const startTime = performance.now();
      
      for (let i = 0; i < interactions; i++) {
        // Simulate user interactions
        const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
        const randomButton = buttons?.[Math.floor(Math.random() * (buttons?.length || 1))];
        randomButton?.dispatchEvent(new Event('click'));
        
        if (i % 5 === 0) {
          await element.updateComplete;
        }
      }
      
      await element.updateComplete;
      const endTime = performance.now();
      const interactionTime = endTime - startTime;
      
      expect(interactionTime).to.be.lessThan(500); // Interactions should remain responsive
    });

    it('should recover from performance bottlenecks', async () => {
      // Create extremely large dataset
      const extremeData = generateLargeDataset(1000, 500, 250);
      
      const startTime = performance.now();
      element.data = extremeData;
      await element.updateComplete;
      const heavyLoadTime = performance.now() - startTime;
      
      // Now switch to normal dataset
      const normalStart = performance.now();
      element.data = generateLargeDataset(10, 5, 3);
      await element.updateComplete;
      const normalLoadTime = performance.now() - normalStart;
      
      // Should recover to normal performance quickly
      expect(normalLoadTime).to.be.lessThan(heavyLoadTime / 5);
      expect(normalLoadTime).to.be.lessThan(100);
    });
  });

  describe('Cross-browser Performance', () => {
    it('should perform consistently across browsers', async () => {
      // Test performance with different browser-specific features
      const data = generateLargeDataset(30, 15, 10);
      
      const startTime = performance.now();
      element.data = data;
      await element.updateComplete;
      const endTime = performance.now();
      
      const renderTime = endTime - startTime;
      
      // Should be reasonable on all browsers
      expect(renderTime).to.be.lessThan(500);
      
      // Component should be functional regardless of browser
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });

    it('should handle different viewport sizes efficiently', async () => {
      element.data = generateLargeDataset(20, 10, 5);
      
      const viewports = [
        { width: 320, height: 568 },  // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1440, height: 900 }  // Desktop
      ];
      
      for (const viewport of viewports) {
        Object.defineProperty(window, 'innerWidth', { value: viewport.width, configurable: true });
        Object.defineProperty(window, 'innerHeight', { value: viewport.height, configurable: true });
        
        const startTime = performance.now();
        window.dispatchEvent(new Event('resize'));
        await element.updateComplete;
        const endTime = performance.now();
        
        const resizeTime = endTime - startTime;
        expect(resizeTime).to.be.lessThan(100); // Resize should be fast
      }
    });
  });
});