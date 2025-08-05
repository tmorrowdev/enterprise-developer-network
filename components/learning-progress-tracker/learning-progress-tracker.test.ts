import { fixture, expect, html } from '@open-wc/testing';
import { LearningProgressTracker, type LearningProgressData } from './learning-progress-tracker.js';

describe('LearningProgressTracker', () => {
  let element: LearningProgressTracker;
  
  const mockData: LearningProgressData = {
    learning_paths: [
      {
        id: 'react_fundamentals',
        title: 'React Fundamentals',
        difficulty: 'beginner',
        estimated_hours: 20,
        modules: ['Components and JSX', 'Props and State', 'Event Handling'],
        progress: 75,
        completed_modules: ['Components and JSX', 'Props and State'],
        status: 'in_progress'
      },
      {
        id: 'typescript_advanced',
        title: 'Advanced TypeScript',
        difficulty: 'advanced',
        estimated_hours: 40,
        modules: ['Generics', 'Decorators', 'Advanced Types'],
        progress: 30,
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
      }
    ],
    overall_progress: 65
  };

  beforeEach(async () => {
    element = await fixture<LearningProgressTracker>(
      html`<learning-progress-tracker></learning-progress-tracker>`
    );
  });

  it('should render without data', async () => {
    expect(element).to.exist;
    expect(element.shadowRoot?.querySelector('.empty-state')).to.exist;
  });

  it('should render with data', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    expect(element.shadowRoot?.querySelector('.learning-paths-grid')).to.exist;
    expect(element.shadowRoot?.querySelector('.skills-grid')).to.exist;
    expect(element.shadowRoot?.querySelector('.goals-list')).to.exist;
  });

  it('should show loading state', async () => {
    element.loading = true;
    await element.updateComplete;
    
    expect(element.shadowRoot?.querySelector('.loading-state')).to.exist;
    expect(element.shadowRoot?.querySelector('cre8-loading-spinner')).to.exist;
  });

  it('should show error state', async () => {
    element.errorMessage = 'Failed to load data';
    await element.updateComplete;
    
    expect(element.shadowRoot?.querySelector('.error-state')).to.exist;
    expect(element.shadowRoot?.textContent).to.include('Failed to load data');
  });

  it('should calculate overall progress correctly', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    // Overall progress should be average of path progress: (75 + 30) / 2 = 52.5 -> 53
    const progressText = element.shadowRoot?.querySelector('.progress-text')?.textContent;
    expect(progressText).to.include('53% Overall Progress');
  });

  it('should render learning paths with correct difficulty badges', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    const beginnerBadge = element.shadowRoot?.querySelector('.difficulty-beginner');
    const advancedBadge = element.shadowRoot?.querySelector('.difficulty-advanced');
    
    expect(beginnerBadge).to.exist;
    expect(advancedBadge).to.exist;
    expect(beginnerBadge?.textContent).to.equal('beginner');
    expect(advancedBadge?.textContent).to.equal('advanced');
  });

  it('should render skills with correct level badges', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    const advancedLevel = element.shadowRoot?.querySelector('.level-advanced');
    const intermediateLevel = element.shadowRoot?.querySelector('.level-intermediate');
    
    expect(advancedLevel?.textContent).to.equal('advanced');
    expect(intermediateLevel?.textContent).to.equal('intermediate');
  });

  it('should toggle path expansion', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    const toggleButton = element.shadowRoot?.querySelector('cre8-button[text="View Modules"]') as HTMLElement;
    expect(toggleButton).to.exist;
    
    // Should not show modules initially
    expect(element.shadowRoot?.querySelector('.modules-list')).to.not.exist;
    
    // Click to expand
    toggleButton.click();
    await element.updateComplete;
    
    // Should show modules after expansion
    expect(element.shadowRoot?.querySelector('.modules-list')).to.exist;
    
    // Button text should change
    const hideButton = element.shadowRoot?.querySelector('cre8-button[text="Show Less"]');
    expect(hideButton).to.exist;
  });

  it('should dispatch events correctly', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    let eventFired = false;
    element.addEventListener('learning-progress-data-loaded', () => {
      eventFired = true;
    });
    
    // Trigger data loaded event
    element.data = { ...mockData };
    await element.updateComplete;
    
    expect(eventFired).to.be.true;
  });

  it('should handle add path button click', async () => {
    element.data = mockData;
    element.config = { ...element.config, enableGoalSetting: true };
    await element.updateComplete;
    
    let eventFired = false;
    element.addEventListener('add-learning-path', () => {
      eventFired = true;
    });
    
    const addButton = element.shadowRoot?.querySelector('cre8-button[text="Add Path"]') as HTMLElement;
    expect(addButton).to.exist;
    
    addButton.click();
    expect(eventFired).to.be.true;
  });

  it('should handle add goal button click', async () => {
    element.data = mockData;
    element.config = { ...element.config, enableGoalSetting: true };
    await element.updateComplete;
    
    let eventFired = false;
    element.addEventListener('add-learning-goal', () => {
      eventFired = true;
    });
    
    const addButton = element.shadowRoot?.querySelector('cre8-button[text="Add Goal"]') as HTMLElement;
    expect(addButton).to.exist;
    
    addButton.click();
    expect(eventFired).to.be.true;
  });

  it('should update progress programmatically', async () => {
    element.data = mockData;
    await element.updateComplete;
    
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
    
    // Check that the data was actually updated
    const updatedPath = element.data?.learning_paths.find(p => p.id === 'react_fundamentals');
    expect(updatedPath?.progress).to.equal(90);
  });

  it('should add learning path programmatically', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    const initialPathCount = element.data.learning_paths.length;
    
    let eventFired = false;
    element.addEventListener('learning-path-added', () => {
      eventFired = true;
    });
    
    const newPath = {
      id: 'new_path',
      title: 'New Learning Path',
      difficulty: 'intermediate' as const,
      estimated_hours: 30,
      modules: ['Module 1', 'Module 2'],
      progress: 0,
      completed_modules: [],
      status: 'not_started' as const
    };
    
    element.addLearningPath(newPath);
    await element.updateComplete;
    
    expect(eventFired).to.be.true;
    expect(element.data?.learning_paths.length).to.equal(initialPathCount + 1);
    expect(element.data?.learning_paths[initialPathCount].id).to.equal('new_path');
  });

  it('should add learning goal programmatically', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    const initialGoalCount = element.data.goals.length;
    
    let eventFired = false;
    element.addEventListener('learning-goal-added', () => {
      eventFired = true;
    });
    
    const newGoal = {
      id: 'new_goal',
      title: 'New Learning Goal',
      description: 'A new goal to achieve',
      target_completion_date: '2024-12-31',
      progress: 0,
      status: 'active' as const
    };
    
    element.addLearningGoal(newGoal);
    await element.updateComplete;
    
    expect(eventFired).to.be.true;
    expect(element.data?.goals.length).to.equal(initialGoalCount + 1);
    expect(element.data?.goals[initialGoalCount].id).to.equal('new_goal');
  });

  it('should respect configuration options', async () => {
    element.data = mockData;
    element.config = {
      showSkills: false,
      showGoals: false,
      showOverallProgress: true,
      maxPathsToShow: 1,
      enableGoalSetting: false
    };
    await element.updateComplete;
    
    // Should show overall progress
    expect(element.shadowRoot?.querySelector('.overall-progress')).to.exist;
    
    // Should not show skills section
    expect(element.shadowRoot?.querySelector('.skills-grid')).to.not.exist;
    
    // Should not show goals section
    expect(element.shadowRoot?.querySelector('.goals-list')).to.not.exist;
    
    // Should only show 1 learning path
    const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
    expect(pathCards?.length).to.equal(1);
    
    // Should not show add buttons
    expect(element.shadowRoot?.querySelector('cre8-button[text="Add Path"]')).to.not.exist;
    expect(element.shadowRoot?.querySelector('cre8-button[text="Add Goal"]')).to.not.exist;
  });

  it('should handle retry on error', async () => {
    element.errorMessage = 'Network error';
    await element.updateComplete;
    
    let eventFired = false;
    element.addEventListener('retry-load', () => {
      eventFired = true;
    });
    
    const retryButton = element.shadowRoot?.querySelector('cre8-button[text="Retry"]') as HTMLElement;
    expect(retryButton).to.exist;
    
    retryButton.click();
    expect(eventFired).to.be.true;
  });

  it('should be responsive', async () => {
    element.data = mockData;
    await element.updateComplete;
    
    // Check that CSS custom properties are used for responsive design
    const computedStyle = getComputedStyle(element);
    expect(computedStyle.display).to.equal('block');
    
    // The responsiveness is mainly handled through CSS media queries
    // which are difficult to test in unit tests, but we can verify
    // that the responsive classes exist
    expect(element.shadowRoot?.querySelector('.learning-paths-grid')).to.exist;
    expect(element.shadowRoot?.querySelector('.skills-grid')).to.exist;
  });
});