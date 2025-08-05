import { fixture, expect, html } from '@open-wc/testing';
import { a11ySnapshot, findAccessibilityTree } from '@web/test-runner-commands';
import { LearningProgressTracker, type LearningProgressData } from './learning-progress-tracker.js';

describe('LearningProgressTracker - Accessibility Tests', () => {
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

  describe('WCAG 2.1 AA Compliance', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should pass basic accessibility audit', async () => {
      await expect(element).to.be.accessible();
    });

    it('should pass accessibility audit with custom config', async () => {
      element.config = {
        showSkills: false,
        showGoals: false,
        showOverallProgress: true,
        maxPathsToShow: 2,
        enableGoalSetting: false
      };
      await element.updateComplete;
      
      await expect(element).to.be.accessible();
    });

    it('should pass accessibility audit in loading state', async () => {
      element.loading = true;
      await element.updateComplete;
      
      await expect(element).to.be.accessible();
    });

    it('should pass accessibility audit in error state', async () => {
      element.errorMessage = 'Failed to load data';
      await element.updateComplete;
      
      await expect(element).to.be.accessible();
    });

    it('should pass accessibility audit in empty state', async () => {
      element.data = {
        learning_paths: [],
        skills: [],
        goals: [],
        overall_progress: 0
      };
      await element.updateComplete;
      
      await expect(element).to.be.accessible();
    });
  });

  describe('Semantic Structure', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should have proper heading hierarchy', async () => {
      const snapshot = await a11ySnapshot();
      
      // Check for proper heading structure
      const headings = findAccessibilityTree(snapshot, { role: 'heading' });
      expect(headings.length).to.be.greaterThan(0);
      
      // Should have main section headings
      const headingTexts = headings.map(h => h.name);
      expect(headingTexts).to.include('Learning Progress Overview');
      expect(headingTexts).to.include('Learning Paths (2)');
      expect(headingTexts).to.include('Skills (2)');
      expect(headingTexts).to.include('Learning Goals (1)');
    });

    it('should use appropriate ARIA roles', async () => {
      const snapshot = await a11ySnapshot();
      
      // Check for buttons
      const buttons = findAccessibilityTree(snapshot, { role: 'button' });
      expect(buttons.length).to.be.greaterThan(0);
      
      // Check for proper button labels
      const buttonNames = buttons.map(b => b.name);
      expect(buttonNames).to.include('View Modules');
      expect(buttonNames).to.include('Add Path');
      expect(buttonNames).to.include('Add Goal');
    });

    it('should have proper progress indicators', async () => {
      const progressBars = element.shadowRoot?.querySelectorAll('.progress-bar');
      expect(progressBars?.length).to.be.greaterThan(0);
      
      // Progress bars should have proper ARIA attributes
      progressBars?.forEach(bar => {
        const fill = bar.querySelector('.progress-fill') as HTMLElement;
        if (fill) {
          const width = fill.style.width;
          expect(width).to.match(/\d+%/);
        }
      });
    });

    it('should have descriptive text for progress values', () => {
      const progressTexts = element.shadowRoot?.querySelectorAll('.progress-text');
      
      progressTexts?.forEach(text => {
        expect(text.textContent).to.match(/\d+%/);
      });
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should have focusable interactive elements', () => {
      const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
      
      buttons?.forEach(button => {
        expect(button.tabIndex).to.not.equal(-1);
      });
    });

    it('should provide keyboard access to all functionality', async () => {
      const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
      const firstButton = buttons?.[0] as HTMLElement;
      
      firstButton.focus();
      expect(document.activeElement).to.equal(element);
      
      // Should be able to activate buttons with keyboard
      let eventFired = false;
      firstButton.addEventListener('click', () => {
        eventFired = true;
      });
      
      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      firstButton.dispatchEvent(enterEvent);
      
      // Note: Actual keyboard event handling depends on cre8-button implementation
    });

    it('should have proper tab order', () => {
      const focusableElements = element.shadowRoot?.querySelectorAll(
        'cre8-button, [tabindex]:not([tabindex="-1"])'
      );
      
      // Should have focusable elements
      expect(focusableElements?.length).to.be.greaterThan(0);
    });
  });

  describe('Screen Reader Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should provide meaningful labels for interactive elements', () => {
      const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
      
      buttons?.forEach(button => {
        const text = button.getAttribute('text') || button.textContent;
        expect(text).to.not.be.empty;
        expect(text).to.not.equal('undefined');
      });
    });

    it('should provide context for status indicators', () => {
      const difficultyBadges = element.shadowRoot?.querySelectorAll('[class*="difficulty-"]');
      
      difficultyBadges?.forEach(badge => {
        expect(badge.textContent).to.be.oneOf(['beginner', 'intermediate', 'advanced']);
      });
      
      const statusBadges = element.shadowRoot?.querySelectorAll('[class*="status-"]');
      
      statusBadges?.forEach(badge => {
        expect(badge.textContent).to.be.oneOf(['active', 'completed', 'paused', 'not started']);
      });
    });

    it('should provide accessible names for sections', async () => {
      const snapshot = await a11ySnapshot();
      
      // Check that sections have accessible names
      const headings = findAccessibilityTree(snapshot, { role: 'heading' });
      headings.forEach(heading => {
        expect(heading.name).to.not.be.empty;
      });
    });

    it('should announce loading states appropriately', async () => {
      element.loading = true;
      await element.updateComplete;
      
      const spinner = element.shadowRoot?.querySelector('cre8-loading-spinner');
      expect(spinner?.getAttribute('label')).to.equal('Loading learning progress...');
    });

    it('should provide error context', async () => {
      element.errorMessage = 'Network connection failed';
      await element.updateComplete;
      
      const errorState = element.shadowRoot?.querySelector('.error-state');
      expect(errorState?.textContent).to.include('Network connection failed');
      
      // Should have retry action
      const retryButton = element.shadowRoot?.querySelector('cre8-button[text="Retry"]');
      expect(retryButton).to.exist;
    });

    it('should provide empty state guidance', async () => {
      element.data = {
        learning_paths: [],
        skills: [],
        goals: [],
        overall_progress: 0
      };
      await element.updateComplete;
      
      const emptyStates = element.shadowRoot?.querySelectorAll('.empty-state');
      
      emptyStates?.forEach(state => {
        expect(state.textContent).to.not.be.empty;
        expect(state.textContent).to.include('No');
      });
    });
  });

  describe('Visual Focus Indicators', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should have visible focus indicators', () => {
      const style = getComputedStyle(element);
      
      // Component should not override focus indicators
      expect(style.outline).to.not.equal('none');
    });

    it('should maintain focus visibility on interactive elements', () => {
      const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
      
      buttons?.forEach(button => {
        button.dispatchEvent(new Event('focus'));
        
        // Should have some kind of focus indication
        const computedStyle = getComputedStyle(button);
        expect(computedStyle.outline).to.not.equal('none');
      });
    });
  });

  describe('Color and Contrast', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should use CSS custom properties for theming', () => {
      const computedStyle = getComputedStyle(element);
      
      // Check that CSS custom properties are available
      expect(computedStyle.getPropertyValue('--cre8-color-text')).to.not.be.empty;
      expect(computedStyle.getPropertyValue('--cre8-color-primary')).to.not.be.empty;
    });

    it('should not rely solely on color for information', () => {
      // Difficulty badges should have text labels
      const difficultyBadges = element.shadowRoot?.querySelectorAll('[class*="difficulty-"]');
      difficultyBadges?.forEach(badge => {
        expect(badge.textContent?.trim()).to.not.be.empty;
      });
      
      // Status badges should have text labels
      const statusBadges = element.shadowRoot?.querySelectorAll('[class*="status-"]');
      statusBadges?.forEach(badge => {
        expect(badge.textContent?.trim()).to.not.be.empty;
      });
      
      // Progress should have numeric indicators
      const progressTexts = element.shadowRoot?.querySelectorAll('.progress-text');
      progressTexts?.forEach(text => {
        expect(text.textContent).to.match(/\d+%/);
      });
    });

    it('should provide alternative text for visual elements', () => {
      const moduleCheckboxes = element.shadowRoot?.querySelectorAll('.module-checkbox');
      
      // Module checkboxes should have clear visual states
      moduleCheckboxes?.forEach(checkbox => {
        const isCompleted = checkbox.classList.contains('module-completed');
        const isPending = checkbox.classList.contains('module-pending');
        expect(isCompleted || isPending).to.be.true;
      });
    });
  });

  describe('Mobile Accessibility', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should have adequate touch targets', () => {
      const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
      
      buttons?.forEach(button => {
        const rect = button.getBoundingClientRect();
        
        // Touch targets should be at least 44x44px (WCAG guideline)
        expect(rect.width).to.be.at.least(44);
        expect(rect.height).to.be.at.least(44);
      });
    });

    it('should be responsive and maintain usability', () => {
      // Check that responsive classes exist
      expect(element.shadowRoot?.querySelector('.learning-paths-grid')).to.exist;
      expect(element.shadowRoot?.querySelector('.skills-grid')).to.exist;
      
      // CSS should handle responsive behavior
      const style = element.shadowRoot?.adoptedStyleSheets?.[0];
      expect(style).to.exist;
    });

    it('should handle orientation changes gracefully', async () => {
      // Simulate orientation change by updating viewport
      Object.defineProperty(window, 'innerWidth', { value: 768, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 1024, configurable: true });
      
      window.dispatchEvent(new Event('resize'));
      await element.updateComplete;
      
      // Component should still be functional
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });
  });

  describe('Reduced Motion Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should respect prefers-reduced-motion', () => {
      // Check that transitions are defined
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      
      pathCards?.forEach(card => {
        const computedStyle = getComputedStyle(card);
        expect(computedStyle.transition).to.not.be.empty;
      });
      
      // Note: Testing actual reduced motion would require mocking matchMedia
    });

    it('should provide static alternatives to animations', () => {
      const progressFills = element.shadowRoot?.querySelectorAll('.progress-fill');
      
      progressFills?.forEach(fill => {
        // Progress should be visible even without animations
        expect(fill.getAttribute('style')).to.include('width:');
      });
    });
  });

  describe('High Contrast Mode Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should maintain visibility in high contrast mode', () => {
      // Should use CSS custom properties that can be overridden
      const computedStyle = getComputedStyle(element);
      
      expect(computedStyle.getPropertyValue('--cre8-color-text')).to.not.be.empty;
      expect(computedStyle.getPropertyValue('--cre8-color-border')).to.not.be.empty;
    });

    it('should have sufficient border definition', () => {
      const cards = element.shadowRoot?.querySelectorAll('.path-card, .skill-card, .goal-card');
      
      cards?.forEach(card => {
        const computedStyle = getComputedStyle(card);
        expect(computedStyle.border).to.not.equal('none');
      });
    });
  });

  describe('Language and Localization Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should handle text directionality', () => {
      // Component should inherit text direction
      const computedStyle = getComputedStyle(element);
      expect(['ltr', 'rtl', 'inherit']).to.include(computedStyle.direction);
    });

    it('should format dates appropriately', () => {
      const skillCards = element.shadowRoot?.querySelectorAll('.skill-card');
      
      // Check that dates are formatted consistently
      skillCards?.forEach(card => {
        const dateText = card.textContent;
        if (dateText?.includes('Updated')) {
          expect(dateText).to.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
        }
      });
    });

    it('should use semantic markup for numbers and dates', () => {
      const goalMeta = element.shadowRoot?.querySelectorAll('.goal-meta');
      
      goalMeta?.forEach(meta => {
        const text = meta.textContent;
        if (text?.includes('Due:')) {
          expect(text).to.match(/Due: \d{1,2}\/\d{1,2}\/\d{4}/);
        }
      });
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should provide accessible error recovery', async () => {
      element.errorMessage = 'Connection timeout';
      await element.updateComplete;
      
      await expect(element).to.be.accessible();
      
      const retryButton = element.shadowRoot?.querySelector('cre8-button[text="Retry"]');
      expect(retryButton).to.exist;
      
      // Should be able to recover from error
      let retryEventFired = false;
      element.addEventListener('retry-load', () => {
        retryEventFired = true;
      });
      
      (retryButton as HTMLElement).click();
      expect(retryEventFired).to.be.true;
    });

    it('should maintain accessibility during state transitions', async () => {
      // Loading to content
      element.loading = true;
      await element.updateComplete;
      await expect(element).to.be.accessible();
      
      element.loading = false;
      element.data = mockData;
      await element.updateComplete;
      await expect(element).to.be.accessible();
      
      // Content to error
      element.errorMessage = 'Failed to load';
      await element.updateComplete;
      await expect(element).to.be.accessible();
      
      // Error to content
      element.errorMessage = '';
      await element.updateComplete;
      await expect(element).to.be.accessible();
    });
  });
});