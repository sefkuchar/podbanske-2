// GitHub Auto-Sync Module
// Automatically commits changes to GitHub repository

class GitHubSync {
  constructor() {
    // Default credentials - change these to your own
    const DEFAULT_TOKEN = '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';
    const DEFAULT_REPO = 'sefkuchar/podbanske-2';
    
    // Use localStorage if set, otherwise use defaults
    this.token = localStorage.getItem('github-token') || DEFAULT_TOKEN;
    this.repo = localStorage.getItem('github-repo') || DEFAULT_REPO;
    this.branch = 'main';
    
    // Auto-setup defaults in localStorage if not set
    if (!localStorage.getItem('github-token')) {
      localStorage.setItem('github-token', DEFAULT_TOKEN);
      localStorage.setItem('github-repo', DEFAULT_REPO);
      console.log('✅ GitHub credentials auto-configured');
    }
  }

  // Setup GitHub credentials
  setup(token, repo) {
    this.token = token;
    this.repo = repo;
    localStorage.setItem('github-token', token);
    localStorage.setItem('github-repo', repo);
  }

  // Check if configured
  isConfigured() {
    return this.token && this.repo && !this.repo.includes('YOUR_USERNAME');
  }

  // Get file content from GitHub
  async getFile(path) {
    const url = `https://api.github.com/repos/${this.repo}/contents/${path}?ref=${this.branch}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (response.ok) {
      return await response.json();
    }
    return null;
  }

  // Update or create file on GitHub
  async updateFile(path, content, message) {
    const url = `https://api.github.com/repos/${this.repo}/contents/${path}`;
    
    // Get current file to get SHA (required for updates)
    const currentFile = await this.getFile(path);
    
    const body = {
      message: message,
      content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
      branch: this.branch
    };
    
    if (currentFile) {
      body.sha = currentFile.sha; // Required for updates
    }
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update file');
    }
    
    return await response.json();
  }

  // Sync all data to GitHub
  async syncToGitHub(notify) {
    if (!this.isConfigured()) {
      throw new Error('GitHub not configured. Please set up GitHub sync first.');
    }

    notify('🔄 Syncing to GitHub...');

    // Collect all data from localStorage
    const data = {
      hero: this.getData('heroSection', {}),
      about: this.getData('aboutSection', {}),
      activities: this.getData('adminActivities', []),
      history: this.getData('historySection', {}),
      nature: this.getData('natureSection', {}),
      rules: this.getData('rulesSection', {}),
      magic: this.getData('magicSection', {}),
      contact: this.getData('contactInfo', {}),
      footer: this.getData('footerText', '')
    };

    // Create data.json content
    const dataJson = JSON.stringify(data, null, 2);

    try {
      // Upload data.json to GitHub
      await this.updateFile(
        'data.json',
        dataJson,
        `Update content - ${new Date().toLocaleString('sk-SK')}`
      );

      notify('✅ Synced to GitHub! Vercel will deploy shortly.');
      return true;
    } catch (error) {
      notify('❌ Sync failed: ' + error.message);
      console.error('GitHub sync error:', error);
      return false;
    }
  }

  // Helper to get data from localStorage
  getData(key, defaultValue) {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    try {
      return JSON.parse(data);
    } catch {
      return defaultValue;
    }
  }
}

// Export global instance
window.githubSync = new GitHubSync();
