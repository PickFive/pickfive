'use strict';

let getImage = require('../helpers/images');
let express = require('express');
let router = express.Router();

const image = (req, res, next) => {
  console.log(req.query);
  getImage(req.query.image, function (err, uri) {
    if (err) {
      console.log(err);
    }

    res.json(JSON.parse(uri));
  });
}

router.get('/', image);

module.exports = router;
