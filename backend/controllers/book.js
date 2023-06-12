<<<<<<< HEAD
const {error} = require('console');
const Book = require('../models/book');
const fs = require('fs');


exports.getAllBooks = (req, res) =>{
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
  }

exports.createBook = (req, res, next) =>{
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
    const book = new Book({
      ...req.body,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      title: bookObject.title,
      author : bookObject.author,
      year: bookObject.year,
      genre: bookObject.genre,
      ratings: bookObject.ratings,
      averageRating : bookObject.ratings[0].grade
    });
    
    book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.getOneBook = (req, res, next) =>{
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
  }

exports.updateOneBook = (req, res, next) =>{
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  {   ...req.body
  };
  
delete bookObject._userId;
Book.findOne({_id: req.params.id})
    .then((book) => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
        } else {
            Book.updateOne({ _id: req.params.id},
            { ...bookObject, _id: req.params.id })
            .then(() => res.status(200).json({message : 'Objet modifié!'}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  }


exports.deleteOneBook = (req, res, next) =>{
  Book.findOne({ _id: req.params.id})
  .then(book => {
      if (book.userId != req.auth.userId) {
          res.status(403).json({message: 'Not authorized'});
      } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
  }


exports.updateRatings = (req, res) =>{
  Book.findOne({ _id: req.params.id})
    .then(book=>{
      book.ratings.push({userId: req.auth.userId, grade: req.body.rating})  
      let totalRating = 0;
      for (let i = 0; i < book.ratings.length; i++){
       let currentRating = book.ratings[i].grade;
       totalRating += currentRating;
      }
      book.averageRating = totalRating / book.ratings.length;
      
      return book.save()
    })
    .then(book => {
      console.log(book)
      res.status(201).json(book);
    })
    .catch(error => res.status(500).json({error}))
  }

exports.bestRatedBooks = (req, res) =>{
  Book.find().sort({averageRating: -1}).limit(3)
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({error}));
=======
const {error} = require('console');
const Book = require('../models/book');
const fs = require('fs');


exports.getAllBooks = (req, res) =>{
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
  }

exports.createBook = (req, res, next) =>{
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject._userId;
    const book = new Book({
      ...req.body,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      title: bookObject.title,
      author : bookObject.author,
      year: bookObject.year,
      genre: bookObject.genre,
      ratings: bookObject.ratings,
      averageRating : bookObject.ratings[0].grade
    });
    book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.getOneBook = (req, res, next) =>{
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
  }

exports.updateOneBook = (req, res, next) =>{
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  {   ...req.body
  };
delete bookObject._userId;
Book.findOne({_id: req.params.id})
    .then((book) => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
        } else {
            Book.updateOne({ _id: req.params.id},
            { ...bookObject, _id: req.params.id })
            .then(() => res.status(200).json({message : 'Objet modifié!'}))
            .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  }


exports.deleteOneBook = (req, res, next) =>{
  Book.findOne({ _id: req.params.id})
  .then(book => {
      if (book.userId != req.auth.userId) {
          res.status(403).json({message: 'Not authorized'});
      } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
  }


exports.updateRatings = (req, res) =>{
  Book.findOne({ _id: req.params.id})
    .then(book=>{
      book.ratings.push({userId: req.auth.userId, grade: req.body.rating})  
      let totalRating = 0;
      for (let i = 0; i < book.ratings.length; i++){
       let currentRating = book.ratings[i].grade;
       totalRating += currentRating;
      }
      book.averageRating = totalRating / book.ratings.length;
      // book.save()
      return book.save()
    })
    .then(book => {
      console.log(book)
      res.status(201).json(book);
    })
    .catch(error => res.status(500).json({error}))
  }

exports.bestRatedBooks = (req, res) =>{
  Book.find().sort({averageRating: -1}).limit(3)
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({error}));
>>>>>>> a7e0862f0e4f45424d2bd7e8a704f2a63e367bc8
}