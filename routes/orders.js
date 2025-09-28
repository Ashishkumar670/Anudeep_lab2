const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');
const auth = require('../utils/authMiddleware');

router.post('/', auth, ctrl.place);
router.get('/mine', auth, ctrl.listForUser);

module.exports = router;