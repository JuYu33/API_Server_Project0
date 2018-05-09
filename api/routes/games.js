const express = require('express');
const router = express.Router();

const checkAuth = require('../auth_middleware/check_auth');
const gamesController = require('../controllers/games');


router.get('/:gameId', productController.get_game);

module.exports = router;
