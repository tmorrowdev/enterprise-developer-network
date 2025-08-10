import { WebContainer } from '@webcontainer/api';

export class WebContainerService {
  constructor() {
    this.webcontainer = null;
    this.isBooted = false;
    this.bootPromise = null;
  }

  async boot() {
    if (this.bootPromise) {
      return this.bootPromise;
    }

    this.bootPromise = this._boot();
    return this.bootPromise;
  }

  async _boot() {
    if (this.isBooted) {
      return this.webcontainer;
    }

    try {
      console.log('Booting WebContainer...');
      this.webcontainer = await WebContainer.boot();
      this.isBooted = true;
      console.log('WebContainer booted successfully');
      return this.webcontainer;
    } catch (error) {
      console.error('Failed to boot WebContainer:', error);
      throw error;
    }
  }

  async createProject(framework, code, projectName = 'ui-preview') {
    await this.boot();

    const files = this.generateProjectFiles(framework, code, projectName);
    
    try {
      await this.webcontainer.mount(files);
      console.log('Project files mounted successfully');
      return true;
    } catch (error) {
      console.error('Failed to mount project files:', error);
      throw error;
    }
  }

  async installDependencies() {
    await this.boot();

    try {
      const installProcess = await this.webcontainer.spawn('npm', ['install']);
      
      return new Promise((resolve, reject) => {
        installProcess.output.pipeTo(new WritableStream({
          write(data) {
            console.log('npm install:', data);
          }
        }));

        installProcess.exit.then((code) => {
          if (code === 0) {
            console.log('Dependencies installed successfully');
            resolve(true);
          } else {
            reject(new Error(`npm install failed with exit code ${code}`));
          }
        });
      });
    } catch (error) {
      console.error('Failed to install dependencies:', error);
      throw error;
    }
  }

  async startDevServer() {
    await this.boot();

    try {
      const serverProcess = await this.webcontainer.spawn('npm', ['run', 'dev']);
      
      serverProcess.output.pipeTo(new WritableStream({
        write(data) {
          console.log('dev server:', data);
        }
      }));

      // Wait for server to be ready
      this.webcontainer.on('server-ready', (port, url) => {
        console.log(`Dev server ready at ${url}`);
      });

      return serverProcess;
    } catch (error) {
      console.error('Failed to start dev server:', error);
      throw error;
    }
  }

  async getPreviewUrl() {
    await this.boot();
    
    try {
      // Wait for the server to be ready and return the URL
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timeout waiting for preview URL'));
        }, 30000);

        this.webcontainer.on('server-ready', (port, url) => {
          clearTimeout(timeout);
          resolve(url);
        });
      });
    } catch (error) {
      console.error('Failed to get preview URL:', error);
      throw error;
    }
  }

  generateProjectFiles(framework, code, projectName) {
    switch (framework) {
      case 'react':
        return this.generateReactProject(code, projectName);
      case 'vue':
        return this.generateVueProject(code, projectName);
      case 'svelte':
        return this.generateSvelteProject(code, projectName);
      case 'html':
        return this.generateHTMLProject(code, projectName);
      default:
        return this.generateReactProject(code, projectName);
    }
  }

  generateReactProject(code, projectName) {
    return {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: projectName,
            version: '1.0.0',
            type: 'module',
            scripts: {
              dev: 'vite',
              build: 'vite build',
              preview: 'vite preview'
            },
            dependencies: {
              react: '^18.2.0',
              'react-dom': '^18.2.0'
            },
            devDependencies: {
              '@types/react': '^18.2.0',
              '@types/react-dom': '^18.2.0',
              '@vitejs/plugin-react': '^4.0.0',
              typescript: '^5.0.0',
              vite: '^4.4.0'
            }
          }, null, 2)
        }
      },
      'vite.config.ts': {
        file: {
          contents: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})`
        }
      },
      'index.html': {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`
        }
      },
      'src': {
        directory: {
          'main.tsx': {
            file: {
              contents: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`
            }
          },
          'App.tsx': {
            file: {
              contents: this.wrapReactComponent(code)
            }
          },
          'index.css': {
            file: {
              contents: `body {
  margin: 0;
  padding: 20px;
  font-family: var(--cre8-body-default-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  background: #f8fafc;
}

#root {
  max-width: 1200px;
  margin: 0 auto;
}`
            }
          }
        }
      }
    };
  }

  generateVueProject(code, projectName) {
    return {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: projectName,
            version: '1.0.0',
            type: 'module',
            scripts: {
              dev: 'vite',
              build: 'vite build',
              preview: 'vite preview'
            },
            dependencies: {
              vue: '^3.3.0'
            },
            devDependencies: {
              '@vitejs/plugin-vue': '^4.2.0',
              typescript: '^5.0.0',
              vite: '^4.4.0',
              'vue-tsc': '^1.8.0'
            }
          }, null, 2)
        }
      },
      'vite.config.ts': {
        file: {
          contents: `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true
  }
})`
        }
      },
      'index.html': {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>`
        }
      },
      'src': {
        directory: {
          'main.ts': {
            file: {
              contents: `import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')`
            }
          },
          'App.vue': {
            file: {
              contents: this.wrapVueComponent(code)
            }
          },
          'style.css': {
            file: {
              contents: `body {
  margin: 0;
  padding: 20px;
  font-family: var(--cre8-body-default-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  background: #f8fafc;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
}`
            }
          }
        }
      }
    };
  }

  generateSvelteProject(code, projectName) {
    return {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: projectName,
            version: '1.0.0',
            type: 'module',
            scripts: {
              dev: 'vite dev',
              build: 'vite build',
              preview: 'vite preview'
            },
            dependencies: {
              svelte: '^4.0.0'
            },
            devDependencies: {
              '@sveltejs/vite-plugin-svelte': '^2.4.0',
              typescript: '^5.0.0',
              vite: '^4.4.0'
            }
          }, null, 2)
        }
      },
      'vite.config.ts': {
        file: {
          contents: `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3000,
    host: true
  }
})`
        }
      },
      'index.html': {
        file: {
          contents: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@cre8_dev/cre8-design-tokens@1.0.3/lib/web/brands/cre8/css/tokens_cre8.css">
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>`
        }
      },
      'src': {
        directory: {
          'main.ts': {
            file: {
              contents: `import App from './App.svelte'
import './app.css'

const app = new App({
  target: document.getElementById('app')!,
})

export default app`
            }
          },
          'App.svelte': {
            file: {
              contents: this.wrapSvelteComponent(code)
            }
          },
          'app.css': {
            file: {
              contents: `body {
  margin: 0;
  padding: 20px;
  font-family: var(--cre8-body-default-font-family, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
  background: #f8fafc;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
}`
            }
          }
        }
      }
    };
  }

  generateHTMLProject(code, projectName) {
    return {
      'package.json': {
        file: {
          contents: JSON.stringify({
            name: projectName,
            version: '1.0.0',
            scripts: {
              dev: 'npx serve -s . -p 3000',
              start: 'npx serve -s . -p 3000'
            },
            devDependencies: {
              serve: '^14.2.0'
            }
          }, null, 2)
        }
      },
      'index.html': {
        file: {
          contents: code // Use the generated code directly since it should be a complete HTML document
        }
      }
    };
  }

  wrapReactComponent(code) {
    // If code already has a component structure, return as-is
    if (code.includes('function ') || code.includes('const ') || code.includes('export')) {
      return code;
    }

    // Otherwise, wrap in a basic component
    return `import React from 'react';

function App() {
  return (
    <div className="app">
      ${code}
    </div>
  );
}

export default App;`;
  }

  wrapVueComponent(code) {
    // If code already has Vue component structure, return as-is
    if (code.includes('<template>') || code.includes('<script>')) {
      return code;
    }

    // Otherwise, wrap in a basic component
    return `<template>
  <div class="app">
    ${code}
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
.app {
  padding: 1rem;
}
</style>`;
  }

  wrapSvelteComponent(code) {
    // If code already has Svelte component structure, return as-is
    if (code.includes('<script>') || code.includes('<style>')) {
      return code;
    }

    // Otherwise, wrap in a basic component
    return `<script lang="ts">
  // Component logic here
</script>

<div class="app">
  ${code}
</div>

<style>
  .app {
    padding: 1rem;
  }
</style>`;
  }

  async cleanup() {
    if (this.webcontainer) {
      try {
        await this.webcontainer.teardown();
        this.webcontainer = null;
        this.isBooted = false;
        this.bootPromise = null;
        console.log('WebContainer cleaned up');
      } catch (error) {
        console.error('Error cleaning up WebContainer:', error);
      }
    }
  }
}