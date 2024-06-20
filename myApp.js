let express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
let app = express();

// Define the logger middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
};

app.use(loggerMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware function to add current time to request object
const addTimeMiddleware = (req, res, next) => {
    req.time = new Date().toString();
    next();
};

// Route that chains the middleware function and the final handler
app.get('/now', addTimeMiddleware, (req, res) => {
    res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
    const word = req.params.word;
    res.json({ echo: word });
});

app.use(express.static(__dirname + "/public"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
    var response = "Hello json".toUpperCase(); // now becomes "HELLO WORLD"

    if (process.env.MESSAGE_STYLE === "uppercase") {
        response = "Hello json".toUpperCase();
    } else {
        response = "Hello json";
    }

    res.json({
        message: response
    });
});

// Route that handles GET requests with first and last name query parameters
app.get('/name', (req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    res.json({ name: `${firstName} ${lastName}` });
});

app.post('/name', (req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({ name: `${firstName} ${lastName}` });
});









































module.exports = app;
