const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      title: {
        type: String,
        min: 6,
        max: 20,
        default: 'Student',
      },
      course: {
        type: String,
        min: 6,
        max: 50,
        default: 'Please select a course',
      },
      skills: {
        type: Array,
        default: [],
      },
      about: {
        type: String,
        max: 200,
        default: 'About me...',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
