import mongoose from 'mongoose';
import { userData } from './data';


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  const seedDatabase = async () => {
    try {
      // Clear existing data
      await User.deleteMany({});
  
      // Seed the database with user data
      await User.insertMany(userData);
  
      console.log('Database seeded');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };
  
  // Call the seedDatabase function inside connectDB
  const connectDB = async () => {
    // Connect to MongoDB
  
    // ...
  
    // Seed the database
    await seedDatabase();
  };
  
};

const { Schema } = mongoose;

const tweetSchema = new Schema({
  id: Number,
  text: String,
  timestamp: Date,
  likes_count: Number,
  retweets_count: Number,
  comments: [
    {
      id: Number,
      text: String,
      timestamp: Date,
    },
  ],
});

const bioSchema = new Schema({
  text: String,
  view: Number,
});

const menuItemSchema = new Schema({
  label: String,
  content: [
    {
      text: String,
      replies: [
        {
          text: String,
        },
      ],
      likes_count: Number,
      retweets_count: Number,
    },
  ],
});

const userSchema = new Schema({
  id: Number,
  username: String,
  name: String,
  followers_count: Number,
  following_count: Number,
  image: String,
  tweets: [tweetSchema],
  bio: [bioSchema],
  tweetContent: String,
  repliesContent: String,
  mediaContent: String,
  likesContent: String,
  menuItems: [menuItemSchema],
});

const User = mongoose.model('User', userSchema);

export default connectDB;

