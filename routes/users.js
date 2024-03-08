const express = require('express');
const router = express.Router();

const users = {
    victoria: {
        email: 'victoria@example.com',
        password: '12345',
        school: 'Lighthouse Labs'
    },
    rylan: {
        email: 'rylan@example.com',
        password: '12345',
        school: 'Lighthouse Labs'
    }
};

/**
 * INDEX - Show all users!
 * GET /api/users/
 */
router.get('/', (req, res) => {
    res.status(200).json(users);
});

/**
 * SAVE - Add new user to DB!
 * POST /api/users/
 */
router.post('/', (req, res) => {
    console.log(req.body);

    const { username, email, password, school } = req.body;

    users[username] = {
        email,
        password,
        school
    };

    res.status(200).json({status: 'OK'});
});

module.exports = router;
