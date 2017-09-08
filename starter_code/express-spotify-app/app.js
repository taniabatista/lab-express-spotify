/*jshint esversion: 6 */
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Remember to paste here your credentials
const clientId = '7315b8866fa24a9a90f5f713cb5dfa8e',
    clientSecret = '1fe2f21b444944ea992f5dba8ce2419f';
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

/* New */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layouts', 'layouts/main-layout');
app.use(expressLayouts);
app.use(express.static('public'));



/* Basic Index Route that renders the home page */
app.get("/", (req, res, next) => {
  const data = {
    foo: "bar"
  };
// send views/index.ejs for displaying in the browser
   res.render('index', data);
 });


/* RETRIEVE RANDOM CHUCK JOKE */
 // app.get("/random", (request, response, next) => {
 // client.getRandomJoke()
 //   .then((joke) => {
 //     // use the response here
 //     response.send("<p>" + joke.value + "</p>");
 //   }).catch((err) => {
 //     throw err;
 //     // handle error
 //   });
 //     });

 /* ROUTE: ARTISTS */
app.get("/artists", (request, response, next) => {
  client.getArtistCategories()
    .then((artists)=>  {
  const data = {
    artists: artists
  };

/* RESPONSE: ARTISTS */
response.render('artists', data);
  }) .catch((err)=> {
    throw err;
    // handle error
  });
});

app.listen(4000, () => console.log("Running"));
