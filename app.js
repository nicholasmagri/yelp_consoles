// ***************
// IMPORTS
// ***************

// NPM imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

// Config Import
try {
	var config = require('./config');
} catch (e) {
	console.log("Could not import config. This probably means you're not working locally.");
	console.log(e);
}

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

// Body Parser config
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose Config
try{
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
} catch (e) {
	console.log("Could not connect using config. This probably means you're not working locally");
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
}

mongoose.Promise = global.Promise;

// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));

// Express Session Config
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}))

// Method Override Config
app.use(methodOverride('_method'));

// Connect Flash, put before passport if not you will get an error
app.use(flash());

// PassPort Config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// State Config
app.use((req, res, next) => {
	res.locals.user = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
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
app.listen(process.env.PORT || 3000, () => {
	console.log("yelp_console is working...");
});