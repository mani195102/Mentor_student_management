const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Mentor = require('../models/mentor');

// Create Student
router.post('/create', async (req, res) => {
    try {
        const { name, email } = req.body;
        const student = new Student({ name, email });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/all', async (req, res) => {
    try {
      const students = await Student.find({});
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching mentors', error });
    }
  });

// Assign Student to Mentor
router.post('/assign', async (req, res) => {
    try {
        const { mentorId, studentIds } = req.body;
        await Student.updateMany(
            { _id: { $in: studentIds }, mentor: null },
            { $set: { mentor: mentorId } }
        );
        res.status(200).json({ message: 'Students assigned to mentor' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Previously Assigned Mentor for a Student
router.get('/:studentId/mentor', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('mentor');
        res.status(200).json(student.mentor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Change Mentor for a Student
router.post('/change-mentor', async (req, res) => {
    try {
        const { studentId, mentorId } = req.body;
        const student = await Student.findById(studentId);
        student.mentor = mentorId;
        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;