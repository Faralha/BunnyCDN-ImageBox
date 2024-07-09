const { Router } = require('express');
const express = require('express');
const router = express.Router()


const anjay = "ini value dari anjay.";

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        res.render('index', {anjay : anjay});
    });


    return app.use("/", router);
}

module.exports = {
    initWebRoutes
}