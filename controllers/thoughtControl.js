const { User , Thought } = require('../models');

module.exports = {
    async grabThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async grabAThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params. });
            if (!thought) {
                return res.status(404).json({ message: 'Non-existent Thought'});
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async newThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {},
                {},
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Thought made, but No Free-Thinker'})
            }
            res.json({ message: 'New Thought Exists' })
        } catch (error) {
            console.error(error);
        }
    },
};