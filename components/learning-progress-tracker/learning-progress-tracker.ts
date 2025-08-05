import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// TypeScript interfaces for the component data structures
export interface LearningPath {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours: number;
  modules: string[];
  progress?: number;
  completed_modules?: string[];
  status?: 'not_started' | 'in_progress' | 'completed';
}

export interface SkillLevel {
  id: string;
  name: string;
  category: string;
  level: 'novice' | 'intermediate' | 'advanced' | 'expert';
  progress: number;
  last_updated: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  target_completion_date: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  learning_path_id?: string;
}

export interface LearningProgressData {
  learning_paths: LearningPath[];
  skills: SkillLevel[];
  goals: LearningGoal[];
  overall_progress: number;
}

export interface LearningProgressTrackerConfig {
  showSkills?: boolean;
  showGoals?: boolean;
  showOverallProgress?: boolean;
  maxPathsToShow?: number;
  enableGoalSetting?: boolean;
}

/**
 * Developer Learning Progress Tracker Component
 * 
 * A comprehensive component for tracking developer learning progress,
 * displaying learning paths, skill levels, and goals with progress visualization.
 * Built using the @cre8-dev/cre8-wc design system.
 */
@customElement('learning-progress-tracker')
export class LearningProgressTracker extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--cre8-font-family-default, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      color: var(--cre8-color-text, #e5e5e5);
    }

    .progress-tracker {
      display: grid;
      gap: var(--cre8-spacing-lg, 24px);
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--cre8-spacing-md, 16px);
    }

    .section-title {
      font-size: var(--cre8-typography-title-large-font-size, 1.5rem);
      font-weight: var(--cre8-typography-title-large-font-weight, 600);
      color: var(--cre8-color-text, #e5e5e5);
      margin: 0;
    }

    .overall-progress {
      padding: var(--cre8-spacing-lg, 24px);
      background: var(--cre8-color-surface, #262626);
      border: 1px solid var(--cre8-color-border, #404040);
      border-radius: var(--cre8-border-radius-default, 8px);
    }

    .overall-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--cre8-spacing-md, 16px);
      margin-top: var(--cre8-spacing-md, 16px);
    }

    .stat-item {
      text-align: center;
      padding: var(--cre8-spacing-md, 16px);
      background: var(--cre8-color-surface-variant, #404040);
      border-radius: var(--cre8-border-radius-default, 8px);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--cre8-color-primary, #60a5fa);
      margin: 0;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--cre8-color-text-secondary, #a3a3a3);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .learning-paths-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--cre8-spacing-md, 16px);
    }

    .path-card {
      background: var(--cre8-color-surface, #262626);
      border: 1px solid var(--cre8-color-border, #404040);
      border-radius: var(--cre8-border-radius-default, 8px);
      padding: var(--cre8-spacing-lg, 24px);
      transition: all 0.2s ease;
    }

    .path-card:hover {
      border-color: var(--cre8-color-primary, #60a5fa);
      transform: translateY(-2px);
    }

    .path-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--cre8-spacing-md, 16px);
    }

    .path-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 var(--cre8-spacing-xs, 4px) 0;
      color: var(--cre8-color-text, #e5e5e5);
    }

    .difficulty-badge {
      padding: var(--cre8-spacing-xs, 4px) var(--cre8-spacing-sm, 8px);
      border-radius: var(--cre8-border-radius-default, 8px);
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .difficulty-beginner {
      background: var(--cre8-color-success, #10b981);
      color: white;
    }

    .difficulty-intermediate {
      background: var(--cre8-color-warning, #f59e0b);
      color: white;
    }

    .difficulty-advanced {
      background: var(--cre8-color-error, #ef4444);
      color: white;
    }

    .path-meta {
      color: var(--cre8-color-text-secondary, #a3a3a3);
      font-size: 0.875rem;
      margin-bottom: var(--cre8-spacing-md, 16px);
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: var(--cre8-color-surface-variant, #404040);
      border-radius: 4px;
      overflow: hidden;
      margin: var(--cre8-spacing-sm, 8px) 0;
    }

    .progress-fill {
      height: 100%;
      background: var(--cre8-color-primary, #60a5fa);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.875rem;
      color: var(--cre8-color-text-secondary, #a3a3a3);
      text-align: right;
    }

    .modules-list {
      margin-top: var(--cre8-spacing-md, 16px);
    }

    .module-item {
      display: flex;
      align-items: center;
      padding: var(--cre8-spacing-xs, 4px) 0;
      font-size: 0.875rem;
    }

    .module-checkbox {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      margin-right: var(--cre8-spacing-sm, 8px);
      flex-shrink: 0;
    }

    .module-completed {
      background: var(--cre8-color-success, #10b981);
      border: 1px solid var(--cre8-color-success, #10b981);
    }

    .module-pending {
      background: var(--cre8-color-surface-variant, #404040);
      border: 1px solid var(--cre8-color-border, #404040);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--cre8-spacing-md, 16px);
    }

    .skill-card {
      background: var(--cre8-color-surface, #262626);
      border: 1px solid var(--cre8-color-border, #404040);
      border-radius: var(--cre8-border-radius-default, 8px);
      padding: var(--cre8-spacing-md, 16px);
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--cre8-spacing-sm, 8px);
    }

    .skill-name {
      font-weight: 600;
      margin: 0;
    }

    .skill-level {
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .level-novice {
      background: var(--cre8-color-surface-variant, #404040);
      color: var(--cre8-color-text-secondary, #a3a3a3);
    }

    .level-intermediate {
      background: var(--cre8-color-info, #3b82f6);
      color: white;
    }

    .level-advanced {
      background: var(--cre8-color-warning, #f59e0b);
      color: white;
    }

    .level-expert {
      background: var(--cre8-color-success, #10b981);
      color: white;
    }

    .goals-list {
      display: grid;
      gap: var(--cre8-spacing-md, 16px);
    }

    .goal-card {
      background: var(--cre8-color-surface, #262626);
      border: 1px solid var(--cre8-color-border, #404040);
      border-radius: var(--cre8-border-radius-default, 8px);
      padding: var(--cre8-spacing-lg, 24px);
    }

    .goal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--cre8-spacing-sm, 8px);
    }

    .goal-title {
      font-weight: 600;
      margin: 0;
      flex: 1;
    }

    .goal-status {
      padding: var(--cre8-spacing-xs, 4px) var(--cre8-spacing-sm, 8px);
      border-radius: var(--cre8-border-radius-default, 8px);
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-left: var(--cre8-spacing-sm, 8px);
    }

    .status-active {
      background: var(--cre8-color-info, #3b82f6);
      color: white;
    }

    .status-completed {
      background: var(--cre8-color-success, #10b981);
      color: white;
    }

    .status-paused {
      background: var(--cre8-color-warning, #f59e0b);
      color: white;
    }

    .goal-description {
      color: var(--cre8-color-text-secondary, #a3a3a3);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: var(--cre8-spacing-sm, 8px) 0;
    }

    .goal-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: var(--cre8-spacing-md, 16px);
      font-size: 0.875rem;
      color: var(--cre8-color-text-secondary, #a3a3a3);
    }

    .empty-state {
      text-align: center;
      padding: var(--cre8-spacing-xl, 32px);
      color: var(--cre8-color-text-secondary, #a3a3a3);
    }

    .empty-state-icon {
      font-size: 3rem;
      margin-bottom: var(--cre8-spacing-md, 16px);
      opacity: 0.5;
    }

    .loading-state {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--cre8-spacing-xl, 32px);
    }

    .error-state {
      padding: var(--cre8-spacing-lg, 24px);
      background: var(--cre8-color-error, #ef4444);
      color: white;
      border-radius: var(--cre8-border-radius-default, 8px);
      text-align: center;
    }

    @media (max-width: 768px) {
      .learning-paths-grid,
      .skills-grid {
        grid-template-columns: 1fr;
      }

      .overall-stats {
        grid-template-columns: 1fr;
      }

      .path-header,
      .skill-header,
      .goal-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--cre8-spacing-xs, 4px);
      }
    }
  `;

  // Public properties
  @property({ type: Object })
  data: LearningProgressData | null = null;

  @property({ type: Object })
  config: LearningProgressTrackerConfig = {
    showSkills: true,
    showGoals: true,
    showOverallProgress: true,
    maxPathsToShow: 6,
    enableGoalSetting: true
  };

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  errorMessage = '';

  // Internal state
  @state()
  private _expandedPaths = new Set<string>();

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('data') && this.data) {
      this._dispatchDataLoaded();
    }
  }

  private _dispatchDataLoaded(): void {
    this.dispatchEvent(new CustomEvent('learning-progress-data-loaded', {
      detail: { data: this.data },
      bubbles: true,
      composed: true
    }));
  }

  private _togglePathExpansion(pathId: string): void {
    if (this._expandedPaths.has(pathId)) {
      this._expandedPaths.delete(pathId);
    } else {
      this._expandedPaths.add(pathId);
    }
    this.requestUpdate();
  }

  private _calculateOverallProgress(): number {
    if (!this.data?.learning_paths?.length) return 0;
    
    const totalProgress = this.data.learning_paths.reduce(
      (sum, path) => sum + (path.progress || 0), 
      0
    );
    return Math.round(totalProgress / this.data.learning_paths.length);
  }

  private _getCompletedPathsCount(): number {
    if (!this.data?.learning_paths) return 0;
    return this.data.learning_paths.filter(path => path.status === 'completed').length;
  }

  private _getActiveGoalsCount(): number {
    if (!this.data?.goals) return 0;
    return this.data.goals.filter(goal => goal.status === 'active').length;
  }

  private _getSkillsCount(): number {
    return this.data?.skills?.length || 0;
  }

  private _renderOverallProgress() {
    if (!this.config.showOverallProgress || !this.data) return null;

    const overallProgress = this._calculateOverallProgress();
    const completedPaths = this._getCompletedPathsCount();
    const activeGoals = this._getActiveGoalsCount();
    const skillsCount = this._getSkillsCount();

    return html`
      <cre8-card>
        <div slot="header">
          <div class="section-header">
            <h2 class="section-title">Learning Progress Overview</h2>
          </div>
        </div>
        <div slot="body">
          <div class="overall-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${overallProgress}%"></div>
            </div>
            <div class="progress-text">${overallProgress}% Overall Progress</div>
            
            <div class="overall-stats">
              <div class="stat-item">
                <div class="stat-value">${completedPaths}</div>
                <div class="stat-label">Completed Paths</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${activeGoals}</div>
                <div class="stat-label">Active Goals</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${skillsCount}</div>
                <div class="stat-label">Skills Tracked</div>
              </div>
            </div>
          </div>
        </div>
      </cre8-card>
    `;
  }

  private _renderLearningPaths() {
    if (!this.data?.learning_paths?.length) {
      return html`
        <cre8-card>
          <div slot="header">
            <div class="section-header">
              <h3 class="section-title">Learning Paths</h3>
            </div>
          </div>
          <div slot="body">
            <div class="empty-state">
              <div class="empty-state-icon">📚</div>
              <p>No learning paths available. Start your learning journey!</p>
              ${this.config.enableGoalSetting ? html`
                <cre8-button text="Add Learning Path" variant="primary" @click=${this._handleAddPath}></cre8-button>
              ` : ''}
            </div>
          </div>
        </cre8-card>
      `;
    }

    const pathsToShow = this.config.maxPathsToShow 
      ? this.data.learning_paths.slice(0, this.config.maxPathsToShow)
      : this.data.learning_paths;

    return html`
      <cre8-card>
        <div slot="header">
          <div class="section-header">
            <h3 class="section-title">Learning Paths (${this.data.learning_paths.length})</h3>
            ${this.config.enableGoalSetting ? html`
              <cre8-button text="Add Path" variant="secondary" size="sm" @click=${this._handleAddPath}></cre8-button>
            ` : ''}
          </div>
        </div>
        <div slot="body">
          <div class="learning-paths-grid">
            ${pathsToShow.map(path => this._renderLearningPath(path))}
          </div>
        </div>
      </cre8-card>
    `;
  }

  private _renderLearningPath(path: LearningPath) {
    const progress = path.progress || 0;
    const completedModules = path.completed_modules || [];
    const isExpanded = this._expandedPaths.has(path.id);

    return html`
      <div class="path-card">
        <div class="path-header">
          <div>
            <h4 class="path-title">${path.title}</h4>
            <div class="path-meta">
              ${path.estimated_hours}h • ${path.modules.length} modules
            </div>
          </div>
          <span class="difficulty-badge difficulty-${path.difficulty}">${path.difficulty}</span>
        </div>

        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <div class="progress-text">${progress}% complete</div>

        ${isExpanded ? html`
          <div class="modules-list">
            <h5>Modules:</h5>
            ${path.modules.map(module => html`
              <div class="module-item">
                <div class="module-checkbox ${completedModules.includes(module) ? 'module-completed' : 'module-pending'}"></div>
                <span>${module}</span>
              </div>
            `)}
          </div>
        ` : ''}

        <div style="margin-top: var(--cre8-spacing-md, 16px);">
          <cre8-button 
            text="${isExpanded ? 'Show Less' : 'View Modules'}" 
            variant="tertiary" 
            size="sm"
            @click=${() => this._togglePathExpansion(path.id)}
          ></cre8-button>
        </div>
      </div>
    `;
  }

  private _renderSkills() {
    if (!this.config.showSkills || !this.data?.skills?.length) {
      return this.config.showSkills ? html`
        <cre8-card>
          <div slot="header">
            <div class="section-header">
              <h3 class="section-title">Skills</h3>
            </div>
          </div>
          <div slot="body">
            <div class="empty-state">
              <div class="empty-state-icon">🎯</div>
              <p>No skills tracked yet. Add skills to monitor your progress.</p>
            </div>
          </div>
        </cre8-card>
      ` : null;
    }

    return html`
      <cre8-card>
        <div slot="header">
          <div class="section-header">
            <h3 class="section-title">Skills (${this.data.skills.length})</h3>
          </div>
        </div>
        <div slot="body">
          <div class="skills-grid">
            ${this.data.skills.map(skill => html`
              <div class="skill-card">
                <div class="skill-header">
                  <h4 class="skill-name">${skill.name}</h4>
                  <span class="skill-level level-${skill.level}">${skill.level}</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${skill.progress}%"></div>
                </div>
                <div class="progress-text">${skill.progress}% proficiency</div>
                <div style="margin-top: var(--cre8-spacing-xs, 4px); font-size: 0.75rem; color: var(--cre8-color-text-secondary, #a3a3a3);">
                  ${skill.category} • Updated ${new Date(skill.last_updated).toLocaleDateString()}
                </div>
              </div>
            `)}
          </div>
        </div>
      </cre8-card>
    `;
  }

  private _renderGoals() {
    if (!this.config.showGoals || !this.data?.goals?.length) {
      return this.config.showGoals ? html`
        <cre8-card>
          <div slot="header">
            <div class="section-header">
              <h3 class="section-title">Learning Goals</h3>
              ${this.config.enableGoalSetting ? html`
                <cre8-button text="Add Goal" variant="primary" size="sm" @click=${this._handleAddGoal}></cre8-button>
              ` : ''}
            </div>
          </div>
          <div slot="body">
            <div class="empty-state">
              <div class="empty-state-icon">🎯</div>
              <p>No learning goals set. Create goals to track your progress.</p>
              ${this.config.enableGoalSetting ? html`
                <cre8-button text="Set Your First Goal" variant="primary" @click=${this._handleAddGoal}></cre8-button>
              ` : ''}
            </div>
          </div>
        </cre8-card>
      ` : null;
    }

    return html`
      <cre8-card>
        <div slot="header">
          <div class="section-header">
            <h3 class="section-title">Learning Goals (${this.data.goals.length})</h3>
            ${this.config.enableGoalSetting ? html`
              <cre8-button text="Add Goal" variant="primary" size="sm" @click=${this._handleAddGoal}></cre8-button>
            ` : ''}
          </div>
        </div>
        <div slot="body">
          <div class="goals-list">
            ${this.data.goals.map(goal => html`
              <div class="goal-card">
                <div class="goal-header">
                  <h4 class="goal-title">${goal.title}</h4>
                  <span class="goal-status status-${goal.status}">${goal.status.replace('_', ' ')}</span>
                </div>
                <p class="goal-description">${goal.description}</p>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${goal.progress}%"></div>
                </div>
                <div class="goal-meta">
                  <span>${goal.progress}% complete</span>
                  <span>Due: ${new Date(goal.target_completion_date).toLocaleDateString()}</span>
                </div>
              </div>
            `)}
          </div>
        </div>
      </cre8-card>
    `;
  }

  private _handleAddPath(): void {
    this.dispatchEvent(new CustomEvent('add-learning-path', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleAddGoal(): void {
    this.dispatchEvent(new CustomEvent('add-learning-goal', {
      bubbles: true,
      composed: true
    }));
  }

  protected override render() {
    if (this.loading) {
      return html`
        <div class="loading-state">
          <cre8-loading-spinner size="large" label="Loading learning progress..."></cre8-loading-spinner>
        </div>
      `;
    }

    if (this.errorMessage) {
      return html`
        <div class="error-state">
          <h3>Error Loading Learning Progress</h3>
          <p>${this.errorMessage}</p>
          <cre8-button text="Retry" variant="secondary" @click=${() => this._handleRetry()}></cre8-button>
        </div>
      `;
    }

    return html`
      <div class="progress-tracker">
        ${this._renderOverallProgress()}
        ${this._renderLearningPaths()}
        ${this._renderSkills()}
        ${this._renderGoals()}
      </div>
    `;
  }

  private _handleRetry(): void {
    this.dispatchEvent(new CustomEvent('retry-load', {
      bubbles: true,
      composed: true
    }));
  }

  // Public methods for external control
  public updateProgress(pathId: string, progress: number): void {
    if (!this.data?.learning_paths) return;
    
    const path = this.data.learning_paths.find(p => p.id === pathId);
    if (path) {
      path.progress = Math.max(0, Math.min(100, progress));
      this.requestUpdate();
      
      this.dispatchEvent(new CustomEvent('progress-updated', {
        detail: { pathId, progress: path.progress },
        bubbles: true,
        composed: true
      }));
    }
  }

  public addLearningPath(path: LearningPath): void {
    if (!this.data) {
      this.data = { learning_paths: [], skills: [], goals: [], overall_progress: 0 };
    }
    if (!this.data.learning_paths) {
      this.data.learning_paths = [];
    }
    
    this.data.learning_paths.push(path);
    this.requestUpdate();
    
    this.dispatchEvent(new CustomEvent('learning-path-added', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
  }

  public addLearningGoal(goal: LearningGoal): void {
    if (!this.data) {
      this.data = { learning_paths: [], skills: [], goals: [], overall_progress: 0 };
    }
    if (!this.data.goals) {
      this.data.goals = [];
    }
    
    this.data.goals.push(goal);
    this.requestUpdate();
    
    this.dispatchEvent(new CustomEvent('learning-goal-added', {
      detail: { goal },
      bubbles: true,
      composed: true
    }));
  }
}

// Global declarations for TypeScript
declare global {
  interface HTMLElementTagNameMap {
    'learning-progress-tracker': LearningProgressTracker;
  }
}