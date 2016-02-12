'use strict';

module.exports = (model) => {
  /**
   * Stores the lowercased name of the current model
   *
   * Used for retrieving template files
   */
  const modelName = model.modelName.toLowerCase() + 's';

  /**
   * @verb:   GET
   * @method: index
   *
   * Renders a list of all users
   */
  const index = (req, res, next) =>
    model.find()
      .then((docs) => {
        console.log(modelName);
        res.send('index');
      }).catch((err) => {
        next(err);
      });

  /**
   * @verb:   GET
   * @method: show
   *
   * Renders a page for a single user
   */
  const show = (req, res, next) =>
    model.findById(req.params.id)
      .then((doc) => {
        res.render('users/show')
      }).catch((err) => {
        next(err);
      });

  /**
   * @verb:   GET
   * @method: new
   *
   * Renders a form for creation of a new user
   */
  const newForm = (req, res, next) =>
    // should return a form with blank fields
    res.json({email: '', password: ''});

  /**
   * @verb:   POST
   * @method: create
   *
   * Creates and stores a new user
   */
  const create = (req, res, next) =>
    model.save(req.body)
      .then((newUser) => {
        res.json(newUser)
      }).catch((err) => {
        next(err);
      });

  /**
   * @verb:   GET
   * @method: edit
   *
   * Renders a form for editing an existing user
   */
  const edit = (req, res, next) =>
    model.findById(req.params.id)
      .then((user) => {
        // should return form with fields
        // already populated
        res.render('users/edit');
      }).catch((err) => {
        next(err);
      });

  /**
   * @verb:   PUT
   * @method: update
   *
   * Updates an existing user
   */
  const update = (req, res, next) =>
    model.findById(req.params.id)
      .then(function(user) {
        if(req.body.password) {
          user.local.password = user.encrypt(req.body.password)
        }
        if(model.count({username: req.body.username})) {

        }
        else {
          user.local.username = req.body.username
        }
        user.category = req.body.category
        return user.save()
      }).then(function(saved) {
        res.redirect('/')
      })
      .catch((err) => {
        next(err);
      });

  /**
   * @verb:   DELETE
   * @method: destroy
   *
   * Removes a user
   */
  const destroy = (req, res, next) =>
    model.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({destroyed: true});
      }).catch((err) => {
        next(err);
      });

  /**
   * external API
   */
  return {
    index:    index,
    show:     show,
    newForm:  newForm,
    create:   create,
    edit:     edit,
    update:   update,
    destroy:  destroy
  }
}
