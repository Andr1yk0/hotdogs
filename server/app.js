const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Hotdog = require('./hotdog');
const Message = require('./message');
const {check, validationResult} = require('express-validator');
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile('public/ng/index.html', {root: __dirname});
});

app.get('/api/messages', (req, res) => {
  res.json(Message.all())
});

app.get('/api/hotdogs', (req, res) => {
  res.json(Hotdog.all())
});

app.patch('/api/hotdogs/:id', [check('title').not().isEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  Hotdog.update(+req.params.id, req.body);
  res.json(Hotdog.all())
});

app.post('/api/hotdogs', [check('title').not().isEmpty()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  Hotdog.create(req.body);
  res.json(Hotdog.all())
});

app.delete('/api/hotdogs/:id', (req, res) => {
  Hotdog.delete(+req.params.id);
  res.json(Hotdog.all());
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});

