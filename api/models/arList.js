//define how products should look

const mongoose = require('mongoose');

const arList = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  arNum: {type: Number},
});

module.exports = mongoose.model('ARlist', arList);