/* content-data.js */

// Canvas size is roughly 1200x800.
// We want an S-Curve or "Snake" path top-left -> right -> down -> left.

const missions = [
    {
        id: "definitions",
        title: "Mission 1: The Basics (Definitions & Lingo)",
        subTitle: "Phase I: Pre-Flight Check",
        description: "Must-know vocabulary before we launch.",
        icon: "📖",
        x: 100, y: 150, // Top Left
        content: `
            <h3>Before flight, learn the language.</h3>
            <p>Familiarize yourself with the vocabulary of version control.</p>
            
            <div class="mission-step">
                <div class="step-title">IDE (Integrated Development Environment)</div>
                <div class="step-content">
                    A software application that bundles developer tools, like a code editor, debugger, and compiler, into a single interface (e.g. VS Code, Cursor).
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Version Control (Git)</div>
                <div class="step-content">
                    A system that records changes to a file or set of files over time so that you can recall specific versions later.
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Repository (Repo)</div>
                <div class="step-content">
                    The fundamental unit of GitHub. It is a folder that contains all your project files and the revision history for each file.
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Remote vs. Local</div>
                <div class="step-content">
                    <ul>
                        <li><strong>Remote:</strong> The version of your repository hosted on the internet (GitHub.com).</li>
                        <li><strong>Local:</strong> The version of your repository stored on your physical computer's hard drive.</li>
                    </ul>
                </div>
            </div>
            
            <div class="mission-step">
                <div class="step-title">Key Actions</div>
                <div class="step-content">
                    <ul>
                        <li><strong>Clone:</strong> Downloading a Remote repository to your Local machine.</li>
                        <li><strong>Commit:</strong> A snapshot of your local files. Requires a "Commit Message".</li>
                        <li><strong>Push:</strong> Uploading local content to remote.</li>
                        <li><strong>Pull:</strong> Fetching and downloading content from remote to local.</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        id: "ide-setup",
        title: "Mission 2: The Cockpit (IDE Setup)",
        subTitle: "Phase I: Pre-Flight Check",
        description: "Configure your control center: VS Code.",
        icon: "💻",
        x: 350, y: 150, // Top Row
        content: `
            <h3>Prepare your vessel (VS Code).</h3>
            
            <div class="mission-step">
                <div class="step-title">Installation</div>
                <div class="step-content">
                    <ol>
                        <li>Go to <a href="https://code.visualstudio.com/" target="_blank">VS Code Download Page</a>.</li>
                        <li>Download and run the installer for your OS.</li>
                    </ol>
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Orientation</div>
                <div class="step-content">
                    <ul>
                        <li><strong>Activity Bar (Left):</strong> Explorer, Search, Source Control, Extensions.</li>
                        <li><strong>Command Palette:</strong> <code>Ctrl+Shift+P</code> (Win) or <code>Cmd+Shift+P</code> (Mac).</li>
                        <li><strong>Terminal:</strong> <code>Ctrl + ~</code>.</li>
                    </ul>
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Essential Extensions</div>
                <div class="step-content">
                    Click the Extensions icon (squares) and install:
                    <div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span class="item-text">Live Server (Ritwick Dey)</span></div>
                    <div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span class="item-text">Prettier (Code formatter)</span></div>
                    <div class="checklist-item"><input type="checkbox" class="checklist-checkbox"><span class="item-text">GitHub Copilot</span></div>
                </div>
            </div>
        `
    },
    {
        id: "profile-setup",
        title: "Mission 3: Identity Setup",
        subTitle: "Phase I: Pre-Flight Check",
        description: "Establish your digital presence.",
        icon: "👤",
        x: 600, y: 150, // Top Row
        content: `
            <h3>Who goes there?</h3>
            
            <div class="mission-step">
                <div class="step-title">Account Creation</div>
                <div class="step-content">
                    <ol>
                        <li>Navigate to <a href="https://github.com" target="_blank">GitHub.com</a> and click Sign Up.</li>
                        <li>Follow the prompts. Use your CSU-provided or personal email.</li>
                    </ol>
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Profile Customization</div>
                <div class="step-content">
                    <ol>
                        <li>Click your avatar (top-right) > Settings.</li>
                        <li>"Public Profile": Enter Name, Bio (e.g., "Engineering Student"), and upload a photo.</li>
                    </ol>
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">✨ Bonus Mission: Special Profile README</div>
                <div class="step-content">
                    <p>Create a unique content section on your main profile page.</p>
                    <ol>
                        <li>Create a new repository named <strong>exactly</strong> the same as your username.</li>
                        <li>Ensure it is <strong>Public</strong>.</li>
                        <li>Check "Initialize this repository with a README".</li>
                        <li>Edit the README.md to add info about yourself!</li>
                    </ol>
                </div>
            </div>
        `
    },
    {
        id: "creating-repo",
        title: "Mission 4: First Launch (Create Repo)",
        subTitle: "Phase II: Lift Off",
        description: "Initialize a project the 'Remote-First' way.",
        icon: "🚀",
        x: 850, y: 250, // Dropping down
        content: `
            <h3>Start your engines.</h3>
            
            <div class="mission-step">
                <div class="step-title">Create on GitHub</div>
                <div class="step-content">
                    <ol>
                        <li>Log in to GitHub.com.</li>
                        <li>Select "+" dropdown (top-right) > New repository.</li>
                        <li><strong>Name:</strong> Short, specific (e.g., <code>mental-model-1</code>).</li>
                        <li><strong>Public/Private:</strong> Public for this course.</li>
                        <li><strong>Initialize with:</strong> Check "Add a README file" and "Add .gitignore" (Select template like Node or Python).</li>
                        <li>Click <strong>Create repository</strong>.</li>
                    </ol>
                </div>
            </div>
            
            <div class="mission-step">
                <div class="step-title">✨ Try It Now</div>
                <div class="step-content">
                    Create a "Sandbox" repository right now just to practice. You can delete it later!
                </div>
            </div>
        `
    },
    {
        id: "desktop-setup",
        title: "Mission 5: Navigation Tools",
        subTitle: "Phase II: Lift Off",
        description: "Setting up GitHub Desktop.",
        icon: "🧭",
        x: 850, y: 500, // Bottom-right corner
        content: `
            <h3>GitHub Desktop: A visual interface.</h3>
            
            <div class="mission-step">
                <div class="step-title">Setup</div>
                <div class="step-content">
                    <ol>
                        <li>Download <a href="https://desktop.github.com/" target="_blank">GitHub Desktop</a>.</li>
                        <li><strong>Sign In:</strong> Launch and sign in with your GitHub account.</li>
                        <li><strong>Configure:</strong> Use the same email address as your GitHub account.</li>
                    </ol>
                </div>
            </div>
        `
    },
    {
        id: "updating-repo",
        title: "Mission 6: Orbit Procedures (Update Repo)",
        subTitle: "Phase III: Stabilization",
        description: "The Core Cycle: Clone, Edit, Commit, Push.",
        icon: "🔄",
        x: 600, y: 600, // Bottom row going left
        content: `
            <h3>Keep the communication open.</h3>
            
            <div class="mission-step">
                <div class="step-title">Step A: Cloning</div>
                <div class="step-content">
                    <p><strong>GitHub Desktop:</strong> Click "Open with GitHub Desktop" on the repo page.</p>
                    <p><strong>VS Code:</strong> Copy HTTPS URL. <code>Cmd+Shift+P</code> > "Git: Clone".</p>
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Step B: The Edit Cycle</div>
                <div class="step-content">
                    <strong>Using VS Code:</strong>
                    <ol>
                        <li>Open Folder as Workspace.</li>
                        <li>Make changes and save.</li>
                        <li>Click Source Control icon.</li>
                        <li><strong>Stage (+)</strong> the files.</li>
                        <li><strong>Commit:</strong> Type message and click Commit.</li>
                        <li><strong>Sync:</strong> Push changes.</li>
                    </ol>
                </div>
            </div>
        `
    },
    {
        id: "pages-deploy",
        title: "Mission 7: Colonization (Deploy)",
        subTitle: "Phase III: Stabilization",
        description: "Turn your repo into a live website!",
        icon: "🌐",
        x: 350, y: 600, // Bottom row going left
        content: `
            <h3>Claim your territory on the web.</h3>
            
            <div class="mission-step">
                <div class="step-title">Option A: GitHub Actions (Recommended)</div>
                <div class="step-content">
                    <ol>
                        <li>Repo Settings > Pages.</li>
                        <li>Build and deployment > Source: <strong>GitHub Actions</strong>.</li>
                        <li>Select "Static HTML" -> Configure.</li>
                        <li>Commit changes.</li>
                        <li>Monitor "Actions" tab for green checkmark.</li>
                    </ol>
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Option B: From Branch (Classic)</div>
                <div class="step-content">
                    <ol>
                        <li>Settings > Pages.</li>
                        <li>Source: <strong>Deploy from a branch</strong>.</li>
                        <li>Select <code>main</code> branch, folder <code>/ (root)</code>.</li>
                        <li>Save.</li>
                    </ol>
                </div>
            </div>
        `
    },
    {
        id: "exploration",
        title: "Mission 8: Exploration",
        subTitle: "Phase IV: Deep Space",
        description: "Templates, Forking & Open Source.",
        icon: "🔭",
        x: 100, y: 500, // Bottom Left - End of journey
        content: `
            <h3>Go where no one has gone before.</h3>
            
            <div class="mission-step">
                <div class="step-title">Using a Template</div>
                <div class="step-content">
                    1. Navigate to Template Repo.<br>
                    2. Click "Use this template".<br>
                    3. Create new repository.
                </div>
            </div>

            <div class="mission-step">
                <div class="step-title">Forking & Pull Requests</div>
                <div class="step-content">
                    <strong>Fork:</strong> Create a copy on your account.<br>
                    <strong>Clone:</strong> Download to local.<br>
                    <strong>Edit & Push:</strong> Make changes.<br>
                    <strong>Pull Request:</strong> Propose changes to original repo.
                </div>
            </div>
        `
    }
];

// Define connections for the roadmap lines (From ID -> To ID)
const connections = [
    { from: "definitions", to: "ide-setup" },
    { from: "ide-setup", to: "profile-setup" },
    { from: "profile-setup", to: "creating-repo" }, // Adjusted flow
    { from: "creating-repo", to: "desktop-setup" },
    { from: "desktop-setup", to: "updating-repo" },
    { from: "updating-repo", to: "pages-deploy" },
    { from: "pages-deploy", to: "exploration" }
];
