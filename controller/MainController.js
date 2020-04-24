'use strict';

exports.indexAction = (req, res) => {
    res.render(
        'index', {
            'title': "Backend Coding Challenge",
            'welcome_message': "This challenge was made by : OUSSAMA BAYARE in Node JS"
        });
};