// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const mentorRoutes = require('./routes/mentor');
const studentRoutes = require('./routes/student');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/mentor', mentorRoutes);
app.use('/api/student', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
