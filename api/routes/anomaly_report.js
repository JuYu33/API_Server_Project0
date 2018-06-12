const express = require('express');
const router = express.Router();

const checkAuth = require('../auth_middleware/check_auth');
const arController = require('../controllers/anomaly_report');

router.post('/save', arController.save_ar);

// router.post('/first', arController.post_ar);

router.get('/', arController.get_all_ar);

router.delete('/:arID', arController.delete_ar);


module.exports = router;
