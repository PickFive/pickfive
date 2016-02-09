'use strict';

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
      votes: 0
    }
    res.render('lists/new', {list: list});
  }

  //create
  const create = (req, res, next) => {
    model.save(req.body)
    .then((newList) => {
      res.redirect('lists');
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

