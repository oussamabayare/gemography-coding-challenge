const https = require('https');
const moment = require('moment');
const dateFormat = require('dateformat');

const API_URL = require('../config/config').api_list.github.url;
const USER_AGENT = require('../config/config').api_list.github.userAgent;

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
 * Function that prepare the actual request
 *
 * @param date
 * @returns {Promise<Object>}
 */
const getLanguagesByRepositoriesRequest = (date) => new Promise((resolve, reject) => {

    // Creating request
    const URL_PATH = "/search/repositories";
    const FULL_URL = `${URL_PATH}?q=created:>${date}&sort=stars&order=desc&page=1&per_page=100`;

    const options = {
        hostname: API_URL,
        path: FULL_URL,
        method: 'GET',
        headers: {
            'User-Agent': USER_AGENT
        }
    };

    const request = https.request(options, (response) => {

        if (response.statusCode === 200) {

            let rawData = '';

            // Adding chunks of data to rawData when it has been received.
            response.on('data', (chunk) => {
                rawData += chunk;
            });

            // The whole response has been received send it back to the main function.
            response.on('end', () => {
                resolve(JSON.parse(rawData).items);
            });
        }
    });
    request.on('error', (err) => {
        console.error(err);
        reject(err);
    });
    request.end();
});

/**
 * Format Raw data received from github to Specified data by Gemography
 *
 * @param data
 * @returns {{}}
 */
const formatDataToRightFormat = (data) => {

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