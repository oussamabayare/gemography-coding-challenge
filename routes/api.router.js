const express = require('express');
const Router = express.Router();

const APIController = require('../controller/APIController');
const ROUTES = require('../config/routes').api;

/* GET method to get languages used by the 100 trending public repos on GitHub */
Router.get(ROUTES.repository.trendingLanguages, (req, res, next) => {
    APIController.getLanguagesByRepositories(req, res);
});

module.exports = Router;