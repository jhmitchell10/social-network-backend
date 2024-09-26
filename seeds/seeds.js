const mongoose = require('mongoose');
const User = require('./models/user');
const Thought = require('./models/thought');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userData = [
  {
    username: 'john_doe',
    email: 'john_doe@example.com',
  },
  {
    username: 'jane_smith',
    email: 'jane_smith@example.com',
  },
  {
    username: 'alice_wonder',
    email: 'alice@example.com',
  },
];

const thoughtData = [
  {
    thoughtText: "This is my first thought!",
    username: "john_doe",
  },
  {
    thoughtText: "Here's another thought!",
    username: "jane_smith",
  },
  {
    thoughtText: "Thoughts are powerful!",
    username: "alice_wonder",
  },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    
    const users = await User.insertMany(userData);
    const thoughtsWithUserId = thoughtData.map((thought) => ({
      ...thought,
      userId: users.find(user => user.username === thought.username)._id,
    }));
    
    await Thought.insertMany(thoughtsWithUserId);
    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
