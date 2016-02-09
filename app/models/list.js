var mongoose = require('mongoose');

var comment = new mongoose.Schema({
    date: { Date },
    body: { String },
    owner: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
});

var listItem = new mongoose.Schema({
    item: { String },
    img: { String }
});

var listSchema = new mongoose.Schema({
    title: { String },
    listItems:  [listItem],
    catagory: { String },
    votes: { Number },
    comments: [comment],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }

});

module.exports = mongoose.model('List', listSchema);
