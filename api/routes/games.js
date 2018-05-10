const express = require('express');
const router = express.Router();

const checkAuth = require('../auth_middleware/check_auth');
const gamesController = require('../controllers/games');


router.get('/:gamesDate', productController.get_all_games);

router.get('/:gameId', productController.get_games)

module.exports = router;
