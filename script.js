class NetworkTool {
    constructor() {
        // These are your backend servers - we'll set these up later
        this.servers = [
            {
                id: 'demo',
                name: 'Demo Server',
                location: 'Demonstration Only',
                url: 'https://httpbin.org' // This is just for demo - won't actually ping
            }
        ];
        
        this.init();
    }
    
    init() {
        this.targetInput = document.getElementById('targetInput');
        this.pingBtn = document.getElementById('pingBtn');
        this.tracerouteBtn = document.getElementById('tracerouteBtn');
        this.bothBtn = document.getElementById('bothBtn');
        this.loading = document.getElementById('loading');
        this.results = document.getElementById('results');
        
        this.bindEvents();
        this.showWelcomeMessage();
    }
    
    bindEvents() {
        this.pingBtn.addEventListener('click', () => this.runTest('ping'));
        this.tracerouteBtn.addEventListener('click', () => this.runTest('traceroute'));
        this.bothBtn.addEventListener('click', () => this.runTest('both'));
        
        this.targetInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.runTest('both');
            }
        });
    }
    
    showWelcomeMessage() {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `
            <div class="server-result">
                <div class="server-header">
                    <div class="server-name">🎉 Welcome to Your Network Tool!</div>
                    <div class="server-location">Setup is almost complete</div>
                </div>
                <div class="test-result">
                    <div class="test-type">📋 Current Status</div>
                    <div class="result-output">✅ Frontend deployed successfully!
⚠️  Backend servers not yet configured
                    
Next steps:
1. Follow the guide to set up your backend servers
2. Update the server URLs in script.js
3. Deploy backend to Heroku (instructions below)

Once complete, you'll be able to run real ping and traceroute tests!</div>
                </div>
            </div>
        `;
        this.results.appendChild(welcomeDiv);
    }
    
    validateInput(target) {
        if (!target) return false;
        
        // Simple validation for domain or IP
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
        return domainRegex.test(target) || ipRegex.test(target);
    }
    
    async runTest(testType) {
        const target = this.targetInput.value.trim();
        
        if (!this.validateInput(target)) {
            alert('Please enter a valid domain name (like google.com) or IP address (like 8.8.8.8)');
            return;
        }
        
        this.showLoading();
        this.clearResults();
        this.disableButtons();
        
        // Show demo message since backend isn't set up yet
        this.showDemoMessage(target, testType);
        
        setTimeout(() => {
            this.hideLoading();
            this.enableButtons();
        }, 2000);
    }
    
    showDemoMessage(target, testType) {
        const demoDiv = document.createElement('div');
        demoDiv.className = 'server-result';
        demoDiv.innerHTML = `
            <div class="server-header">
                <div class="server-name">🚧 Demo Mode</div>
                <div class="server-location">Backend not configured yet</div>
            </div>
            <div class="test-result">
                <div class="test-type">📝 Would run: ${testType} to ${target}</div>
                <div class="result-output">This is a demonstration.

To make this work with real ping/traceroute:
1. Set up backend servers (see guide below)
2. Update server URLs in script.js
3. Deploy backend code

Example of what real output would look like:
PING ${target} (1.2.3.4): 56 data bytes
64 bytes from 1.2.3.4: icmp_seq=0 ttl=54 time=12.345 ms
64 bytes from 1.2.3.4: icmp_seq=1 ttl=54 time=11.234 ms</div>
                <div class="timestamp">Demo completed at: ${new Date().toLocaleString()}</div>
            </div>
        `;
        this.results.appendChild(demoDiv);
    }
    
    showLoading() {
        this.loading.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loading.classList.add('hidden');
    }
    
    disableButtons() {
        this.pingBtn.disabled = true;
        this.tracerouteBtn.disabled = true;
        this.bothBtn.disabled = true;
    }
    
    enableButtons() {
        this.pingBtn.disabled = false;
        this.tracerouteBtn.disabled = false;
        this.bothBtn.disabled = false;
    }
    
    clearResults() {
        this.results.innerHTML = '';
    }
}

// Start the application when page loads
document.addEventListener('DOMContentLoaded', () => {
    new NetworkTool();
});
