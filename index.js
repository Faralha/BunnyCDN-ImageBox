const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
var session = require('express-session');
const bodyParser = require('body-parser');

const { initWebRoutes } = require('./routes/index');


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
    }
}))

initWebRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});