class AppBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#toggleTheme').addEventListener('click', this.toggleTheme.bind(this));
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--background-light, #F2F2F7);
                    color: var(--text-light, #000000);
                    padding: 16px;
                    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
                }
                h1 {
                    margin: 0;
                    font-weight: 600;
                }
                button {
                    background-color: var(--accent-color, #007AFF);
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    border-radius: 10px;
                }
            </style>
            <h1>Catatan Harian</h1>
            <button id="toggleTheme">Toggle Theme</button>
        `;
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        this.updateTheme();
    }

    updateTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        this.style.setProperty('--background-light', isDarkMode ? '#1C1C1E' : '#F2F2F7');
        this.style.setProperty('--text-light', isDarkMode ? '#FFFFFF' : '#000000');
    }
}

customElements.define('app-bar', AppBar);