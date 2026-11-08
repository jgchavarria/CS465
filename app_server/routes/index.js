var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/rooms', ctrlMain.rooms);
router.get('/meals', ctrlMain.meals);
router.get('/news', ctrlMain.news);
router.get('/about', ctrlMain.about);
router.get('/contact', ctrlMain.contact);

module.exports = router;
