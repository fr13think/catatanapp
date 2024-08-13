class EditModalNote extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 1;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.4);
                }
                .modal-content {
                    background-color: #fefefe;
                    margin: 15% auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                    max-width: 500px;
                }
                input, textarea {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                }
                button {
                    padding: 8px 16px;
                    cursor: pointer;
                }
                .error {
                    color: red;
                    font-size: 0.8em;
                }
            </style>
            <div class="modal">
                <div class="modal-content">
                    <h2>Edit Catatan</h2>
                    <input type="text" id="editTitle" placeholder="Judul" required>
                    <div class="error" id="editTitleError"></div>
                    <textarea id="editContent" placeholder="Isi catatan" required></textarea>
                    <div class="error" id="editContentError"></div>
                    <button id="saveEdit">Simpan</button>
                    <button id="cancelEdit">Batal</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('#saveEdit').addEventListener('click', this.handleSave.bind(this));
        this.shadowRoot.querySelector('#cancelEdit').addEventListener('click', this.close.bind(this));
        this.shadowRoot.querySelector('#editTitle').addEventListener('input', this.validateTitle.bind(this));
        this.shadowRoot.querySelector('#editContent').addEventListener('input', this.validateContent.bind(this));
    }

    open(note) {
        this.note = note;
        this.shadowRoot.querySelector('#editTitle').value = note.title;
        this.shadowRoot.querySelector('#editContent').value = note.content;
        this.shadowRoot.querySelector('.modal').style.display = 'block';
    }

    close() {
        this.shadowRoot.querySelector('.modal').style.display = 'none';
    }

    validateTitle() {
        const title = this.shadowRoot.querySelector('#editTitle').value;
        const titleError = this.shadowRoot.querySelector('#editTitleError');
        if (title.length < 3) {
            titleError.textContent = 'Judul harus minimal 3 karakter';
        } else {
            titleError.textContent = '';
        }
    }

    validateContent() {
        const content = this.shadowRoot.querySelector('#editContent').value;
        const contentError = this.shadowRoot.querySelector('#editContentError');
        if (content.length < 10) {
            contentError.textContent = 'Isi catatan harus minimal 10 karakter';
        } else {
            contentError.textContent = '';
        }
    }

    handleSave() {
        const title = this.shadowRoot.querySelector('#editTitle').value;
        const content = this.shadowRoot.querySelector('#editContent').value;

        if (title.length < 3 || content.length < 10) {
            return;
        }

        const updatedNote = { ...this.note, title, content };
        const event = new CustomEvent('save-edit', { detail: updatedNote });
        this.dispatchEvent(event);
        this.close();
    }
}

customElements.define('edit-modal', EditModalNote);