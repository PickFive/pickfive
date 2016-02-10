'use strict';

module.exports = (model) => {


  //index
  const index = (req, res, next) => {
    model.find({})
      .then(function(lists) {
        res.render('lists/index', { lists: lists })
      }, function(err) {
        return next(err);
      });
  }

  //new
  const newForm = (req, res, next) => {
    var list;
    res.render('lists/new', {list: list});
  }

  //create
  const create = (req, res, next) => {

    model.create({
      title: req.body.title,
      itemOne: req.body.itemOne,
      imageOne: req.body.imageOne,
      itemTwo: req.body.itemTwo,
      imageTwo: req.body.imageTwo,
      itemThree: req.body.itemThree,
      imageThree: req.body.imageThree,
      itemFour: req.body.itemFour,
      imageFour: req.body.imageFour,
      itemFive: req.body.itemFive,
      imageFive: req.body.imageFive,
      image: req.body.image
      })
    .then((newList) => {
      res.redirect('/');
    }).catch((err) => {
      next(err);
    })
  }

  //edit
  const edit = (req, res, next) => {
    model.findById(req.params.id)
    .then((list) => {
      res.render('lists/edit');
    })
  }

  const show = (req, res, next) =>
    model.findById(req.params.id)
      .then((list) => {
        res.render('lists/show');
      }).catch((err) => {
        next(err);
      });

  //update
  const update = (req, res, next) => {
    model.findByAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedList) => {
      res.redirect('lists');
    }).catch((err) => {
      next(err);
    })
  }

  //delete
  const destroy = (req, res, next) => {
    model.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect('lists');
      }).catch((err) => {
        next(err);
      })
  }

  return {
    index: index,
    newForm: newForm,
    create: create,
    edit: edit,
    destroy: destroy,
    update: update,
    show: show
  }
}

