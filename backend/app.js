const express = require('express');
const mongoose = require('mongoose');
const books = require('./routes/books');
const authentication = require('./routes/users');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://qbathany:oQIsdlLzU1YsiTG8@cluster0.i1fenpo.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.use ('/api/books', books)
app.use ('/api/auth', authentication)
app.use('/images', express.static(path.join(__dirname, 'images')));


  
module.exports = app;