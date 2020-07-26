const https = require('https');

const moment = require('moment');
const dateFormat = require('dateformat');
const Axios = require('axios');

const API_URL = require('../config/config').api_list.github.BaseUrl;

/**
 * Function that returns the languages used by the first 100 trending public repos on GitHub
 *
 * @param req
 * @param res
 */
exports.getTrendingLanguages = (req, res) => {

    // Get the date from the request object
    const date = req.query.date || req.body.date || dateFormat(new Date(), "yyyy-mm-dd");

    // Check if date is valid
    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
        res.json({
            Error: "Invalid date please respect this format : yyyy-mm-dd"
        });
    } else {
        // Calling Github API to get data and waiting until all data is retrieved
        getLanguagesByRepositoriesRequest(date)
            .then((data) => {
                res.json(formatDataToRightFormat(data));
            })
            .catch((error) => {
                res.json({
                    error: error
                });
            });
    }
};

/**
 * API call from Github Endpoint using https
 *
 * @param date
 * @returns {Promise<Object>}
 */
const getLanguagesByRepositoriesRequest = (date) => new Promise((resolve, reject) => {

    // Creating request
    const API_call = Axios.create({
        baseURL: API_URL,
        httpsAgent: new https.Agent({ keepAlive: true })
    });

    const URL_PATH = "/search/repositories";

    API_call.get(URL_PATH, {
        params: {
            q: `created:>${date}`,
            sort: "stars",
            order: "desc",
            page: 1,
            per_page: 100
        }
    }).then(result => {
        resolve(result.data.items);
    }).catch(err => {
        console.error(err);
        reject(err);
    });
});

/**
 * Format Raw data received from github to Specified data by Gemography
 *
 * @param data
 * @returns {{}}
 */
const formatDataToRightFormat = data => {

    let formattedData = {};

    data.forEach((row) => {
        if (row.language === null)
            row.language = 'not specified';

        if (formattedData[row.language] === undefined) {
            formattedData[row.language] = {};
            formattedData[row.language].count = 1;
            formattedData[row.language].repositories = [row.full_name];
        } else {
            formattedData[row.language].count += 1;
            formattedData[row.language].repositories.push(row.full_name);
        }
    });

    return formattedData;
};