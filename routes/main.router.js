const express = require('express');
const router = express.Router();
const MainController = require('../controller/MainController');

/* GET home page. */
router.get('/', function (req, res, next) {
    MainController.indexAction(req, res);
});

module.exports = router;
