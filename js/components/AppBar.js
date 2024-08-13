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
                    background-color: #4CAF50;
                    color: white;
                    padding: 16px;
                }
                h1 {
                    margin: 0;
                }
                button {
                    background-color: #45a049;
                    border: none;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                }
            </style>
            <h1>Aplikasi Catatan Harian</h1>
            <button id="toggleTheme">Toggle Theme</button>
        `;
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
    }
}

customElements.define('app-bar', AppBar);