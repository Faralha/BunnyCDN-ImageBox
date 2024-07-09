const { Router } = require('express');
const express = require('express');
const router = express.Router();

const { fetchPullZones } = require('../functions/fetch');

const dummyData = [
    { Name: "Dallas-01", Region: "US" },
    { Name: "Singapore-04", Region: "AS" },
    { Name: "Jakarta-01", Region: "AS" },
    { Name: "Bangkok-02", Region: "AS" },
    { Name: "Europe-09", Region: "ER"}
];

const anjay = "ini value dari anjay.";

let initWebRoutes = (app) => {
    router.get('/', async (req, res) => {
        // const pullZones = await fetchPullZones();
        const pullZones = dummyData;

        if (!req.session.storageId) {
            req.session.storageId = "Not Selected.";
        }
        
        res.render('index', {
            anjay: anjay,
            pullZones: pullZones,
            storageId: req.session.storageId
        });
    });

    // STORAGE ID FETCH AND RESPONSE
    router.post('/storageId', (req, res) => {
        const storageId = req.body.storageId;
        // console.log(storageId);
        req.session.storageId = storageId;
        res.status(200).json({ message: "OK." });
    });

    router.get('/storageId', (req, res) => {
        res.status(200).json({ storageId: req.session.storageId });
        // console.log("Storage ID: ", req.session.storageId);
    });

    // REGION FETCH
    router.get('/region', async (req, res) => {
        // const data = await fetchPullZones();

        const data = dummyData;
        const storageId = req.session.storageId;

        const region = data.find((item) => item.Name === storageId);
        const item = region ? region.Region : "Not Found.";
        req.session.region = item;
        // console.log("Region: ", item);
        return res.status(200).json({ region: item });
    });


    return app.use("/", router);
}

module.exports = {
    initWebRoutes
}