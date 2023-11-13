const { User } = require('../models');

module.exports = {
    async findThinkers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    },
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
    async newFreeThinker(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (error) {
            res.status(500).json(error);
        }
    },
};