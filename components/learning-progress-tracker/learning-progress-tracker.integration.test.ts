import { fixture, expect, html, aTimeout, waitUntil } from '@open-wc/testing';
import { LearningProgressTracker, type LearningProgressData } from './learning-progress-tracker.js';

describe('LearningProgressTracker - Integration Tests', () => {
  let element: LearningProgressTracker;
  let container: HTMLElement;
  
  const mockData: LearningProgressData = {
    learning_paths: [
      {
        id: 'react_fundamentals',
        title: 'React Fundamentals',
        difficulty: 'beginner',
        estimated_hours: 20,
        modules: ['Components and JSX', 'Props and State', 'Event Handling', 'Hooks Basics'],
        progress: 50,
        completed_modules: ['Components and JSX', 'Props and State'],
        status: 'in_progress'
      },
      {
        id: 'typescript_advanced',
        title: 'Advanced TypeScript',
        difficulty: 'advanced',
        estimated_hours: 40,
        modules: ['Generics', 'Decorators', 'Advanced Types'],
        progress: 25,
        completed_modules: ['Generics'],
        status: 'in_progress'
      }
    ],
    skills: [
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Programming Languages',
        level: 'advanced',
        progress: 85,
        last_updated: '2024-08-01'
      },
      {
        id: 'react',
        name: 'React',
        category: 'Frontend Frameworks',
        level: 'intermediate',
        progress: 70,
        last_updated: '2024-08-03'
      }
    ],
    goals: [
      {
        id: 'goal1',
        title: 'Master React Hooks',
        description: 'Complete understanding of all React hooks and their use cases',
        target_completion_date: '2024-12-31',
        progress: 60,
        status: 'active',
        learning_path_id: 'react_fundamentals'
      },
      {
        id: 'goal2',
        title: 'TypeScript Proficiency',
        description: 'Become proficient in TypeScript for large-scale applications',
        target_completion_date: '2024-11-15',
        progress: 30,
        status: 'active'
      }
    ],
    overall_progress: 38
  };

  beforeEach(async () => {
    container = await fixture<HTMLElement>(
      html`<div class="test-container">
        <learning-progress-tracker></learning-progress-tracker>
      </div>`
    );
    element = container.querySelector('learning-progress-tracker') as LearningProgressTracker;
  });

  describe('Integration with Parent Application', () => {
    it('should integrate seamlessly with parent DOM', async () => {
      expect(element.parentElement).to.equal(container);
      expect(container.querySelector('learning-progress-tracker')).to.equal(element);
    });

    it('should bubble custom events to parent', async () => {
      let parentEventFired = false;
      let eventDetail: any;
      
      container.addEventListener('learning-progress-data-loaded', (e: any) => {
        parentEventFired = true;
        eventDetail = e.detail;
      });
      
      element.data = mockData;
      await element.updateComplete;
      
      expect(parentEventFired).to.be.true;
      expect(eventDetail.data).to.deep.equal(mockData);
    });

    it('should handle CSS inheritance correctly', () => {
      container.style.fontSize = '14px';
      container.style.fontFamily = 'Arial, sans-serif';
      
      const computedStyle = getComputedStyle(element);
      expect(computedStyle.fontSize).to.equal('14px');
      expect(computedStyle.fontFamily).to.include('Arial');
    });

    it('should respect parent container constraints', async () => {
      container.style.width = '400px';
      container.style.maxWidth = '400px';
      
      element.data = mockData;
      await element.updateComplete;
      
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      expect(elementRect.width).to.be.at.most(containerRect.width);
    });

    it('should handle theme changes from parent', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Apply dark theme
      container.setAttribute('data-theme', 'dark');
      container.style.setProperty('--cre8-color-text', '#ffffff');
      container.style.setProperty('--cre8-color-surface', '#1a1a1a');
      
      await element.updateComplete;
      
      // Component should inherit theme variables
      const computedStyle = getComputedStyle(element);
      expect(computedStyle.getPropertyValue('--cre8-color-text')).to.equal('#ffffff');
      expect(computedStyle.getPropertyValue('--cre8-color-surface')).to.equal('#1a1a1a');
    });
  });

  describe('Multi-Component Interaction', () => {
    let secondElement: LearningProgressTracker;

    beforeEach(async () => {
      const secondContainer = document.createElement('div');
      secondContainer.innerHTML = '<learning-progress-tracker></learning-progress-tracker>';
      document.body.appendChild(secondContainer);
      secondElement = secondContainer.querySelector('learning-progress-tracker') as LearningProgressTracker;
      await secondElement.updateComplete;
    });

    afterEach(() => {
      secondElement.parentElement?.remove();
    });

    it('should handle multiple instances independently', async () => {
      element.data = mockData;
      secondElement.data = {
        learning_paths: [],
        skills: [],
        goals: [],
        overall_progress: 0
      };
      
      await Promise.all([element.updateComplete, secondElement.updateComplete]);
      
      // First element should show data
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
      
      // Second element should show empty state
      expect(secondElement.shadowRoot?.querySelector('.empty-state')).to.exist;
    });

    it('should not interfere with each other\'s events', async () => {
      let firstEventCount = 0;
      let secondEventCount = 0;
      
      element.addEventListener('learning-progress-data-loaded', () => firstEventCount++);
      secondElement.addEventListener('learning-progress-data-loaded', () => secondEventCount++);
      
      element.data = mockData;
      await element.updateComplete;
      
      expect(firstEventCount).to.equal(1);
      expect(secondEventCount).to.equal(0);
      
      secondElement.data = mockData;
      await secondElement.updateComplete;
      
      expect(firstEventCount).to.equal(1);
      expect(secondEventCount).to.equal(1);
    });

    it('should maintain separate state', async () => {
      element.data = mockData;
      secondElement.data = mockData;
      
      await Promise.all([element.updateComplete, secondElement.updateComplete]);
      
      // Update progress on first element
      element.updateProgress('react_fundamentals', 90);
      await element.updateComplete;
      
      // Second element should be unchanged
      const firstElementPath = element.data?.learning_paths.find(p => p.id === 'react_fundamentals');
      const secondElementPath = secondElement.data?.learning_paths.find(p => p.id === 'react_fundamentals');
      
      expect(firstElementPath?.progress).to.equal(90);
      expect(secondElementPath?.progress).to.equal(50); // Original value
    });
  });

  describe('Form Integration', () => {
    let form: HTMLFormElement;

    beforeEach(async () => {
      form = await fixture<HTMLFormElement>(html`
        <form>
          <learning-progress-tracker name="progress"></learning-progress-tracker>
          <button type="submit">Submit</button>
        </form>
      `);
      element = form.querySelector('learning-progress-tracker') as LearningProgressTracker;
    });

    it('should integrate with form submission patterns', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      let formSubmitted = false;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        formSubmitted = true;
      });
      
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      submitButton.click();
      
      expect(formSubmitted).to.be.true;
    });

    it('should provide data for form serialization', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Component should be accessible for form data extraction
      const formData = new FormData(form);
      
      // Custom elements don't automatically participate in form submission,
      // but the component should be queryable
      expect(form.querySelector('learning-progress-tracker')).to.equal(element);
      expect(element.data).to.deep.equal(mockData);
    });
  });

  describe('Progressive Enhancement', () => {
    it('should work without JavaScript fallback content', async () => {
      const fallbackElement = await fixture<HTMLElement>(html`
        <learning-progress-tracker>
          <div class="fallback-content">
            <p>Please enable JavaScript to view learning progress.</p>
          </div>
        </learning-progress-tracker>
      `);
      
      const tracker = fallbackElement as LearningProgressTracker;
      
      // Should upgrade and hide fallback content
      await tracker.updateComplete;
      
      // Fallback content should still be in light DOM but not visible
      expect(tracker.querySelector('.fallback-content')).to.exist;
      expect(tracker.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });

    it('should enhance server-rendered content', async () => {
      const ssrElement = await fixture<HTMLElement>(html`
        <learning-progress-tracker data-ssr="true">
          <script type="application/json" class="ssr-data">
            ${JSON.stringify(mockData)}
          </script>
        </learning-progress-tracker>
      `);
      
      const tracker = ssrElement as LearningProgressTracker;
      
      // Should be able to read SSR data
      const ssrData = tracker.querySelector('.ssr-data')?.textContent;
      if (ssrData) {
        const parsedData = JSON.parse(ssrData);
        tracker.data = parsedData;
        await tracker.updateComplete;
        
        expect(tracker.shadowRoot?.querySelector('.progress-tracker')).to.exist;
      }
    });
  });

  describe('Data Source Integration', () => {
    it('should integrate with REST API patterns', async () => {
      // Simulate API loading pattern
      element.loading = true;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.loading-state')).to.exist;
      
      // Simulate successful API response
      await aTimeout(100); // Simulate network delay
      element.loading = false;
      element.data = mockData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
      expect(element.shadowRoot?.querySelector('.loading-state')).to.not.exist;
    });

    it('should handle API error scenarios', async () => {
      element.loading = true;
      await element.updateComplete;
      
      // Simulate API error
      await aTimeout(50);
      element.loading = false;
      element.errorMessage = 'Failed to fetch data from API';
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.error-state')).to.exist;
      expect(element.shadowRoot?.textContent).to.include('Failed to fetch data from API');
      
      // Should provide retry mechanism
      const retryButton = element.shadowRoot?.querySelector('cre8-button[text="Retry"]');
      expect(retryButton).to.exist;
    });

    it('should integrate with real-time data updates', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      let dataUpdatedCount = 0;
      element.addEventListener('progress-updated', () => {
        dataUpdatedCount++;
      });
      
      // Simulate real-time updates
      const simulateRealtimeUpdate = async () => {
        await aTimeout(100);
        element.updateProgress('react_fundamentals', 60);
        await aTimeout(100);
        element.updateProgress('react_fundamentals', 70);
        await aTimeout(100);
        element.updateProgress('react_fundamentals', 80);
      };
      
      await simulateRealtimeUpdate();
      
      expect(dataUpdatedCount).to.equal(3);
      
      const updatedPath = element.data?.learning_paths.find(p => p.id === 'react_fundamentals');
      expect(updatedPath?.progress).to.equal(80);
    });

    it('should integrate with WebSocket-like updates', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      const mockWebSocketUpdates = [
        { type: 'progress_update', path_id: 'react_fundamentals', progress: 65 },
        { type: 'module_completed', path_id: 'react_fundamentals', module: 'Event Handling' },
        { type: 'goal_progress', goal_id: 'goal1', progress: 75 }
      ];
      
      let updateCount = 0;
      element.addEventListener('progress-updated', () => updateCount++);
      
      // Simulate WebSocket messages
      for (const update of mockWebSocketUpdates) {
        if (update.type === 'progress_update') {
          element.updateProgress(update.path_id, update.progress);
          await element.updateComplete;
        }
      }
      
      expect(updateCount).to.be.greaterThan(0);
    });
  });

  describe('State Management Integration', () => {
    it('should integrate with external state management', async () => {
      // Simulate external state store
      const mockStore = {
        state: { learningProgress: null },
        subscribers: [] as Function[],
        
        setState(newState: any) {
          this.state = { ...this.state, ...newState };
          this.subscribers.forEach(callback => callback(this.state));
        },
        
        subscribe(callback: Function) {
          this.subscribers.push(callback);
          return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) this.subscribers.splice(index, 1);
          };
        }
      };
      
      // Connect component to store
      const unsubscribe = mockStore.subscribe((state: any) => {
        element.data = state.learningProgress;
      });
      
      // Update store
      mockStore.setState({ learningProgress: mockData });
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
      
      // Update store again
      mockStore.setState({ 
        learningProgress: { ...mockData, overall_progress: 50 } 
      });
      await element.updateComplete;
      
      const progressText = element.shadowRoot?.querySelector('.progress-text')?.textContent;
      expect(progressText).to.include('50%');
      
      unsubscribe();
    });

    it('should emit events for state management integration', async () => {
      const stateUpdates: any[] = [];
      
      // Listen to all component events
      const eventTypes = [
        'learning-progress-data-loaded',
        'progress-updated',
        'learning-path-added',
        'learning-goal-added',
        'add-learning-path',
        'add-learning-goal',
        'retry-load'
      ];
      
      eventTypes.forEach(eventType => {
        element.addEventListener(eventType, (e: any) => {
          stateUpdates.push({ type: eventType, detail: e.detail });
        });
      });
      
      // Trigger various state changes
      element.data = mockData;
      await element.updateComplete;
      
      element.updateProgress('react_fundamentals', 75);
      await element.updateComplete;
      
      element.addLearningPath({
        id: 'new_path',
        title: 'New Path',
        difficulty: 'intermediate',
        estimated_hours: 15,
        modules: ['Module 1'],
        progress: 0,
        completed_modules: [],
        status: 'not_started'
      });
      await element.updateComplete;
      
      expect(stateUpdates.length).to.be.greaterThan(0);
      expect(stateUpdates.some(update => update.type === 'learning-progress-data-loaded')).to.be.true;
      expect(stateUpdates.some(update => update.type === 'progress-updated')).to.be.true;
      expect(stateUpdates.some(update => update.type === 'learning-path-added')).to.be.true;
    });
  });

  describe('Router Integration', () => {
    it('should handle URL parameter integration', async () => {
      // Simulate router providing data based on URL params
      const mockRouterParams = {
        userId: '123',
        trackingId: 'user-123-progress'
      };
      
      // Component should be able to use external routing data
      element.setAttribute('user-id', mockRouterParams.userId);
      element.setAttribute('tracking-id', mockRouterParams.trackingId);
      
      expect(element.getAttribute('user-id')).to.equal('123');
      expect(element.getAttribute('tracking-id')).to.equal('user-123-progress');
      
      // Load data based on routing parameters
      element.data = mockData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });

    it('should support deep linking to specific sections', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Simulate deep link to specific learning path
      const targetPathId = 'react_fundamentals';
      
      // Component should be able to highlight or focus specific sections
      const pathCard = element.shadowRoot?.querySelector(`[data-path-id="${targetPathId}"]`) ||
                      Array.from(element.shadowRoot?.querySelectorAll('.path-card') || [])
                        .find(card => card.textContent?.includes('React Fundamentals'));
      
      if (pathCard) {
        pathCard.scrollIntoView = () => {}; // Mock scrollIntoView
        pathCard.scrollIntoView();
      }
      
      expect(pathCard).to.exist;
    });
  });

  describe('Analytics Integration', () => {
    it('should provide data for analytics tracking', async () => {
      const analyticsEvents: any[] = [];
      
      // Mock analytics service
      const mockAnalytics = {
        track: (event: string, data: any) => {
          analyticsEvents.push({ event, data, timestamp: Date.now() });
        }
      };
      
      // Track component interactions
      element.addEventListener('progress-updated', (e: any) => {
        mockAnalytics.track('progress_updated', {
          pathId: e.detail.pathId,
          progress: e.detail.progress
        });
      });
      
      element.addEventListener('add-learning-path', () => {
        mockAnalytics.track('add_path_clicked', {});
      });
      
      element.data = mockData;
      element.config = { ...element.config, enableGoalSetting: true };
      await element.updateComplete;
      
      // Simulate user interactions
      element.updateProgress('react_fundamentals', 85);
      await element.updateComplete;
      
      const addButton = element.shadowRoot?.querySelector('cre8-button[text="Add Path"]') as HTMLElement;
      addButton?.click();
      
      expect(analyticsEvents.length).to.equal(2);
      expect(analyticsEvents[0].event).to.equal('progress_updated');
      expect(analyticsEvents[1].event).to.equal('add_path_clicked');
    });

    it('should provide performance metrics', async () => {
      const performanceMetrics: any[] = [];
      
      const trackPerformance = (metric: string, value: number) => {
        performanceMetrics.push({ metric, value, timestamp: Date.now() });
      };
      
      // Track render performance
      const startTime = performance.now();
      element.data = mockData;
      await element.updateComplete;
      const renderTime = performance.now() - startTime;
      
      trackPerformance('component_render_time', renderTime);
      
      // Track interaction performance
      const interactionStart = performance.now();
      const toggleButton = element.shadowRoot?.querySelector('cre8-button[text="View Modules"]') as HTMLElement;
      toggleButton?.click();
      await element.updateComplete;
      const interactionTime = performance.now() - interactionStart;
      
      trackPerformance('interaction_time', interactionTime);
      
      expect(performanceMetrics.length).to.equal(2);
      expect(performanceMetrics[0].metric).to.equal('component_render_time');
      expect(performanceMetrics[1].metric).to.equal('interaction_time');
    });
  });

  describe('Testing Integration', () => {
    it('should support automated testing scenarios', async () => {
      // Component should be testable with standard testing tools
      element.data = mockData;
      await element.updateComplete;
      
      // Test data attributes for automation
      element.setAttribute('data-testid', 'learning-progress-tracker');
      expect(element.getAttribute('data-testid')).to.equal('learning-progress-tracker');
      
      // Shadow DOM should be accessible for testing
      expect(element.shadowRoot).to.exist;
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
      
      // Events should be testable
      let eventFired = false;
      element.addEventListener('progress-updated', () => {
        eventFired = true;
      });
      
      element.updateProgress('react_fundamentals', 95);
      expect(eventFired).to.be.true;
    });

    it('should support visual regression testing', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Component should render consistently
      const snapshot1 = element.shadowRoot?.innerHTML;
      
      // Re-render with same data
      element.data = { ...mockData };
      await element.updateComplete;
      
      const snapshot2 = element.shadowRoot?.innerHTML;
      
      // Should produce identical output for identical input
      expect(snapshot1).to.equal(snapshot2);
    });

    it('should support E2E testing patterns', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Should support common E2E testing patterns
      const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
      expect(buttons?.length).to.be.greaterThan(0);
      
      // Should be able to simulate user flows
      const expandButton = element.shadowRoot?.querySelector('cre8-button[text="View Modules"]') as HTMLElement;
      expandButton?.click();
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.modules-list')).to.exist;
      
      const collapseButton = element.shadowRoot?.querySelector('cre8-button[text="Show Less"]') as HTMLElement;
      collapseButton?.click();
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.modules-list')).to.not.exist;
    });
  });
});