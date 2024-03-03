const express = require('express');
const shoesController = require('../controllers/shoes.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

router
    .route('/')
    .get(shoesController.getShoesByFilter)
    .post(upload.single('file'), shoesController.createShoe)
    .delete(shoesController.deleteAllShoes)
    .all(methodNotAllowed);

router
    .route('/:id')
    .get(shoesController.getShoeById)
    .put(shoesController.updateShoeById)
    .delete(shoesController.deleteShoeById)
    .all(methodNotAllowed);

module.exports = router;