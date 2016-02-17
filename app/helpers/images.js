var api = require('gettyimages-api');

var creds = {
  apiKey: process.env.GETTY_API_KEY,
  apiSecret: process.env.GETTY_API_APP_SECRET,
  username: process.env.GETTY_API_USERNAME,
  password: process.env.GETTY_API_PASSWORD
}

var client = new api(creds);

function getImage(search_term, done) {
  client.search().images().withPage(1).withPageSize(1).withPhrase('e30 m3')
    .execute(function (err, res) {
      done(err, JSON.stringify(res.images[0].display_sizes[0].uri))
    });
}

module.exports = getImage;
