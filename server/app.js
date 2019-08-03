const bodyParser = require('body-parser');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());

app.get('/api/hotdogs', function (req, res) {
    let json = JSON.parse(fs.readFileSync('data.json'));
    console.log(1, json);
    res.json(json.data);
});

app.use(express.static('public'));


app.listen(process.env.PORT, function () {
    console.log('listen port ' + process.env.PORT)
});

