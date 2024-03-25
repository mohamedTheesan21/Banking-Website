const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: String,
  sender: String,
  content: String,
  unread: String,
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0], // Function returning default value
  },
  time: {
    type: String,
    default: () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${hours}.${minutes}.${seconds}`;
    },
  },
});

module.exports = mongoose.model('Message', messageSchema);
