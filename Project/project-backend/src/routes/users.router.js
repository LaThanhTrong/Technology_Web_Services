const express = require('express');
const usersController = require('../controllers/users.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

router
    .route('/')
    .get(usersController.getUser)
    .all(methodNotAllowed);

router
    .route('/logout')
    .get(usersController.logout)
    .all(methodNotAllowed);

router
    .route('/session')
    .get(usersController.getSession)
    .all(methodNotAllowed);

module.exports = router;