const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async findThinkers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // get single user
    async whichThinker(req, res) {
        try {
            const user = await User.findOne({ _id: req.params. });

            if (!user) {
                return res.status(404).json({ message: 'No Free Thinker Located' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // post new user
    async newFreeThinker(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // put udpated user
    async changedThinker(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params. },
                { $set: req.body },
                { runValidators: true, new: true }
                );
            if (!user) {
                return res.status(404).json({ message: 'No Free Thinker Located' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // delete user, bonus: remove associated thoughts
    async lostThinker(req, res) {
        try {
            const user = await User.deleteOne({ _id: req.params. });
            if (!user) {
                return res.status(404).json({ message: 'No Free Thinker Located' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts }});
            res.json({ message: 'Thinker and thoughts drifted away...' });
        } catch (error) {
            res.status(500).json(error);
        }
    }
};