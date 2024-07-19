$(document).ready(function() {
    const apiUrl = 'http://localhost:3000/api';
    let token = '';  // Add authentication token if needed

    // Function to update the notes list
    function updateNotesList() {
        $.ajax({
            url: `${apiUrl}/notes`,
            headers: { 'Authorization': `Bearer ${token}` },
            method: 'GET',
            success: function(data) {
                console.log('Response Data:', data);  // Log the data to inspect its structure
                if (Array.isArray(data)) {
                    $('#note-list').empty();
                    data.forEach(note => {
                        $('#note-list').append(`
                            <div class="note" data-id="${note._id}" style="background-color: ${note.backgroundColor}">
                                <p>${note.content}</p>
                                <p>Tags: ${note.tags.join(', ')}</p>
                                <button class="archive-note">Archive</button>
                                <button class="trash-note">Trash</button>
                            </div>
                        `);
                    });
                } else {
                    console.error('Expected an array of notes, but received:', data);
                }
            },
            error: function(err) {
                console.error('Error fetching notes:', err);
            }
        });
    }

    // Show note editor for creating new notes
    $('#create-note').click(function() {
        $('#note-editor').show();
        $('#note-editor').data('id', null);  // Clear the editor for a new note
    });

    // Save or update a note
    $('#save-note').click(function() {
        const content = $('#note-content').val();
        const tags = $('#note-tags').val().split(',').map(tag => tag.trim());
        const backgroundColor = $('#note-background').val();
        const noteId = $('#note-editor').data('id');

        const method = noteId ? 'PUT' : 'POST';
        const url = noteId ? `${apiUrl}/notes/${noteId}` : `${apiUrl}/notes`;

        $.ajax({
            url: url,
            headers: { 'Authorization': `Bearer ${token}` },
            method: method,
            data: JSON.stringify({ content, tags, backgroundColor }),
            contentType: 'application/json',
            success: function() {
                $('#note-editor').hide();
                updateNotesList();
            },
            error: function(err) {
                console.error('Error saving note:', err);
            }
        });
    });

    // Initial load
    updateNotesList();
});
