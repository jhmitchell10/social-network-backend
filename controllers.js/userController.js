const User = require('../models/user');

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getUserById(req, res) {
    User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then(() => res.json({ message: 'User deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
