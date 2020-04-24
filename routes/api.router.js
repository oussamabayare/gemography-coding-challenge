const express = require('express');
const router = express.Router();
const APIController = require('../controller/APIController');

/* GET method to get languages used by the 100 trending public repos on GitHub */
router.get('/repository/trending-lang', function (req, res, next) {
    APIController.getLanguagesByRepositories(req, res);
});

/* POST method to get languages used by the 100 trending public repos on GitHub */
router.post('/repository/trending-lang', function (req, res, next) {
    APIController.getLanguagesByRepositories(req, res);
});

module.exports = router;
