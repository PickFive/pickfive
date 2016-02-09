var express = require('express');
var router = express.Router();
var List = require('../models/list');

module.exports = (model) => {


  //index
  const index = (req, res, next) => {
    model.find({})
      .then(function(list) {
        res.render('lists/index', { list: list });
      }, function(err) {
        return next(err);
      });
  }

  //new
  const newForm = (req, res, next) => {
    var list = {
      title: '',
      listItems: [],
      catagory: '',
      votes: 0,
    }
    res.render('lists/new', {list: list});
  }

  return {
    index: index,
    newForm: newForm
  }
}

//create
router.post('/', function(req, res, next) {
  var list = new List({
    title: req.body.title,
    listItems: [],
    catagory: req.body.catagory
  });

  list.save()
    .then(function(saved) {
      res.redirect('/lists');
    }, function(err) {
      return next(err);
    });
});

//edit
router.get('/:id/edit', function(req, res, next) {
  List.findById(req.params.id)
    .then(function(list) {
      res.render('lists/edit', { list: list });
    }, function(err) {
      return next(err);
    });
});

//update
router.put('/:id', function(req, res, next) {
  List.findById(req.params.id)
    .then(function(list) {
      list.title = req.body.title;
      list.listItems = [];
      list.catagory = req.body.catagory;
      return list.save();
    })
    .then(function(saved) {
      res.redirect('/lists');
    }, function(err) {
      return next(err);
    });
});

//delete
router.delete('/:id', function(req, res, next) {
  List.findByIdAndRemove(req.params.id)
    .then(function() {
      res.redirect('/lists');
    }, function(err) {
      return next(err);
    });
});

//m odule.exports = router;
