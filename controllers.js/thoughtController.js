const Thought = require('../models/thought');
const User = require('../models/user');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then(() => res.json({ message: 'Thought deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};
