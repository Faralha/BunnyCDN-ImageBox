const { Router } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const {
    fetchPullZones,
    fetchStorageFiles
} = require('../functions/fetch');

const {
    uploadFile
} = require('../functions/upload');

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
        const message = req.query.message;
        const status = req.query.status;

        const storageFiles = await fetchStorageFiles();
        
        res.render('index', {
            storageId: req.session.storageId,
            storageName: process.env.STORAGE_NAME,
            region: process.env.REGION,
            files: storageFiles,
            message: message,
            status: status,
        });
    });


    // FILE UPLOAD
    const upload = multer({ dest: '/uploads/'});
    router.post('/upload', upload.array('myFiles', 20), async (req, res) => {
        
        try {

            const filePath = req.body.finalPathInput;

            for (const file of req.files) {
                const { path: tempPath, originalname } = file;
                await uploadFile(tempPath, filePath, originalname);
                await fs.promises.unlink(tempPath);
            }
            res.redirect('/?message=Upload%20Success&status=success');

        } catch (error) {
            console.log(error);
            res.redirect('/?message=Upload%20Failed&status=error');
        }
    })



    // STORAGE ID FETCH AND RESPONSE
    router.post('/storageId', (req, res) => {
        const storageId = req.body.storageId;
        req.session.storageId = storageId;
        res.status(200).json({ message: "OK." });
    });

    router.get('/storageId', (req, res) => {
        res.status(200).json({ storageId: req.session.storageId });
    });



    // STORAGE FILES FETCH
    router.get('/files', async (req, res) => {
        const data = await fetchStorageFiles();
        return res.status(200).json({ data: data });
    })



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