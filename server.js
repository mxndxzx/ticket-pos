const express = require('express');
const bodyParser = require('body-parser');
const v1Router = require('./src/js/v1/routes/router');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(1337, () => {
    console.log('App running on localhost:1337')
});

app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api/v1/', v1Router);