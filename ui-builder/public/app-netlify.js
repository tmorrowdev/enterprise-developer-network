class UIBuilderApp {
    constructor() {
        this.currentCode = '';
        this.currentFramework = 'html';
        this.components = [];
        
        this.initializeElements();
        this.bindEvents();
        this.loadComponents();
    }

    initializeElements() {
        // Input elements
        this.promptInput = document.getElementById('prompt');
        this.frameworkSelect = document.getElementById('framework');
        this.generateBtn = document.getElementById('generateBtn');
        this.clearBtn = document.getElementById('clearBtn');
        
        // Output elements
        this.codeOutput = document.getElementById('codeOutput');
        this.copyBtn = document.getElementById('copyBtn');
        this.previewBtn = document.getElementById('previewBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        
        // Progress elements
        this.progressSection = document.getElementById('progress');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressText = document.querySelector('.progress-text');
        
        // Refinement elements
        this.refinementSection = document.getElementById('refinementSection');
        this.feedbackInput = document.getElementById('feedback');
        this.refineBtn = document.getElementById('refineBtn');
        
        // Modal elements
        this.previewModal = document.getElementById('previewModal');
        this.closePreview = document.getElementById('closePreview');
        this.previewFrame = document.getElementById('previewFrame');
        this.previewTabs = document.querySelectorAll('.preview-tab');
        
        // Component list
        this.componentList = document.getElementById('componentList');
    }

    bindEvents() {
        // Main actions
        this.generateBtn.addEventListener('click', () => this.generateUI());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.refineBtn.addEventListener('click', () => this.refineUI());
        
        // Output actions
        this.copyBtn.addEventListener('click', () => this.copyCode());
        this.previewBtn.addEventListener('click', () => this.showPreview());
        this.downloadBtn.addEventListener('click', () => this.downloadCode());
        
        // Framework selection
        this.frameworkSelect.addEventListener('change', (e) => {
            this.currentFramework = e.target.value;
        });
        
        // Modal controls
        this.closePreview.addEventListener('click', () => this.hidePreview());
        this.previewModal.addEventListener('click', (e) => {
            if (e.target === this.previewModal) {
                this.hidePreview();
            }
        });
        
        // Preview tabs
        this.previewTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchPreviewTab(e.target.dataset.tab);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.generateUI();
                        break;
                    case 'k':
                        e.preventDefault();
                        this.clearInput();
                        break;
                    case 'c':
                        if (this.currentCode) {
                            e.preventDefault();
                            this.copyCode();
                        }
                        break;
                }
            }
        });
    }

    async loadComponents() {
        try {
            const response = await fetch('/api/components');
            this.components = await response.json();
            this.renderComponentList();
        } catch (error) {
            console.error('Failed to load components:', error);
            this.componentList.innerHTML = '<div class="error">Failed to load components</div>';
        }
    }

    renderComponentList() {
        if (!this.components.length) {
            this.componentList.innerHTML = '<div class="empty">No components available</div>';
            return;
        }

        const componentTags = this.components
            .slice(0, 20) // Show first 20 components
            .map(comp => `
                <span class="component-tag" data-component="${comp.tagName}" title="${comp.description}">
                    ${comp.tagName}
                </span>
            `).join('');

        this.componentList.innerHTML = componentTags;

        // Add click handlers for component tags
        this.componentList.querySelectorAll('.component-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const componentName = e.target.dataset.component;
                this.insertComponent(componentName);
            });
        });
    }

    insertComponent(componentName) {
        const currentText = this.promptInput.value;
        const insertion = `\n\nUse the ${componentName} component.`;
        this.promptInput.value = currentText + insertion;
        this.promptInput.focus();
    }

    async generateUI() {
        const prompt = this.promptInput.value.trim();
        if (!prompt) {
            this.showError('Please describe the UI you want to create.');
            return;
        }

        this.setGenerating(true);
        this.showProgress();
        this.simulateProgress();
        
        try {
            const response = await fetch('/api/generate-ui', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    framework: this.currentFramework
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.handleUIGenerated(data);
        } catch (error) {
            console.error('Error generating UI:', error);
            this.handleError({ message: error.message });
        }
    }

    async refineUI() {
        const feedback = this.feedbackInput.value.trim();
        if (!feedback || !this.currentCode) {
            this.showError('Please provide feedback for refinement.');
            return;
        }

        this.setRefining(true);
        this.showProgress();
        this.simulateProgress();
        
        try {
            const response = await fetch('/api/refine-ui', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: this.currentCode,
                    feedback: feedback,
                    framework: this.currentFramework
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.handleUIRefined(data);
        } catch (error) {
            console.error('Error refining UI:', error);
            this.handleError({ message: error.message });
        }
    }

    simulateProgress() {
        const stages = [
            { stage: 'analyzing', message: 'Analyzing UI requirements...', progress: 20 },
            { stage: 'components', message: 'Fetching design system components...', progress: 40 },
            { stage: 'generating', message: 'Generating UI code...', progress: 70 },
            { stage: 'qa-validation', message: 'Validating template compliance...', progress: 85 },
            { stage: 'validating', message: 'Validating generated code...', progress: 95 }
        ];

        let currentStage = 0;
        const interval = setInterval(() => {
            if (currentStage < stages.length) {
                const stage = stages[currentStage];
                this.updateProgress(stage);
                currentStage++;
            } else {
                clearInterval(interval);
            }
        }, 1000);

        // Store interval ID to clear it if needed
        this.progressInterval = interval;
    }

    clearInput() {
        this.promptInput.value = '';
        this.feedbackInput.value = '';
        this.promptInput.focus();
    }

    copyCode() {
        if (!this.currentCode) return;
        
        navigator.clipboard.writeText(this.currentCode).then(() => {
            this.showSuccess('Code copied to clipboard!');
            
            // Visual feedback
            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyBtn.textContent = originalText;
            }, 2000);
        }).catch(() => {
            this.showError('Failed to copy code to clipboard.');
        });
    }

    showPreview() {
        if (!this.currentCode) return;
        
        const previewHTML = this.generatePreviewHTML(this.currentCode, this.currentFramework);
        const blob = new Blob([previewHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        this.previewFrame.src = url;
        this.previewModal.style.display = 'flex';
        
        // Clean up URL after modal is closed
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    hidePreview() {
        this.previewModal.style.display = 'none';
        this.previewFrame.src = 'about:blank';
    }

    switchPreviewTab(size) {
        this.previewTabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${size}"]`).classList.add('active');
        
        const frame = this.previewFrame;
        switch (size) {
            case 'mobile':
                frame.style.width = '375px';
                frame.style.height = '667px';
                break;
            case 'tablet':
                frame.style.width = '768px';
                frame.style.height = '1024px';
                break;
            default:
                frame.style.width = '100%';
                frame.style.height = '100%';
        }
    }

    downloadCode() {
        if (!this.currentCode) return;
        
        const extension = this.getFileExtension(this.currentFramework);
        const filename = `ui-component.${extension}`;
        
        const blob = new Blob([this.currentCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        this.showSuccess(`Code downloaded as ${filename}`);
    }

    // Event handlers
    updateProgress(data) {
        this.progressFill.style.width = `${data.progress}%`;
        this.progressText.textContent = data.message;
        
        if (data.stage === 'complete') {
            setTimeout(() => this.hideProgress(), 1000);
        }
    }

    handleUIGenerated(data) {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        this.currentCode = data.code;
        this.displayCode(data.code, data.validation);
        this.enableOutputActions();
        this.showRefinementSection();
        this.setGenerating(false);
        this.hideProgress();
        
        // Show validation feedback
        if (data.validation && !data.validation.isValid) {
            this.showWarning(`Template validation issues detected. ${data.validation.errors.length} errors corrected automatically.`);
        } else {
            this.showSuccess('UI generated successfully!');
        }
    }

    handleUIRefined(data) {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        this.currentCode = data.code;
        this.displayCode(data.code, data.validation);
        this.setRefining(false);
        this.feedbackInput.value = '';
        this.hideProgress();
        
        // Show validation feedback
        if (data.validation && !data.validation.isValid) {
            this.showWarning(`Template validation issues detected. ${data.validation.errors.length} errors corrected automatically.`);
        } else {
            this.showSuccess('UI refined successfully!');
        }
    }

    handleError(data) {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        this.showError(data.message);
        this.setGenerating(false);
        this.setRefining(false);
        this.hideProgress();
    }

    // UI state management
    setGenerating(isGenerating) {
        this.generateBtn.disabled = isGenerating;
        const spinner = this.generateBtn.querySelector('.btn-spinner');
        const text = this.generateBtn.querySelector('.btn-text');
        
        if (isGenerating) {
            spinner.style.display = 'block';
            text.textContent = 'Generating...';
        } else {
            spinner.style.display = 'none';
            text.textContent = 'Generate UI';
        }
    }

    setRefining(isRefining) {
        this.refineBtn.disabled = isRefining;
        this.refineBtn.textContent = isRefining ? 'Refining...' : 'Apply Changes';
    }

    showProgress() {
        this.progressSection.style.display = 'block';
        this.progressFill.style.width = '0%';
    }

    hideProgress() {
        this.progressSection.style.display = 'none';
    }

    displayCode(code, validation = null) {
        let validationHTML = '';
        
        if (validation) {
            if (!validation.isValid) {
                validationHTML = `
                    <div class="validation-results error">
                        <h4>🔧 Template Validation Issues (Auto-corrected)</h4>
                        <ul>
                            ${validation.errors.map(error => `<li>${error}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else if (validation.warnings && validation.warnings.length > 0) {
                validationHTML = `
                    <div class="validation-results warning">
                        <h4>⚠️ Template Warnings</h4>
                        <ul>
                            ${validation.warnings.map(warning => `<li>${warning}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else {
                validationHTML = `
                    <div class="validation-results success">
                        <h4>✅ Template Validation Passed</h4>
                        <p>Code follows the strict Lit template structure correctly.</p>
                    </div>
                `;
            }
        }
        
        this.codeOutput.innerHTML = `
            ${validationHTML}
            <div class="code-content">
                <pre><code>${this.escapeHtml(code)}</code></pre>
            </div>
        `;
    }

    enableOutputActions() {
        this.copyBtn.disabled = false;
        this.previewBtn.disabled = false;
        this.downloadBtn.disabled = false;
    }

    showRefinementSection() {
        this.refinementSection.style.display = 'block';
    }

    // Utility methods
    generatePreviewHTML(code, framework) {
        const baseHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI Preview</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css">
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: var(--cre8-body-default-font-family, 'Inter', sans-serif);
            background: #f8fafc;
        }
        .preview-container {
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        ${this.adaptCodeForPreview(code, framework)}
    </div>
</body>
</html>`;
        
        return baseHTML;
    }

    adaptCodeForPreview(code, framework) {
        // For HTML framework, return the code directly since it follows the Lit template
        if (framework === 'html') {
            return code;
        }
        
        // For Lit web components, extract content from the render() method
        const litMatch = code.match(/return\s+html`\s*([\s\S]*?)\s*`;/);
        if (litMatch) {
            return litMatch[1]
                .replace(/\$\{[^}]*\}/g, '') // Remove Lit template expressions
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                .trim();
        }
        
        // Extract JSX/template content for other frameworks
        const htmlMatch = code.match(/return\s*\(\s*([\s\S]*?)\s*\);?/);
        if (htmlMatch) {
            return htmlMatch[1]
                .replace(/className=/g, 'class=')
                .replace(/\{[^}]*\}/g, ''); // Remove JS expressions
        }
        
        // Since we're using the strict Lit template, this should render properly
        return code;
    }

    getFileExtension(framework) {
        const extensions = {
            'react': 'tsx',
            'vue': 'vue',
            'angular': 'ts',
            'svelte': 'svelte',
            'html': 'html'
        };
        return extensions[framework] || 'txt';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showWarning(message) {
        this.showNotification(message, 'warning');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UIBuilderApp();
});