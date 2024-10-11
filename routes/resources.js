const express = require('express');

module.exports = (resources, upload) => {
    const router = express.Router();

    // Display resource library
    router.get('/', (req, res) => {
        res.render('resourceLibrary', {
            title: 'Resource Library',
            resources,
            messages: {
                success: req.flash('success'),
                error: req.flash('error')
            }
        });
    });

    // Handle file upload
    router.post('/upload', upload.single('resource'), (req, res) => {
        if (req.file) {
            resources.push({ filename: req.file.filename, originalname: req.file.originalname });
            req.flash('success', 'File uploaded successfully!');
        } else {
            req.flash('error', 'File upload failed.');
        }
        res.redirect('/resources');
    });

    // Display flash messages in views
    router.get('/resources', (req, res) => {
        res.render('resourceLibrary', {
            title: 'Resource Library',
            resources,
            messages: {
                success: req.flash('success'),
                error: req.flash('error')
            }
        });
    });

    return router;
};
