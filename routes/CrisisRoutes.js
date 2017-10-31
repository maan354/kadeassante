const express = require('express');
const models = require('../model/db');
const router = express.Router();
//const auth = require('../app').auth;

router.use(function (req, res, next) {
    console.log('Something is happening');
    next();
});

router.get('/getCrisis', function (req, res) {
    models.Crisis.findAll().then(function (crisis) {
        res.status(200).send(crisis);
    });
});

router.get('/getCrisisDetails', function (req, res) {
    models.Crisis.findAll().then(function (crisis) {
        //
    });
});

module.exports = {
    router,
    models
};