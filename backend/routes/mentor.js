const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const Student = require('../models/student');

// Create Mentor
router.post('/create', async (req, res) => {
    try {
        const { name, email } = req.body;
        const mentor = new Mentor({ name, email });
        await mentor.save();
        res.status(201).json(mentor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/all', async (req, res) => {
    try {
      const mentors = await Mentor.find({});
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching mentors', error });
    }
  });
// Get Students by Mentor ID
router.get('/:mentorId/students', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const students = await Student.find({ mentor: mentorId });
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;