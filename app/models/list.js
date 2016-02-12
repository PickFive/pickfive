var mongoose = require('mongoose');

// var comment = new mongoose.Schema({

// });


var listSchema = new mongoose.Schema({
    title:  {type: String, required: true},
    itemOne: String,
    imageOne: String,
    itemTwo: String,
    imageTwo: String,
    itemThree: String,
    imageThree: String,
    itemFour: String,
    imageFour: String,
    itemFive: String,
    imageFive: String,
    category:  String,
    votes: Number,
    image: String,
    comments: [{
      text: String,
      date: Date,
      postedBy: String,
      avatar: String
    }],
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }

});

module.exports = mongoose.model('List', listSchema);
