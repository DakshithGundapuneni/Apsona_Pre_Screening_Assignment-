const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Create a new note
router.post('/', async (req, res) => {
    try {
        const { content, tags, backgroundColor } = req.body;
        const newNote = new Note({
            content,
            tags,
            backgroundColor,
            createdAt: new Date()
        });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Fetch all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);  // Return an array of notes
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an existing note
router.put('/:id', async (req, res) => {
    try {
        const { content, tags, backgroundColor } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { content, tags, backgroundColor },
            { new: true }
        );
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
