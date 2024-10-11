const express = require('express');

module.exports = (groups) => {
    const router = express.Router();

    // Display study sessions
    router.get('/', (req, res) => {
        res.render('studySessions', { 
            title: 'Study Sessions', 
            groups,
            successMessage: req.flash('success') // Pass success message
        });
    });

    // Create a new group
    router.post('/create-group', (req, res) => {
        const { groupName, groupDescription } = req.body;
        if (!groups.find(group => group.name === groupName)) {
            groups.push({ name: groupName, description: groupDescription, members: [] });
            req.flash('success', 'Group created successfully!');
        }
        res.redirect('/sessions');
    });

    // Join a group
    router.post('/join-group', (req, res) => {
        const { userName, groupName } = req.body;
        const group = groups.find(group => group.name === groupName);
        if (group && !group.members.includes(userName)) {
            group.members.push(userName);
            req.flash('success', 'You have successfully joined the group!');
        }
        res.redirect('/sessions');
    });

    return router;
};
