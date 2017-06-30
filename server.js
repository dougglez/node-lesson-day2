const EXPRESS = require('express'),
      BODYPARSER = require('body-parser');

const APP = EXPRESS();
APP.use(BODYPARSER.json());

const USERS = require('./fakeDB/users'),
      MOVIES = require('./fakeDB/movies.json'),
      PORT = 3000;

// Object.keys(obj to check) returns array of names of keys in an object
APP.get('/api/users', function(req, res) {
  let key = Object.keys(req.query)[0];
  if (key) {
    for (let i = 0; i < USERS.length; i++) {
      if (req.query[key].toLowerCase() === USERS[i][key].toString().toLowerCase()) {
        var user = USERS[i];
      }
    }
    res.status(200).send(user);
  } else {
    res.status(200).send(USERS);
  }
});

APP.get('/api/movies', function(req, res) {
  if (Object.keys(req.query)[0]) {
    for (let i = 0; i < MOVIES.length; i++) {
      if (req.query.title.toLowerCase() === MOVIES[i].title.toLowerCase()) {
        var movie = MOVIES[i];
      }
    }
    res.status(200).send(movie);
  } else {
    res.status(200).send(MOVIES);
  }
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