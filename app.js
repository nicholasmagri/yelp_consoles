// ***************
// IMPORTS
// ***************

// NPM imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Import
const config = require('./config');

// Route import
const consoleRoutes = require('./routes/consoles');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const authRoutes = require("./routes/auth");

// Model Imports
const Consoless = require('./models/console');
const Comment = require('./models/comment');
const User = require('./models/user');

// ***************
// DEVELOPMENT
// ***************
// Morgan
app.use(morgan('tiny'));

// Seed the DB
//const seed = require('./utils/seed');
// seed();

// ***************
// DEVELOPMENT
// ***************
// Connect to DB
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

// Express Session Config
app.use(expressSession({
	secret: "qwertyuioplkjhgfdsamnbvcxz",
	resave: false,
	saveUninitialized: false
}))

// Body Parser config
app.use(bodyParser.urlencoded({extended: true}));

// Method Override Config
app.use(methodOverride('_method'));

// PassPort Config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// Current User Middleware Config
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
})


// Route config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/consoles", consoleRoutes);
app.use("/consoles/:id/comments", commentRoutes);


// ***************
// LISTEN
// ***************
app.listen(3000, () => {
	console.log("yelp_console is working...");
});

