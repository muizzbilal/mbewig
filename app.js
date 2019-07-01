 // Load Modules
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
// Connect to MongoURI exported from extrenal file
const keys = require('./config/keys');
// Load Models
const User = require('./models/user');
const Post = require('./models/post');
// Link helpers
const {
  ensureAuthentication,
  ensureGuest
} = require('./helpers/auth');

//  inialize applicaion
const app = express();
//Express config
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({ 
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//set global vars for user
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// setup template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
// setup static file to serve css, javascript and images
app.set('view engine', 'handlebars');
//  connect to remote database
app.use(express.static('public'));
// connect to remote database
mongoose.Promise = global.Promise;

mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to remote database.....');
})
.catch((err) => {
    console.log(err);
});
//  set port
const port = process.env.PORT || 3000;

app.get('/', ensureGuest,(req, res) => {
    res.redirect('/website')
});

app.get('/about', (req, res) => {
    res.render('about');
});


app.get('/website', (req, res) => {
  res.render('website',{url:req.url == '/website'});
});

app.get('/fruitslice', (req, res) => {
  res.render('fruitslice');
});

app.get('/mathgame', (req, res) => {
  res.render('math');
});

app.get('/drawingapp', (req, res) => {
  res.render('drawing');
});

app.get('/dicegame', (req, res) => {
  res.render('dicegame');
});

app.get('/simongame', (req, res) => {
  res.render('simongame');
});

app.get('/musicgame', (req, res) => {
  res.render('musicgame');
});

app.get('/findgames', (req, res) => {
  res.render('findgames');
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});