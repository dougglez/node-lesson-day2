const EXPRESS = require('express'),
      BODYPARSER = require('body-parser');

const APP = EXPRESS();
APP.use(BODYPARSER.json());

const USERS = require('./fakeDB/users'),
      MOVIES = require('./fakeDB/movies.json'),
      PORT = 3000;


APP.get('/api/users', function(request, response) {
  response.status(200).send(USERS);
});

APP.get('/api/movies', function(request, response) {
  response.status(200).send(MOVIES);
});

//get with params
APP.get('/api/users/:fave', function(req, res) {
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].favAnimal.toLowerCase() === req.params.fave.toLowerCase()) {
      var user = USERS[i];
    }
  }
  res.status(200).send(user);
});

APP.get('/api/movies/:title', function(req, res) {
  for (let i = 0; i < MOVIES.length; i++) {
    if (MOVIES[i].title.toLowerCase() === req.params.title.toLowerCase()) {
      var movie = MOVIES[i];
    }
  }
  res.status(200).send(movie);
});



//get with query
APP.get('/api/users/q', function(req, res) {

});
APP.get('/api/movies/q', function(req, res) {

});



// post can add data
APP.post('/api/users',function(req, res) {
  USERS.push(req.body);
  res.status(200).send('Whoa, that was awesome! 👍');
});

APP.post('/api/movies', function(req, res) {
  MOVIES.push(req.body);
  res.status(200).send('You did it!! 👍');
})
// or retrieve data
APP.post('/api/getoneuser', function(req, res) {
  let user = USERS.filter(v => {
    if (v.name === req.body.name) {
      return v;
    }
  })
  res.status(200).send(user);
});

APP.put('/api/users/:id', function(req, res) {
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].id == req.params.id) {
      USERS[i] = req.body;
    }
  }
  res.status(200).send('User Updated Successfully 👨‍💻', USERS)
});

APP.delete('/api/users/:id', function(req, res) {
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].id == req.params.id) {
      USERS.splice(i, 1);
    }
  }
  res.status(200).send(USERS);
});








APP.listen(PORT, function() {
  console.log(`App listening on ${PORT}`)
});