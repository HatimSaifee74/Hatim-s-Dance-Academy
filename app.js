const express = require('express');
const app = express();

const path = require('path');
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/danceacademycontact', { useNewUrlParser: true });

const contactschema = new mongoose.Schema({


  name: String,
  age: Number,
  number: Number,
  email: String,
  address: String,
  dateOfJoining: String,
  weight: Number,
  height: Number

});
const contact = mongoose.model('contact', contactschema)

app.use('/static', express.static('static'))

app.use(express.urlencoded())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.status(400).render('index.pug');
})
app.get('/contact', (req, res) => {
  const params = {}
  res.status(400).render('contact.pug', params);
})
app.get('/ClassInfo', (req, res) => {
  const params = {}
  res.status(400).render('ClassInfo.pug', params);
})


app.post('/contact', (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(() => {
    res.send("This item has been saved to the database")
  }).catch(() => {
    res.status(400).send("item was not saved to the databse")
  })
})
app.get('/about', (req, res) => {
  const params = {}
  res.status(400).render('about.pug', params);
})
app.listen(port, (req, res) => {
  console.log(`server started at port ${port}`);
})
