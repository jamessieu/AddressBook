require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const addressBook = require('./controllers/eventController');
const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}, () => console.log('connnected to database'));

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'./../client')));

// app.get('/', 
//   cookieController.setCookie, (req, res) => {
//     res.render('./../client/signup');
//   }
app.get('/', 
  (req, res) => res.sendFile(path.join(__dirname + './../client/index.html')));

// app.post('/addPeople', addressBook.addPeople, (req, res) => console.log('person added!'));
app.post('/addPerson', 
  addressBook.AddPerson, 
  (req, res) => res.redirect('/'));

app.post('/deletePerson', 
  addressBook.DeletePerson, 
  (req, res) => res.redirect('/'));

app.get('/updatePerson', 
  addressBook.FindPerson),
  (req, res) => res.redirect('/');
  // addressBook.updatePerson,
  // addressBook.GetList, 
  // (req, res) => res.redirect('/'));

app.get('/getList',
  addressBook.GetList);





app.listen(3000, ()=> console.log('connected to port 3000'));

module.exports = app;