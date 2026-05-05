const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); 
const User = require('../models/User');
const Game = require('../models/Game');


router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const games = await Game.find({ user: req.user.id }); 
        res.json({ user, games });
    } catch (err) {
        res.status(500).json({ message: 'Server error fetching data' });
    }
});

router.post('/games', protect, async (req, res) => {
    const { title, platform, rank } = req.body;
    try {
        const newGame = new Game({
            user: req.user.id, 
            title,
            platform,
            rank
        });
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (err) {
        res.status(400).json({ message: 'Error: All fields required' });
    }
});

router.delete('/games/:id', protect, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        if (game.user.toString() !== req.user.id) { 
            return res.status(401).json({ message: 'Not authorized' });
        }

        await game.deleteOne();
        res.json({ message: 'Game removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error during deletion' });
    }
});

module.exports = router;
