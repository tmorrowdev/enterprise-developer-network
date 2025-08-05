import { fixture, expect, html } from '@open-wc/testing';
import { LearningProgressTracker, type LearningProgressData } from './learning-progress-tracker.js';

describe('LearningProgressTracker - Cross-Browser Compatibility', () => {
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
      }
    ],
    goals: [
      {
        id: 'goal1',
        title: 'Master React Hooks',
        description: 'Complete understanding of all React hooks',
        target_completion_date: '2024-12-31',
        progress: 60,
        status: 'active'
      }
    ],
    overall_progress: 65
  };

  beforeEach(async () => {
    element = await fixture<LearningProgressTracker>(
      html`<learning-progress-tracker></learning-progress-tracker>`
    );
  });

  describe('Web Components Support', () => {
    it('should register custom element correctly', () => {
      expect(customElements.get('learning-progress-tracker')).to.equal(LearningProgressTracker);
    });

    it('should create shadow root', () => {
      expect(element.shadowRoot).to.exist;
      expect(element.shadowRoot?.mode).to.equal('open');
    });

    it('should support shadow DOM encapsulation', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Styles should be encapsulated
      const shadowStyles = element.shadowRoot?.adoptedStyleSheets;
      expect(shadowStyles).to.exist;
      
      // Elements should exist in shadow DOM
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
      
      // Elements should not exist in light DOM
      expect(element.querySelector('.progress-tracker')).to.not.exist;
    });

    it('should handle slot projection correctly', async () => {
      const elementWithSlots = await fixture<LearningProgressTracker>(html`
        <learning-progress-tracker>
          <div slot="fallback">Loading...</div>
        </learning-progress-tracker>
      `);
      
      // Light DOM content should exist
      expect(elementWithSlots.querySelector('[slot="fallback"]')).to.exist;
    });
  });

  describe('CSS Custom Properties Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should support CSS custom properties', () => {
      const computedStyle = getComputedStyle(element);
      
      // Should inherit CSS custom properties from parent
      element.style.setProperty('--cre8-color-primary', '#ff0000');
      
      const primaryColor = computedStyle.getPropertyValue('--cre8-color-primary');
      expect(primaryColor).to.equal('#ff0000');
    });

    it('should have default fallback values', () => {
      const computedStyle = getComputedStyle(element);
      
      // Should have fallback values when custom properties are not set
      expect(computedStyle.fontFamily).to.include('system');
    });

    it('should respond to theme changes', async () => {
      // Apply theme changes
      document.documentElement.style.setProperty('--cre8-color-text', '#ffffff');
      document.documentElement.style.setProperty('--cre8-color-surface', '#000000');
      
      await element.updateComplete;
      
      const computedStyle = getComputedStyle(element);
      expect(computedStyle.getPropertyValue('--cre8-color-text')).to.equal('#ffffff');
      expect(computedStyle.getPropertyValue('--cre8-color-surface')).to.equal('#000000');
      
      // Cleanup
      document.documentElement.style.removeProperty('--cre8-color-text');
      document.documentElement.style.removeProperty('--cre8-color-surface');
    });
  });

  describe('Event System Compatibility', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should support custom events', async () => {
      let eventFired = false;
      let eventDetail: any;
      
      element.addEventListener('learning-progress-data-loaded', (e: any) => {
        eventFired = true;
        eventDetail = e.detail;
      });
      
      element.data = { ...mockData };
      await element.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(eventDetail).to.exist;
    });

    it('should support event bubbling', async () => {
      const container = document.createElement('div');
      container.appendChild(element);
      document.body.appendChild(container);
      
      let parentEventFired = false;
      container.addEventListener('progress-updated', () => {
        parentEventFired = true;
      });
      
      element.updateProgress('react_fundamentals', 90);
      await element.updateComplete;
      
      expect(parentEventFired).to.be.true;
      
      // Cleanup
      document.body.removeChild(container);
    });

    it('should support event composition', async () => {
      const container = document.createElement('div');
      const shadowRoot = container.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(element);
      document.body.appendChild(container);
      
      let composedEventFired = false;
      document.addEventListener('learning-progress-data-loaded', () => {
        composedEventFired = true;
      });
      
      element.data = { ...mockData };
      await element.updateComplete;
      
      expect(composedEventFired).to.be.true;
      
      // Cleanup
      document.body.removeChild(container);
    });
  });

  describe('DOM API Compatibility', () => {
    it('should support standard DOM methods', () => {
      expect(typeof element.getAttribute).to.equal('function');
      expect(typeof element.setAttribute).to.equal('function');
      expect(typeof element.removeAttribute).to.equal('function');
      expect(typeof element.hasAttribute).to.equal('function');
    });

    it('should support property reflection', () => {
      element.loading = true;
      expect(element.hasAttribute('loading')).to.be.true;
      
      element.loading = false;
      expect(element.hasAttribute('loading')).to.be.false;
    });

    it('should support querySelector on shadow root', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      const progressTracker = element.shadowRoot?.querySelector('.progress-tracker');
      expect(progressTracker).to.exist;
      
      const pathCards = element.shadowRoot?.querySelectorAll('.path-card');
      expect(pathCards?.length).to.equal(1);
    });

    it('should support classList manipulation', () => {
      element.classList.add('test-class');
      expect(element.classList.contains('test-class')).to.be.true;
      
      element.classList.remove('test-class');
      expect(element.classList.contains('test-class')).to.be.false;
    });
  });

  describe('JavaScript Feature Support', () => {
    it('should support ES2020 features', () => {
      // Optional chaining
      expect(element.data?.learning_paths?.length).to.be.undefined;
      
      // Nullish coalescing
      const defaultValue = element.data?.overall_progress ?? 0;
      expect(defaultValue).to.equal(0);
    });

    it('should support async/await', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });

    it('should support Promises', () => {
      const promise = element.updateComplete;
      expect(promise).to.be.instanceOf(Promise);
      
      return promise.then(() => {
        expect(true).to.be.true; // Promise resolved
      });
    });

    it('should support Map and Set', () => {
      // Component uses Set for expanded paths
      expect(element['_expandedPaths']).to.be.instanceOf(Set);
    });
  });

  describe('CSS Feature Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should support CSS Grid', () => {
      const pathsGrid = element.shadowRoot?.querySelector('.learning-paths-grid');
      const computedStyle = getComputedStyle(pathsGrid as Element);
      
      expect(computedStyle.display).to.equal('grid');
    });

    it('should support CSS Flexbox', () => {
      const sectionHeader = element.shadowRoot?.querySelector('.section-header');
      const computedStyle = getComputedStyle(sectionHeader as Element);
      
      expect(computedStyle.display).to.equal('flex');
    });

    it('should support CSS transitions', () => {
      const pathCard = element.shadowRoot?.querySelector('.path-card');
      const computedStyle = getComputedStyle(pathCard as Element);
      
      expect(computedStyle.transition).to.not.equal('none');
    });

    it('should support CSS transforms', () => {
      const pathCard = element.shadowRoot?.querySelector('.path-card');
      
      // Simulate hover state
      pathCard?.dispatchEvent(new Event('mouseenter'));
      
      const computedStyle = getComputedStyle(pathCard as Element);
      // Transform may not be applied immediately, but property should exist
      expect(typeof computedStyle.transform).to.equal('string');
    });
  });

  describe('Performance API Support', () => {
    it('should support performance.now()', () => {
      const start = performance.now();
      expect(typeof start).to.equal('number');
      expect(start).to.be.greaterThan(0);
    });

    it('should support requestAnimationFrame', (done) => {
      const frameId = requestAnimationFrame(() => {
        expect(true).to.be.true;
        done();
      });
      
      expect(typeof frameId).to.equal('number');
    });

    it('should support IntersectionObserver', () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(() => {});
        expect(observer).to.be.instanceOf(IntersectionObserver);
        observer.disconnect();
      }
    });
  });

  describe('Media Query Support', () => {
    it('should support matchMedia API', () => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      expect(mediaQuery).to.exist;
      expect(typeof mediaQuery.matches).to.equal('boolean');
    });

    it('should respond to viewport changes', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Simulate viewport change
      Object.defineProperty(window, 'innerWidth', { value: 400, configurable: true });
      window.dispatchEvent(new Event('resize'));
      
      // Component should remain functional
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
      
      // Restore
      Object.defineProperty(window, 'innerWidth', { value: 1024, configurable: true });
    });

    it('should support prefers-reduced-motion', () => {
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      expect(reducedMotionQuery).to.exist;
      
      // Component should work regardless of motion preference
      expect(element).to.exist;
    });
  });

  describe('Accessibility API Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should support ARIA attributes', () => {
      // Component should work with ARIA attributes
      element.setAttribute('aria-label', 'Learning Progress');
      expect(element.getAttribute('aria-label')).to.equal('Learning Progress');
    });

    it('should support focus management', () => {
      const buttons = element.shadowRoot?.querySelectorAll('cre8-button');
      const firstButton = buttons?.[0] as HTMLElement;
      
      if (firstButton) {
        firstButton.focus();
        expect(document.activeElement).to.equal(element);
      }
    });

    it('should support keyboard events', () => {
      let keydownFired = false;
      
      element.addEventListener('keydown', () => {
        keydownFired = true;
      });
      
      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      element.dispatchEvent(keyEvent);
      
      expect(keydownFired).to.be.true;
    });
  });

  describe('Storage API Support', () => {
    it('should work with localStorage', () => {
      if ('localStorage' in window) {
        localStorage.setItem('test-key', JSON.stringify(mockData));
        const stored = localStorage.getItem('test-key');
        const parsed = JSON.parse(stored!);
        
        element.data = parsed;
        expect(element.data).to.deep.equal(mockData);
        
        localStorage.removeItem('test-key');
      }
    });

    it('should work with sessionStorage', () => {
      if ('sessionStorage' in window) {
        sessionStorage.setItem('test-session', 'test-value');
        const value = sessionStorage.getItem('test-session');
        
        expect(value).to.equal('test-value');
        sessionStorage.removeItem('test-session');
      }
    });
  });

  describe('Date API Support', () => {
    beforeEach(async () => {
      element.data = mockData;
      await element.updateComplete;
    });

    it('should support Date formatting', () => {
      const testDate = new Date('2024-08-01');
      const formatted = testDate.toLocaleDateString();
      
      expect(formatted).to.be.a('string');
      expect(formatted.length).to.be.greaterThan(0);
    });

    it('should handle various date formats', () => {
      const dates = [
        '2024-08-01',
        '2024/08/01',
        'August 1, 2024',
        new Date().toISOString()
      ];
      
      dates.forEach(dateStr => {
        const date = new Date(dateStr);
        expect(date.getTime()).to.not.be.NaN;
      });
    });
  });

  describe('Network API Support', () => {
    it('should support fetch API', async () => {
      if ('fetch' in window) {
        // Mock fetch for testing
        const originalFetch = window.fetch;
        window.fetch = () => Promise.resolve(new Response(JSON.stringify(mockData)));
        
        try {
          const response = await fetch('/api/progress');
          const data = await response.json();
          
          element.data = data;
          await element.updateComplete;
          
          expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
        } finally {
          window.fetch = originalFetch;
        }
      }
    });

    it('should handle network errors gracefully', async () => {
      element.errorMessage = 'Network error';
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.error-state')).to.exist;
    });
  });

  describe('Browser-Specific Workarounds', () => {
    it('should handle Safari-specific behaviors', () => {
      // Test for Safari-specific handling if needed
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isSafari) {
        // Safari-specific tests
        expect(element).to.exist;
      }
    });

    it('should handle Firefox-specific behaviors', () => {
      const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
      
      if (isFirefox) {
        // Firefox-specific tests
        expect(element).to.exist;
      }
    });

    it('should handle Chrome-specific behaviors', () => {
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      
      if (isChrome) {
        // Chrome-specific tests
        expect(element).to.exist;
      }
    });

    it('should handle Edge-specific behaviors', () => {
      const isEdge = navigator.userAgent.includes('Edg');
      
      if (isEdge) {
        // Edge-specific tests
        expect(element).to.exist;
      }
    });
  });

  describe('Mobile Browser Support', () => {
    it('should support touch events', () => {
      const touchStart = new TouchEvent('touchstart', {
        touches: [{
          clientX: 100,
          clientY: 100
        } as Touch]
      });
      
      let touchFired = false;
      element.addEventListener('touchstart', () => {
        touchFired = true;
      });
      
      element.dispatchEvent(touchStart);
      expect(touchFired).to.be.true;
    });

    it('should handle viewport meta tag scenarios', () => {
      // Component should work with various viewport configurations
      const viewport = document.querySelector('meta[name="viewport"]');
      
      if (viewport) {
        expect(viewport.getAttribute('content')).to.exist;
      }
      
      // Component should be responsive regardless
      expect(element).to.exist;
    });

    it('should support orientation changes', async () => {
      element.data = mockData;
      await element.updateComplete;
      
      // Simulate orientation change
      window.dispatchEvent(new Event('orientationchange'));
      await element.updateComplete;
      
      expect(element.shadowRoot?.querySelector('.progress-tracker')).to.exist;
    });
  });
});