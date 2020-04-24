const gitRepository = require('../modules/gitRepository');

exports.getLanguagesByRepositories = (req, res) => {

    // In this Controller we can add a layer of security where we can check licence or role ...
    gitRepository.getTrendingLanguages(req, res);
};