class NoteForm extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.editMode = false;
      this.editId = null;
  }

  connectedCallback() {
      this.render();
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              :host {
                  display: block;
                  margin-bottom: 20px;
              }
              form {
                  display: grid;
                  gap: 10px;
              }
              input, textarea {
                  width: 100%;
                  padding: 8px;
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
          <form id="noteForm">
              <input type="text" id="title" placeholder="Judul" required>
              <div class="error" id="titleError"></div>
              <textarea id="content" placeholder="Isi catatan" required></textarea>
              <div class="error" id="contentError"></div>
              <button type="submit">${this.editMode ? 'Update' : 'Tambah'} Catatan</button>
          </form>
      `;

      this.shadowRoot.querySelector('#noteForm').addEventListener('submit', this.handleSubmit.bind(this));
      this.shadowRoot.querySelector('#title').addEventListener('input', this.validateTitle.bind(this));
      this.shadowRoot.querySelector('#content').addEventListener('input', this.validateContent.bind(this));
  }

  validateTitle() {
      const title = this.shadowRoot.querySelector('#title').value;
      const titleError = this.shadowRoot.querySelector('#titleError');
      if (title.length < 3) {
          titleError.textContent = 'Judul harus minimal 3 karakter';
      } else {
          titleError.textContent = '';
      }
  }

  validateContent() {
      const content = this.shadowRoot.querySelector('#content').value;
      const contentError = this.shadowRoot.querySelector('#contentError');
      if (content.length < 10) {
          contentError.textContent = 'Isi catatan harus minimal 10 karakter';
      } else {
          contentError.textContent = '';
      }
  }

  handleSubmit(event) {
      event.preventDefault();
      const title = this.shadowRoot.querySelector('#title').value;
      const content = this.shadowRoot.querySelector('#content').value;

      if (title.length < 3 || content.length < 10) {
          return;
      }

      const noteEvent = new CustomEvent('save-note', {
          detail: { id: this.editId, title, content, editMode: this.editMode }
      });
      this.dispatchEvent(noteEvent);

      this.resetForm();
  }

  setEditMode(note) {
      this.editMode = true;
      this.editId = note.id;
      this.shadowRoot.querySelector('#title').value = note.title;
      this.shadowRoot.querySelector('#content').value = note.content;
      this.shadowRoot.querySelector('button[type="submit"]').textContent = 'Update Catatan';
      this.render();
  }

  resetForm() {
      this.editMode = false;
      this.editId = null;
      this.shadowRoot.querySelector('#noteForm').reset();
      this.shadowRoot.querySelector('button[type="submit"]').textContent = 'Tambah Catatan';
  }
}

customElements.define('note-form', NoteForm);