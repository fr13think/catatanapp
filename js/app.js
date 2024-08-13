import { notesData } from './data/notes.js';

let notes = notesData;

function renderNotes(searchTerm = '') {
  const notesContainer = document.getElementById('notesGrid');
  notesContainer.innerHTML = '';
  
  const filteredNotes = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const activeNotes = filteredNotes.filter(note => !note.archived);
  const archivedNotes = filteredNotes.filter(note => note.archived);

  const renderNotesList = (notesList, title, className) => {
      if (notesList.length === 0) return;

      const section = document.createElement('div');
      section.className = 'notes-section';
      section.innerHTML = `<h2>${title}</h2>`;
      const grid = document.createElement('div');
      grid.className = `notes-grid ${className}`;
      notesList.forEach(note => {
          const noteItem = document.createElement('note-item');
          noteItem.setAttribute('note', JSON.stringify(note));
          noteItem.addEventListener('delete-note', handleDeleteNote);
          noteItem.addEventListener('edit-note', handleEditNote);
          noteItem.addEventListener('toggle-archive', handleToggleArchive);
          grid.appendChild(noteItem);
      });
      section.appendChild(grid);
      notesContainer.appendChild(section);
  };

  renderNotesList(activeNotes, 'Catatan Aktif', 'active-notes');
  renderNotesList(archivedNotes, 'Catatan Terarsip', 'archived-notes');
}

function handleSaveNote(event) {
  const { id, title, body, editMode } = event.detail;
  if (editMode) {
      const index = notes.findIndex(note => note.id === id);
      notes[index] = { ...notes[index], title, body: body, createdAt: new Date().toISOString() };
  } else {
      const newId = crypto.randomUUID();
      notes.push({ id: newId, title, body: body, createdAt: new Date().toISOString(), archived: false });
  }
  renderNotes();
}


function handleDeleteNote(event) {
  const id = event.detail.id;
  notes = notes.filter(note => note.id !== id);
  renderNotes();
}


function handleEditNote(event) {
  const editModal = document.querySelector('edit-modal');
  editModal.open(event.detail);
}

function handleSaveEdit(event) {
  const updatedNote = event.detail;
  const index = notes.findIndex(note => note.id === updatedNote.id);
  notes[index] = { ...notes[index], ...updatedNote, createdAt: new Date().toISOString() };
  renderNotes();
}


function handleToggleArchive(event) {
  const noteToToggle = event.detail;
  const index = notes.findIndex(note => note.id === noteToToggle.id);
  notes[index].archived = !notes[index].archived;
  renderNotes();
}

document.querySelector('note-form').addEventListener('save-note', handleSaveNote);
document.querySelector('edit-modal').addEventListener('save-edit', handleSaveEdit);

// Inisialisasi aplikasi
renderNotes();

// Pencarian
document.getElementById('searchInput').addEventListener('input', (e) => {
  renderNotes(e.target.value);
});

// Theme toggle
document.body.addEventListener('DOMSubtreeModified', () => {
  const isDarkMode = document.body.classList.contains('dark-mode');
    document.querySelectorAll('note-item').forEach(item => {
        item.style.setProperty('--note-bg-color', isDarkMode ? '#2C2C2E' : '#FFFFFF');
        item.style.setProperty('--note-text-color', isDarkMode ? '#FFFFFF' : '#000000');
    });
    
    // Perbarui tema untuk footer
    document.querySelector('app-footer').updateTheme();
});