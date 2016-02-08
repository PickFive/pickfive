var mongoose = require('mongoose');

var comment = new mongoose.Schema({
    date: Date,
    body: String
});

var listItem = new mongoose.Schema({
    item: String,
    img: String
});

var listSchema = new mongoose.Schema({
    title: String,
    listItems: [listItem],
    catagory: String,
    votes: Number,
    comments: [comment]
});
