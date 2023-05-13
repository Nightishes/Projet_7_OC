const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.route('/')
  .get(bookController.getAllBooks)
  .post(auth, multer, bookController.createBook);

  router.route('/:id')
        .get(auth, bookController.getOneBook)
        .put(auth, multer, bookController.updateOneBook)
        .delete(auth, bookController.deleteOneBook)
  
  router.post('/:id/rating', (req, res) => {
    console.log(req.body);
    res.status(200).json({
      message: 'Requête reçue'
    });
  });

  router.get('/bestrating', (req, res) => {
    console.log(req.body)
    const bestBooks = {}
    res.status(200).json(bestBooks);
  })

  module.exports = router