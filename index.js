const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const cors = require('cors');


const app = express();

var options = {
  origin: '*'
};
app.use(cors(options));


//Set Up the Assets Folder
app.use(express.static(path.join(__dirname, 'public')));

// Passport Config
// require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Db Connection from .env file
// const db = process.env.MONGO_URI;

// Connect to MongoDB
console.log("try to con")
if (db == 'mongodb://localhost:27017/') {
    mongoose
      .connect(
        db,
        { useNewUrlParser: true }
      )
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
}

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/index.js'));
app.use('/api', require('./api/api'));


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));