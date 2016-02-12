var api = require('gettyimages-api');

var creds = {
  apiKey: 'a3ggc2uuvnn5azhgasqj2y6c',
  apiSecret: 'VECCHBfCjafHxzHEUKE8pCRS4jpMvaGtdP6JTzkUQdMcz',
  username: 'd2xdy2',
  password: 'bmwUSA3433'
}

var client = new api(creds);

function getImage(search_term, done) {
  client.search().images().withPage(1).withPageSize(1).withPhrase('e30 m3')
    .execute(function (err, res) {
      done(err, JSON.stringify(res.images[0].display_sizes[0].uri))
    });
}

module.exports = getImage;
