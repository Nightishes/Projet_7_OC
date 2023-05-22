const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book')
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.route('/')
  .get(bookController.getAllBooks)
  .post(auth, multer, bookController.createBook);

router.get('/bestrating', bookController.bestRatedBooks)

router.route('/:id')
      .get(bookController.getOneBook)
      .put(auth, multer, bookController.updateOneBook)
      .delete(auth, bookController.deleteOneBook)

 
router.post('/:id/rating', auth, bookController.updateRatings);



module.exports = router