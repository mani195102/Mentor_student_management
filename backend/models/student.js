// models/Student.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mentor: { type: Schema.Types.ObjectId, ref: 'Mentor', default: null }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;