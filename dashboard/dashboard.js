class DeveloperDashboard {
  constructor() {
    this.updateInterval = 30000; // 30 seconds
    this.init();
  }

  init() {
    this.updateMetrics();
    setInterval(() => this.updateMetrics(), this.updateInterval);
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
  }
}

new DeveloperDashboard();