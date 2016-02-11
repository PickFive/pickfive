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
      image: req.body.image,
      category: req.body.category,
      owner: req.user
      })
    .then((newList) => {
      res.redirect('/lists');
    }).catch((err) => {
      next(err);
    })
  }

  //edit
  const edit = (req, res, next) => {
    model.findById(req.params.id)
    .then((list) => {
      res.render('lists/edit', {list: list});
    })
  }

  const show = (req, res, next) =>
    model.findById(req.params.id)
      .then((list) => {
        res.render('lists/show', {list: list});
      }).catch((err) => {
        next(err);
      });

  //update
  const update = (req, res, next) => {
    model.findById(req.params.id)
    .then(function(list) {
      list.title = req.body.title,
      list.itemOne = req.body.itemOne,
      list.itemTwo = req.body.itemTwo,
      list.itemThree = req.body.itemThree,
      list.itemFour = req.body.itemFour,
      list.itemFive = req.body.itemFive
      return list.save()
    }).then(function(saved) {
      res.redirect('/lists');
    })
      .catch((err) => {
      next(err);
    })
  }

  //delete
  const destroy = (req, res, next) => {
    model.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect('/lists');
      }).catch((err) => {
        next(err);
      })
  }

  const createComment = (req, res, next) => {
    model.findById(req.params.id)
    .then(function(list) {
      list.comments.push({text: req.body.commentsText, postedBy: req.user.local.username})
      console.log('trying to save comment')
      return list.save()
    }).then(function(saved) {
      res.redirect('/lists')
    })

  }

  return {
    index: index,
    newForm: newForm,
    create: create,
    edit: edit,
    destroy: destroy,
    update: update,
    show: show,
    createComment: createComment
  }
}

