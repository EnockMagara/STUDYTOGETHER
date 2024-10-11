const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = 3000;

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Set up session middleware
app.use(session({
    secret: 'yourSecretKey', // Secret key for signing the session ID cookie
    resave: false,           // Don't save session if unmodified
    saveUninitialized: true  // Save uninitialized sessions
}));

// Set up flash middleware
app.use(flash());

// Data storage (in-memory for simplicity)
let resources = [];
let groups = [];

// Routes
app.use('/', require('./routes/index'));
app.use('/resources', require('./routes/resources')(resources, upload));
app.use('/sessions', require('./routes/sessions')(groups));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
