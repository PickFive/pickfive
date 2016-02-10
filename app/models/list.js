var mongoose = require('mongoose');

var comment = new mongoose.Schema({
    date: { Date },
    body: { String },
    owner: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }]
});


var listSchema = new mongoose.Schema({
    title:  String,
    itemOne: String,
    itemTwo: String,
    itemThree: String,
    itemFour: String,
    itemFive: String,
    catagory:  String,
    votes: Number,
    image: String,
    comments: [comment],
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }

});

module.exports = mongoose.model('List', listSchema);
