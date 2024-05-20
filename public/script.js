document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');
    const keepingList = document.getElementById('keeping-list');
    const completedList = document.getElementById('completed-list');

    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            addNoteToDOM(note.text, note.completed ? completedList : keepingList, note.completed);
        });
    };

    const saveNotes = () => {
        const notes = [];
        document.querySelectorAll('ul li').forEach(note => {
            notes.push({
                text: note.querySelector('span').innerText,
                completed: note.closest('ul').id === 'completed-list'
            });
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    const addNoteToDOM = (text, list, completed = false) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.innerText = text;

        const doneButton = document.createElement('button');
        doneButton.innerHTML = '✔';
        doneButton.addEventListener('click', () => {
            completedList.appendChild(li);
            li.removeChild(doneButton);
            li.classList.add('completed');
            saveNotes();
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'X';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveNotes();
        });

        li.appendChild(span);
        if (!completed) {
            li.appendChild(doneButton);
        }
        li.appendChild(deleteButton);
        li.classList.toggle('completed', completed);
        list.appendChild(li);
    };

    noteForm.addEventListener('submit', event => {
        event.preventDefault();
        const text = noteInput.value.trim();
        if (text !== '') {
            addNoteToDOM(text, keepingList);
            noteInput.value = '';
            saveNotes();
        }
    });

    loadNotes();
});