const { User, Thought } = require("../models");

module.exports = {
  // get all thoughts
  async grabThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (error) {
        console.log(error);
      res.status(500).json(error);
    }
  },
  // get single thought
  async grabAThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "Non-existent Thought" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // post new thought
  async newThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought made, but No Free-Thinker" });
      }

      res.json({ message: "New Thought Exists" });
    } catch (error) {
      console.error(error);
    }
  },
  // put updated thought
  async changedThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // delete thought
  async lostThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // add Reaction
  async newReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }
      res.json(thought);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  // delete reaction
  async byeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
