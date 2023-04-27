const express = require('express');
const bodyParser = require('body-parser');
const v1Router = require('./src/js/v1/routes/router');
const cors = require('cors');

require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(port, host, () => {
    console.log(`App running on 1337`);
});

app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api/v1/', v1Router);