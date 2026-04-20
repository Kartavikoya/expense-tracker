const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kartavimehta_db_user:waY65fXkGc2hnL0s@cluster0.tqg2e09.mongodb.net/expense-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;