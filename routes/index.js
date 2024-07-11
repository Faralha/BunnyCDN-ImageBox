const { Router } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const {
    fetchStorageFiles
} = require('../functions/fetch');

const {
    uploadFile
} = require('../functions/upload');

const {compressImage} = require('../functions/compress');

let urlLinks = [];
let linkData = [];


let initWebRoutes = (app) => {
    router.get('/', async (req, res) => {

        const message = req.query.message;
        const status = req.query.status;

        const storageFiles = await fetchStorageFiles();
        
        res.render('index', {
            storageId: req.session.storageId,
            pullZones: process.env.PULL_ZONES,
            storageName: process.env.STORAGE_NAME,
            region: process.env.REGION,
            files: storageFiles,
            message: message,
            status: status,
            links: linkData
        });
    });


    // FILE UPLOAD
    const upload = multer({ dest: '/uploads/'});
    router.post('/upload', upload.array('myFiles', 20), async (req, res) => {

        const filePath = req.body.finalPathInput;

        const processFiles = req.files.map(file => {
            return new Promise(async (resolve, reject) => {
                try {
                    const { path: tempPath, originalname } = file;
                    const encodedFileName = encodeURIComponent(originalname);
                    const path = filePath ? `${filePath}/${encodedFileName}` : `${encodedFileName}`;

                    await compressImage(tempPath);

                    await uploadFile(tempPath, path);
                    await fs.promises.unlink(tempPath);

                    const urlLink = `https://${process.env.PULL_ZONES}/${path}`;
                    resolve(urlLink);
                } catch (error) {
                    reject(error);
                }
            });
        });

        Promise.all(processFiles)
            .then(urlLinks => {
                linkData = urlLinks;
                // urlLinks.forEach(urlLink => console.log(urlLink));
                res.redirect('/?message=Upload successful.&status=success');
            })
            .catch(error => {
                console.error("An error occurred:", error);
                res.redirect('/?message=Upload failed.&status=error');
            });
        
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

        const storageId = req.session.storageId;

        const region = data.find((item) => item.Name === storageId);
        const item = region ? region.Region : "Not Found.";
        req.session.region = item;
        return res.status(200).json({ region: item });
    });


    return app.use("/", router);
}

module.exports = {
    initWebRoutes
}