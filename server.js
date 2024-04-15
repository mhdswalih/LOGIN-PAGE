const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const nocache = require('nocache');

const router = require('./router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Load static assets
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your_secret_here', 
    resave: false,
    saveUninitialized: true
}));
app.use(nocache());

app.use('/route', router);

// Home route
app.get("/", (req, res) => {
    if(!req.session.user){
        res.render('base', { title: "Login System" });
    }
    else{
        res.redirect('/route/home');
    }
});

app.listen(5000, () => {
    console.log("Listening to the server on http://localhost:5000");
});
