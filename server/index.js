require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
require('express-async-errors');
const bodyParser = require('body-parser');

const cors = require('./middleware/cors');

const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// use static file
app.use('/', express.static(path.join(__dirname, '/public')));

// use cors
app.use(cors);

app.get('/', (req, res) => {
    res.json({ username: 'tranquoctrung' });
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
