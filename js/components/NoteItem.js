class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const note = JSON.parse(this.getAttribute('note'));
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: var(--note-bg-color, #f9f9f9);
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 16px;
                    color: var(--note-text-color, #000);
                }
                h2 {
                    margin-top: 0;
                }
                button {
                    margin-top: 8px;
                    padding: 4px 8px;
                    cursor: pointer;
                }
                .archived {
                    opacity: 0.7;
                }
            </style>
            <div class="${note.archived ? 'archived' : ''}">
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button class="edit">Edit</button>
                <button class="delete">Hapus</button>
                <button class="archive">${note.archived ? 'Unarsipkan' : 'Arsipkan'}</button>
            </div>
        `;

        this.shadowRoot.querySelector('.edit').addEventListener('click', () => this.editNote(note));
        this.shadowRoot.querySelector('.delete').addEventListener('click', () => this.deleteNote(note.id));
        this.shadowRoot.querySelector('.archive').addEventListener('click', () => this.toggleArchive(note));
    }

    editNote(note) {
        const event = new CustomEvent('edit-note', { detail: note });
        this.dispatchEvent(event);
    }

    deleteNote(id) {
        const event = new CustomEvent('delete-note', { detail: { id } });
        this.dispatchEvent(event);
    }

    toggleArchive(note) {
        const event = new CustomEvent('toggle-archive', { detail: note });
        this.dispatchEvent(event);
    }
}

customElements.define('note-item', NoteItem);