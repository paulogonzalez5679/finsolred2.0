var express = require('express');
var controller = require('../controllers/controller');

var router = express.Router();

/* GET home page. */
router.get('/', controller.index);

/* GET home page. */
router.get('/generic', controller.generic);

/* GET home page. */
router.get('/elements', controller.elements);

/* Send email form. */
router.post('/post', controller.send_email);

module.exports = router;