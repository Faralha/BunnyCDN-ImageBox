const { Router } = require('express');
const express = require('express');
const router = express.Router()




let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        res.render('index');
    });


    return app.use("/", router);
}

module.exports = {
    initWebRoutes
}