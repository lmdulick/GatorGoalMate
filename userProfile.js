const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // Add other fields as necessary
});

module.exports = UserProfile = mongoose.model('userProfiles', UserProfileSchema);
