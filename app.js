/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');

const db = require('./model/db').sequelize;
const CrisisRoutes = require('./routes/CrisisRoutes').router;

const auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401)
    }

    const user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res)
    }

    if (user.name === 'user' && user.pass === 'pass') {
        return next();
    } else {
        return unauthorized(res)
    }
};

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
const cfenv = require('cfenv');

// create a new express server
const app = express();

// serve the files out of ./public as our main files
app
    .use(express.static(__dirname + '/public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use('/crisis', auth, CrisisRoutes);

app
    .set('json spaces', 2);

// get the app environment from Cloud Foundry
const appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    db.sync()
        .then(function () {
            console.log('Synchronisation de la DB');
        });
    console.log("server starting on " + appEnv.url);
});

module.exports = auth;