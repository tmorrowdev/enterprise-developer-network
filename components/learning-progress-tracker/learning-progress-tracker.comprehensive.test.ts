import { fixture, expect, html, aTimeout, waitUntil } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { LearningProgressTracker, type LearningProgressData, type LearningPath, type LearningGoal, type SkillLevel } from './learning-progress-tracker.js';

describe('LearningProgressTracker - Comprehensive Test Suite', () => {
  let element: LearningProgressTracker;
  
  const mockData: LearningProgressData = {
    learning_paths: [
      {
        id: 'react_fundamentals',
        title: 'React Fundamentals',
        difficulty: 'beginner',
        estimated_hours: 20,
        modules: ['Components and JSX', 'Props and State', 'Event Handling', 'Hooks Basics'],
        progress: 75,
        completed_modules: ['Components and JSX', 'Props and State', 'Event Handling'],
        status: 'in_progress'
      },
      {
        id: 'typescript_advanced',
        title: 'Advanced TypeScript',
        difficulty: 'advanced',
        estimated_hours: 40,
        modules: ['Generics', 'Decorators', 'Advanced Types', 'Utility Types'],
        progress: 30,
        completed_modules: ['Generics'],
        status: 'in_progress'
      },
      {
        id: 'node_basics',
        title: 'Node.js Basics',
        difficulty: 'intermediate',
        estimated_hours: 25,
        modules: ['File System', 'HTTP Module', 'Express.js'],
        progress: 100,
        completed_modules: ['File System', 'HTTP Module', 'Express.js'],
        status: 'completed'
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
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        category: 'Programming Languages',
        level: 'novice',
        progress: 25,
        last_updated: '2024-07-28'
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        category: 'Backend Technologies',
        level: 'expert',
        progress: 95,
        last_updated: '2024-08-05'
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
        progress: 85,
        status: 'active'
      },
      {
        id: 'goal3',
        title: 'Node.js Certification',
        description: 'Complete Node.js certification program',
        target_completion_date: '2024-10-01',
        progress: 100,
        status: 'completed'
      },
      {
        id: 'goal4',
        title: 'Design Patterns Study',
        description: 'Study common design patterns in JavaScript',
        target_completion_date: '2025-01-30',
        progress: 15,
        status: 'paused'
      }
    ],
    overall_progress: 68
  };

  const emptyData: LearningProgressData = {
    learning_paths: [],
    skills: [],
    goals: [],
    overall_progress: 0
  };

  beforeEach(async () => {
    element = await fixture<LearningProgressTracker>(
      html`<learning-progress-tracker></learning-progress-tracker>`
    );
  });

  describe('Component Initialization', () => {
    it('should initialize with default config', () => {
      expect(element.config).to.deep.equal({
        showSkills: true,
        showGoals: true,
        showOverallProgress: true,
        maxPathsToShow: 6,
        enableGoalSetting: true
      });
    });

    it('should initialize with null data', () => {
      expect(element.data).to.be.null;
    });

    it('should initialize with loading false', () => {
      expect(element.loading).to.be.false;
    });

    it('should initialize with empty error message', () => {
      expect(element.errorMessage).to.equal('');
    });

    it('should have proper custom element registration', () => {
      expect(customElements.get('learning-progress-tracker')).to.equal(LearningProgressTracker);
    });
  });

  describe('Data Binding and Reactivity', () => {
    it('should react to data property changes', async () => {
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.not.exist;
      
      element.data = mockData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });

    it('should dispatch data loaded event when data is set', async () => {
      let eventFired = false;
      let eventDetail: any;
      
      element.addEventListener('learning-progress-data-loaded', (e: any) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      element.data = mockData;
      await element.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(eventDetail.data).to.deep.equal(mockData);
    });

    it('should handle config changes reactively', async () => {
      element.data = mockData;
      element.config = { ...element.config, showSkills: false };
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.skills-grid')).to.not.exist;
    });

    it('should handle loading state changes', async () => {
      element.loading = true;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.loading-state')).to.exist;
      expect(element.shadowRoot?.querySelector('cre8-loading-spinner')).to.exist;
      
      element.loading = false;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.loading-state')).to.not.exist;
    });

    it('should handle error state changes', async () => {
      element.errorMessage = 'Network timeout';
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.error-state')).to.exist;
      expect(element.shadowRoot?.textContent).to.include('Network timeout');
      
      element.errorMessage = '';
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.error-state')).to.not.exist;
    });
  });

  describe('Progress Tracking and Calculations', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should calculate overall progress correctly', () => {
      // Average of path progress: (75 + 30 + 100) / 3 = 68.33 -> 68
      const progressFill = element.shadowRoot?.querySelector('.progress-fill') as HTMLElement;
      expect(progressFill?.style.width).to.equal('68%');
      
      const progressText = element.shadowRoot?.querySelector('.progress-text')?.textContent;
      expect(progressText).to.include('68% Overall Progress');
    });

    it('should handle zero progress paths', async () => {
      const dataWithZeroProgress = {
        ...mockData,
        learning_paths: [{
          ...mockData.learning_paths[0],
          progress: 0
        }]
      };
      
      element.data = dataWithZeroProgress;
      await element.updateComplete;
      
      const progressFill = element.shadowRoot?.querySelector('.progress-fill') as HTMLElement;
      expect(progressFill?.style.width).to.equal('0%');
    });

    it('should count completed paths correctly', () => {
      const completedStat = element.shadowRoot?.querySelector('.stat-item .stat-value')?.textContent;
      expect(completedStat).to.equal('1'); // Only node_basics is completed
    });

    it('should count active goals correctly', () => {
      const statItems = element.shadowRoot?.querySelectorAll('.stat-item .stat-value');
      const activeGoalsStat = statItems?.[1]?.textContent;
      expect(activeGoalsStat).to.equal('2'); // goal1 and goal2 are active
    });

    it('should count skills correctly', () => {
      const statItems = element.shadowRoot?.querySelectorAll('.stat-item .stat-value');
      const skillsStat = statItems?.[2]?.textContent;
      expect(skillsStat).to.equal('4');
    });

    it('should handle empty data gracefully', async () => {
      element.data = emptyData;
      await element.updateComplete;
      
      const progressText = element.shadowRoot?.querySelector('.progress-text')?.textContent;
      expect(progressText).to.include('0% Overall Progress');
    });
  });

  describe('Learning Path Management', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should render all learning paths within limit', () => {
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      expect(pathCards?.length).to.equal(3);
    });

    it('should respect maxPathsToShow configuration', async () => {
      element.config = { ...element.config, maxPathsToShow: 2 };
      await element.updateComplete;
      
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      expect(pathCards?.length).to.equal(2);
    });

    it('should render difficulty badges correctly', () => {
      const beginnerBadge = element.shadowRoot?.querySelector('.difficulty-beginner');
      const advancedBadge = element.shadowRoot?.querySelector('.difficulty-advanced');
      const intermediateBadge = element.shadowRoot?.querySelector('.difficulty-intermediate');
      
      expect(beginnerBadge?.textContent).to.equal('beginner');
      expect(advancedBadge?.textContent).to.equal('advanced');
      expect(intermediateBadge?.textContent).to.equal('intermediate');
    });

    it('should show correct path metadata', () => {
      const pathMeta = element.shadowRoot?.querySelector('.path-meta')?.textContent;
      expect(pathMeta).to.include('20h');
      expect(pathMeta).to.include('4 modules');
    });

    it('should toggle path expansion correctly', async () => {
      const toggleButton = element.shadowRoot?.querySelector('cre8-button[text="View Modules"]') as HTMLElement;
      
      // Initially collapsed
      expect(element.shadowRoot?.querySelector('.modules-list')).to.not.exist;
      
      // Expand
      toggleButton.click();
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.modules-list')).to.exist;
      const showLessButton = element.shadowRoot?.querySelector('cre8-button[text="Show Less"]');
      expect(showLessButton).to.exist;
      
      // Collapse
      (showLessButton as HTMLElement).click();
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.modules-list')).to.not.exist;
    });

    it('should show module completion status', async () => {
      // Expand first path
      const toggleButton = element.shadowRoot?.querySelector('cre8-button[text="View Modules"]') as HTMLElement;
      toggleButton.click();
      await element.updateComplete;
      
      const completedModules = element.shadowRoot?.querySelectorAll('.module-completed');
      const pendingModules = element.shadowRoot?.querySelectorAll('.module-pending');
      
      expect(completedModules?.length).to.equal(3); // 3 completed modules
      expect(pendingModules?.length).to.equal(1); // 1 pending module
    });

    it('should handle adding new learning path', async () => {
      const initialCount = element.data?.learning_paths.length || 0;
      
      let eventFired = false;
      let eventDetail: any;
      element.addEventListener('learning-path-added', (e: any) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      const newPath: LearningPath = {
        id: 'vue_basics',
        title: 'Vue.js Basics',
        difficulty: 'beginner',
        estimated_hours: 15,
        modules: ['Vue Instance', 'Components', 'Directives'],
        progress: 0,
        completed_modules: [],
        status: 'not_started'
      };
      
      element.addLearningPath(newPath);
      await element.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(eventDetail.path).to.deep.equal(newPath);
      expect(element.data?.learning_paths.length).to.equal(initialCount + 1);
    });

    it('should update path progress programmatically', async () => {
      let eventFired = false;
      let eventDetail: any;
      element.addEventListener('progress-updated', (e: any) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      element.updateProgress('react_fundamentals', 90);
      await element.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(eventDetail.pathId).to.equal('react_fundamentals');
      expect(eventDetail.progress).to.equal(90);
      
      const updatedPath = element.data?.learning_paths.find(p => p.id === 'react_fundamentals');
      expect(updatedPath?.progress).to.equal(90);
    });

    it('should clamp progress values', async () => {
      element.updateProgress('react_fundamentals', 150);
      await element.updateComplete;
      
      const updatedPath = element.data?.learning_paths.find(p => p.id === 'react_fundamentals');
      expect(updatedPath?.progress).to.equal(100);
      
      element.updateProgress('react_fundamentals', -10);
      await element.updateComplete;
      
      const updatedPath2 = element.data?.learning_paths.find(p => p.id === 'react_fundamentals');
      expect(updatedPath2?.progress).to.equal(0);
    });
  });

  describe('Skills Management', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should render all skill cards', () => {
      const skillCards = element.shadowRoot?.querySelectorAll('.skill-card');
      expect(skillCards?.length).to.equal(4);
    });

    it('should render skill level badges correctly', () => {
      const noviceLevel = element.shadowRoot?.querySelector('.level-novice');
      const intermediateLevel = element.shadowRoot?.querySelector('.level-intermediate');
      const advancedLevel = element.shadowRoot?.querySelector('.level-advanced');
      const expertLevel = element.shadowRoot?.querySelector('.level-expert');
      
      expect(noviceLevel?.textContent).to.equal('novice');
      expect(intermediateLevel?.textContent).to.equal('intermediate');
      expect(advancedLevel?.textContent).to.equal('advanced');
      expect(expertLevel?.textContent).to.equal('expert');
    });

    it('should show skill progress correctly', () => {
      const progressBars = element.shadowRoot?.querySelectorAll('.skill-card .progress-text');
      expect(progressBars?.[0]?.textContent).to.include('85% proficiency');
      expect(progressBars?.[1]?.textContent).to.include('70% proficiency');
    });

    it('should format last updated dates correctly', () => {
      const skillCards = element.shadowRoot?.querySelectorAll('.skill-card');
      const dateText = skillCards?.[0]?.textContent;
      expect(dateText).to.include('8/1/2024'); // Formatted date
    });

    it('should hide skills when configured', async () => {
      element.config = { ...element.config, showSkills: false };
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.skills-grid')).to.not.exist;
    });

    it('should show empty state for skills', async () => {
      element.data = { ...mockData, skills: [] };
      await element.updateComplete;
      
      const emptyState = element.shadowRoot?.querySelector('.skills-grid')?.parentElement?.querySelector('.empty-state');
      expect(emptyState).to.exist;
      expect(emptyState?.textContent).to.include('No skills tracked yet');
    });
  });

  describe('Goals Management', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should render all goal cards', () => {
      const goalCards = element.shadowRoot?.querySelectorAll('.goal-card');
      expect(goalCards?.length).to.equal(4);
    });

    it('should render goal status badges correctly', () => {
      const activeStatus = element.shadowRoot?.querySelector('.status-active');
      const completedStatus = element.shadowRoot?.querySelector('.status-completed');
      const pausedStatus = element.shadowRoot?.querySelector('.status-paused');
      
      expect(activeStatus?.textContent).to.equal('active');
      expect(completedStatus?.textContent).to.equal('completed');
      expect(pausedStatus?.textContent).to.equal('paused');
    });

    it('should show goal progress and due dates', () => {
      const goalMeta = element.shadowRoot?.querySelectorAll('.goal-meta');
      expect(goalMeta?.[0]?.textContent).to.include('60% complete');
      expect(goalMeta?.[0]?.textContent).to.include('12/31/2024');
    });

    it('should handle adding new learning goal', async () => {
      const initialCount = element.data?.goals.length || 0;
      
      let eventFired = false;
      let eventDetail: any;
      element.addEventListener('learning-goal-added', (e: any) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      const newGoal: LearningGoal = {
        id: 'new_goal',
        title: 'Learn GraphQL',
        description: 'Master GraphQL for API development',
        target_completion_date: '2024-12-01',
        progress: 0,
        status: 'active'
      };
      
      element.addLearningGoal(newGoal);
      await element.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(eventDetail.goal).to.deep.equal(newGoal);
      expect(element.data?.goals.length).to.equal(initialCount + 1);
    });

    it('should hide goals when configured', async () => {
      element.config = { ...element.config, showGoals: false };
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.goals-list')).to.not.exist;
    });

    it('should show empty state for goals', async () => {
      element.data = { ...mockData, goals: [] };
      await element.updateComplete;
      
      const emptyState = element.shadowRoot?.querySelector('.goals-list')?.parentElement?.querySelector('.empty-state');
      expect(emptyState).to.exist;
      expect(emptyState?.textContent).to.include('No learning goals set');
    });
  });

  describe('Event Handling', () => {
    beforeEach(async () => {
      element.data = mockData;
      element.config = { ...element.config, enableGoalSetting: true };
      await element.updateComplete;
    });

    it('should dispatch add-learning-path event', async () => {
      let eventFired = false;
      element.addEventListener('add-learning-path', () => {
        eventFired = true;
      });
      
      const addButton = element.shadowRoot?.querySelector('cre8-button[text="Add Path"]') as HTMLElement;
      addButton.click();
      
      expect(eventFired).to.be.true;
    });

    it('should dispatch add-learning-goal event', async () => {
      let eventFired = false;
      element.addEventListener('add-learning-goal', () => {
        eventFired = true;
      });
      
      const addButton = element.shadowRoot?.querySelector('cre8-button[text="Add Goal"]') as HTMLElement;
      addButton.click();
      
      expect(eventFired).to.be.true;
    });

    it('should dispatch retry-load event', async () => {
      element.errorMessage = 'Connection failed';
      await element.updateComplete;
      
      let eventFired = false;
      element.addEventListener('retry-load', () => {
        eventFired = true;
      });
      
      const retryButton = element.shadowRoot?.querySelector('cre8-button[text="Retry"]') as HTMLElement;
      retryButton.click();
      
      expect(eventFired).to.be.true;
    });

    it('should handle keyboard navigation', async () => {
      const firstButton = element.shadowRoot?.querySelector('cre8-button') as HTMLElement;
      firstButton.focus();
      
      expect(document.activeElement).to.equal(firstButton);
      
      // Test tab navigation
      await sendKeys({ press: 'Tab' });
      // Should move to next focusable element
    });

    it('should bubble and compose events correctly', async () => {
      let parentEventFired = false;
      
      // Add listener to a parent element
      element.parentElement?.addEventListener('learning-progress-data-loaded', () => {
        parentEventFired = true;
      });
      
      element.data = { ...mockData };
      await element.updateComplete;
      
      expect(parentEventFired).to.be.true;
    });
  });

  describe('Error States and Edge Cases', () => {
    it('should handle null data gracefully', async () => {
      element.data = null;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.empty-state')).to.exist;
      expect(() => element.updateProgress('nonexistent', 50)).to.not.throw();
    });

    it('should handle undefined properties gracefully', async () => {
      const incompleteData = {
        learning_paths: [{
          id: 'test',
          title: 'Test Path',
          difficulty: 'beginner' as const,
          estimated_hours: 10,
          modules: ['Module 1']
          // Missing optional properties
        }],
        skills: [],
        goals: [],
        overall_progress: 0
      };
      
      element.data = incompleteData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.path-card')).to.exist;
    });

    it('should handle empty arrays', async () => {
      element.data = emptyData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.empty-state')).to.exist;
      expect(element.shadowRoot?.textContent).to.include('No learning paths available');
    });

    it('should handle invalid path ID in updateProgress', () => {
      element.data = mockData;
      
      expect(() => element.updateProgress('nonexistent_id', 50)).to.not.throw();
      
      // Original data should remain unchanged
      const originalPath = mockData.learning_paths[0];
      const currentPath = element.data?.learning_paths.find(p => p.id === originalPath.id);
      expect(currentPath?.progress).to.equal(originalPath.progress);
    });

    it('should handle malformed dates gracefully', async () => {
      const dataWithBadDates = {
        ...mockData,
        skills: [{
          ...mockData.skills[0],
          last_updated: 'invalid-date'
        }],
        goals: [{
          ...mockData.goals[0],
          target_completion_date: 'not-a-date'
        }]
      };
      
      element.data = dataWithBadDates;
      await element.updateComplete;
      
      // Should not crash and should render something
      expect(element.shadowRoot?.querySelector('.skill-card')).to.exist;
      expect(element.shadowRoot?.querySelector('.goal-card')).to.exist;
    });

    it('should handle very long text content', async () => {
      const longTextData = {
        ...mockData,
        learning_paths: [{
          ...mockData.learning_paths[0],
          title: 'A'.repeat(200),
          modules: ['B'.repeat(100), 'C'.repeat(100)]
        }],
        goals: [{
          ...mockData.goals[0],
          title: 'D'.repeat(150),
          description: 'E'.repeat(500)
        }]
      };
      
      element.data = longTextData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.path-title')).to.exist;
      expect(element.shadowRoot?.querySelector('.goal-title')).to.exist;
    });
  });

  describe('Loading States', () => {
    it('should show loading spinner with label', async () => {
      element.loading = true;
      await element.updateComplete;
      
      const spinner = element.shadowRoot?.querySelector('cre8-loading-spinner');
      expect(spinner).to.exist;
      expect(spinner?.getAttribute('size')).to.equal('large');
      expect(spinner?.getAttribute('label')).to.equal('Loading learning progress...');
    });

    it('should hide content when loading', async () => {
      element.data = mockData;
      element.loading = true;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.not.exist;
      expect(element.shadowRoot?.querySelector('.loading-state')).to.exist;
    });

    it('should transition from loading to content', async () => {
      element.loading = true;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.loading-state')).to.exist;
      
      element.loading = false;
      element.data = mockData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.loading-state')).to.not.exist;
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });

    it('should prioritize error over loading', async () => {
      element.loading = true;
      element.errorMessage = 'Failed to load';
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.error-state')).to.exist;
      expect(element.shadowRoot?.querySelector('.loading-state')).to.not.exist;
    });
  });

  describe('Configuration and Customization', () => {
    it('should handle all configuration combinations', async () => {
      const configs = [
        { showSkills: false, showGoals: false, showOverallProgress: false },
        { showSkills: true, showGoals: false, showOverallProgress: true },
        { showSkills: false, showGoals: true, showOverallProgress: false },
        { enableGoalSetting: false, maxPathsToShow: 1 }
      ];
      
      for (const config of configs) {
        element.config = { ...element.config, ...config };
        element.data = mockData;
        await element.updateComplete;
        
        // Should not crash with any configuration
        expect(element.shadowRoot).to.exist;
      }
    });

    it('should disable goal setting buttons when configured', async () => {
      element.data = mockData;
      element.config = { ...element.config, enableGoalSetting: false };
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('cre8-button[text="Add Path"]')).to.not.exist;
      expect(element.shadowRoot?.querySelector('cre8-button[text="Add Goal"]')).to.not.exist;
    });

    it('should handle zero maxPathsToShow', async () => {
      element.data = mockData;
      element.config = { ...element.config, maxPathsToShow: 0 };
      await element.updateComplete;
      
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      expect(pathCards?.length).to.equal(0);
    });
  });

  describe('Public API Methods', () => {
    it('should initialize data if null when adding path', () => {
      element.data = null;
      
      const newPath: LearningPath = {
        id: 'test_path',
        title: 'Test Path',
        difficulty: 'beginner',
        estimated_hours: 10,
        modules: ['Module 1'],
        progress: 0,
        completed_modules: [],
        status: 'not_started'
      };
      
      element.addLearningPath(newPath);
      
      expect(element.data).to.not.be.null;
      expect(element.data?.learning_paths).to.have.length(1);
      expect(element.data?.learning_paths[0]).to.deep.equal(newPath);
    });

    it('should initialize data if null when adding goal', () => {
      element.data = null;
      
      const newGoal: LearningGoal = {
        id: 'test_goal',
        title: 'Test Goal',
        description: 'Test description',
        target_completion_date: '2024-12-31',
        progress: 0,
        status: 'active'
      };
      
      element.addLearningGoal(newGoal);
      
      expect(element.data).to.not.be.null;
      expect(element.data?.goals).to.have.length(1);
      expect(element.data?.goals[0]).to.deep.equal(newGoal);
    });

    it('should handle missing arrays when adding items', () => {
      element.data = { learning_paths: [], skills: [], goals: [], overall_progress: 0 };
      delete (element.data as any).learning_paths;
      delete (element.data as any).goals;
      
      const newPath: LearningPath = {
        id: 'test_path',
        title: 'Test Path',
        difficulty: 'beginner',
        estimated_hours: 10,
        modules: ['Module 1'],
        progress: 0,
        completed_modules: [],
        status: 'not_started'
      };
      
      const newGoal: LearningGoal = {
        id: 'test_goal',
        title: 'Test Goal',
        description: 'Test description',
        target_completion_date: '2024-12-31',
        progress: 0,
        status: 'active'
      };
      
      element.addLearningPath(newPath);
      element.addLearningGoal(newGoal);
      
      expect(element.data.learning_paths).to.have.length(1);
      expect(element.data.goals).to.have.length(1);
    });
  });

  describe('Memory Management', () => {
    it('should not leak event listeners', async () => {
      const originalCount = element.shadowRoot?.querySelectorAll('*').length || 0;
      
      // Add and remove data multiple times
      for (let i = 0; i < 5; i++) {
        element.data = mockData;
        await element.updateComplete;
        element.data = null;
        await element.updateComplete;
      }
      
      // Should not accumulate DOM nodes
      const finalCount = element.shadowRoot?.querySelectorAll('*').length || 0;
      expect(finalCount).to.be.closeTo(originalCount, 5);
    });

    it('should handle rapid data updates', async () => {
      // Simulate rapid data updates
      const promises = [];
      for (let i = 0; i < 10; i++) {
        element.data = { ...mockData, overall_progress: i * 10 };
        promises.push(element.updateComplete);
      }
      
      await Promise.all(promises);
      
      // Should end up with final state
      expect(element.data?.overall_progress).to.equal(90);
    });
  });

  describe('Performance Considerations', () => {
    it('should handle large datasets efficiently', async () => {
      const largeData: LearningProgressData = {
        learning_paths: Array.from({ length: 100 }, (_, i) => ({
          id: `path_${i}`,
          title: `Learning Path ${i}`,
          difficulty: ['beginner', 'intermediate', 'advanced'][i % 3] as any,
          estimated_hours: 20 + (i % 40),
          modules: Array.from({ length: 10 }, (_, j) => `Module ${j + 1}`),
          progress: Math.floor(Math.random() * 100),
          completed_modules: [],
          status: 'in_progress' as const
        })),
        skills: Array.from({ length: 50 }, (_, i) => ({
          id: `skill_${i}`,
          name: `Skill ${i}`,
          category: 'Category',
          level: ['novice', 'intermediate', 'advanced', 'expert'][i % 4] as any,
          progress: Math.floor(Math.random() * 100),
          last_updated: '2024-08-01'
        })),
        goals: Array.from({ length: 25 }, (_, i) => ({
          id: `goal_${i}`,
          title: `Goal ${i}`,
          description: `Description for goal ${i}`,
          target_completion_date: '2024-12-31',
          progress: Math.floor(Math.random() * 100),
          status: 'active' as const
        })),
        overall_progress: 65
      };
      
      const startTime = performance.now();
      element.data = largeData;
      await element.updateComplete;
      const endTime = performance.now();
      
      // Should render within reasonable time (< 1 second)
      expect(endTime - startTime).to.be.lessThan(1000);
      
      // Should respect maxPathsToShow even with large dataset
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      expect(pathCards?.length).to.equal(6); // Default maxPathsToShow
    });

    it('should debounce rapid updates', async () => {
      let updateCount = 0;
      const originalRequestUpdate = element.requestUpdate;
      element.requestUpdate = () => {
        updateCount++;
        return originalRequestUpdate.call(element);
      };
      
      // Trigger multiple rapid updates
      for (let i = 0; i < 10; i++) {
        element.data = { ...mockData, overall_progress: i };
      }
      
      await element.updateComplete;
      
      // Should not call requestUpdate for every change
      expect(updateCount).to.be.lessThan(10);
      
      // Restore original method
      element.requestUpdate = originalRequestUpdate;
    });
  });
});