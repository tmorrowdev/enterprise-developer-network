class DeveloperDashboard {
  constructor() {
    this.updateInterval = 30000;
    this.developers = ['dev_001', 'dev_002', 'dev_003', 'dev_004'];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateMetrics();
    this.loadDeveloperProfiles();
    setInterval(() => this.updateMetrics(), this.updateInterval);
  }

  setupEventListeners() {
    document.getElementById('refresh-btn').addEventListener('click', () => {
      this.updateMetrics();
      this.loadDeveloperProfiles();
    });
  }

  async updateMetrics() {
    try {
      const metrics = await this.fetchMetrics();
      this.updateUI(metrics);
    } catch (error) {
      console.error('Failed to update metrics:', error);
    }
  }

  async fetchMetrics() {
    const response = await fetch('/api/metrics/dev_001');
    const data = await response.json();
    return {
      productivity: data.productivity || 92,
      learning: data.learning || '3/5',
      design: data.design || 94,
      collaboration: data.collaboration || 18,
      struggles: data.struggles || [],
      recommendations: data.recommendations || []
    };
  }

  updateUI(metrics) {
    document.getElementById('productivity').textContent = `${metrics.productivity}%`;
    document.getElementById('learning').textContent = metrics.learning;
    document.getElementById('design').textContent = `${metrics.design}%`;
    document.getElementById('collaboration').textContent = metrics.collaboration;
    
    // Update progress bars
    const progressBars = document.querySelectorAll('cre8-progress');
    progressBars[0].value = metrics.productivity;
    progressBars[1].value = parseInt(metrics.learning.split('/')[0]) * 20;
    progressBars[2].value = metrics.design;
  }

  async loadDeveloperProfiles() {
    const profilesContainer = document.getElementById('developer-profiles');
    profilesContainer.innerHTML = '';

    for (const devId of this.developers) {
      try {
        const response = await fetch(`/api/metrics/${devId}`);
        const data = await response.json();
        const card = this.createDeveloperCard(devId, data);
        profilesContainer.appendChild(card);
      } catch (error) {
        console.error(`Failed to load profile for ${devId}:`, error);
      }
    }
  }

  createDeveloperCard(devId, data) {
    const card = document.createElement('cre8-card');
    card.className = 'developer-card';
    card.style.cssText = 'background: #262626; border: 1px solid #404040;';
    
    const statusVariant = data.productivity > 80 ? 'primary' : data.productivity > 60 ? 'secondary' : 'bare';
    const statusIcon = data.productivity > 80 ? '🚀' : data.productivity > 60 ? '⚠️' : '🔄';
    const teamEmoji = {
      'Platform UI': '🎨',
      'Customer Experience': '👥', 
      'Data Infrastructure': '🗄️',
      'Platform Infrastructure': '⚙️'
    };
    
    card.innerHTML = `
      <div slot="header" style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="color: #f5f5f5;">${data.name || devId}</strong>
          <br>
          <small style="color: #a3a3a3;">${data.role || 'Developer'}</small>
          <br>
          <small style="color: #737373;">${teamEmoji[data.team] || '👨‍💻'} ${data.team || 'Engineering'}</small>
        </div>
        <div style="text-align: right;">
          <cre8-badge variant="${statusVariant}">${statusIcon} ${data.productivity}%</cre8-badge>
        </div>
      </div>
      
      <div style="margin: 16px 0;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div style="text-align: center; padding: 12px; background: #404040; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">${data.commits_per_week || 0}</div>
            <div style="font-size: 0.75rem; color: #a3a3a3;">Commits/Week</div>
          </div>
          <div style="text-align: center; padding: 12px; background: #404040; border-radius: 8px;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #10b981;">${data.collaboration}%</div>
            <div style="font-size: 0.75rem; color: #a3a3a3;">Code Reviews</div>
          </div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span style="font-size: 0.875rem;">Learning Progress</span>
            <span style="font-size: 0.875rem; color: #60a5fa;">${data.learning}</span>
          </div>
          <cre8-progress value="${parseInt(data.learning.split('/')[0]) * 20}" style="height: 6px;"></cre8-progress>
        </div>
        
        ${data.mentoring_hours > 0 ? `
          <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 8px;">
            <span>👨‍🏫 Mentoring:</span>
            <span style="color: #f59e0b;">${data.mentoring_hours}h/week</span>
          </div>
        ` : ''}
      </div>
      
      ${data.skill_levels ? `
        <div style="margin-bottom: 16px;">
          <strong style="color: #d4d4d8; font-size: 0.875rem;">🛠️ Top Skills:</strong>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px;">
            ${Object.entries(data.skill_levels).slice(0, 3).map(([skill, level]) => 
              `<cre8-badge variant="bare" style="font-size: 0.75rem;">${skill} ${level}/10</cre8-badge>`
            ).join('')}
          </div>
        </div>
      ` : ''}
      
      ${data.struggles && data.struggles.length > 0 ? `
        <div class="recommendations" style="margin-bottom: 16px;">
          <strong style="color: #f59e0b; font-size: 0.875rem;">⚠️ Current Struggles:</strong>
          ${data.struggles.slice(0, 2).map(struggle => 
            `<div class="recommendation-item" style="font-size: 0.8rem; margin: 4px 0;">• ${struggle}</div>`
          ).join('')}
        </div>
      ` : ''}
      
      ${data.recommendations && data.recommendations.length > 0 ? `
        <div class="recommendations">
          <strong style="color: #10b981; font-size: 0.875rem;">💡 Recommendations:</strong>
          ${data.recommendations.slice(0, 2).map(rec => 
            `<div class="recommendation-item" style="font-size: 0.8rem; margin: 4px 0;">• ${rec}</div>`
          ).join('')}
        </div>
      ` : ''}
      
      <div slot="footer" style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #737373;">
        <span>Joined: ${data.hire_date ? new Date(data.hire_date).toLocaleDateString() : 'N/A'}</span>
        <cre8-badge variant="${statusVariant}">${data.status || 'active'}</cre8-badge>
      </div>
    `;
    
    return card;
  }
}

new DeveloperDashboard();