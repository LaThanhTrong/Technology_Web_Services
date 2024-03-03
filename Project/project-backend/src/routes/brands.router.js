const express = require('express');
const brandsController = require('../controllers/brands.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

router
    .route('/')
    .get(brandsController.getManyBrands)
    .all(methodNotAllowed);

router
    .route('/name/:name')
    .get(brandsController.getBrandsByName)
    .all(methodNotAllowed);

router
    .route('/id/:id')
    .get(brandsController.getBrandsById)
    .all(methodNotAllowed);

module.exports = router;