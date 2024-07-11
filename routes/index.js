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
            links: urlLinks
        });
    });


    // FILE UPLOAD
    const upload = multer({ dest: '/uploads/'});
    router.post('/upload', upload.array('myFiles', 20), async (req, res) => {
        
        try {
            urlLinks = [];
            const filePath = req.body.finalPathInput;
            console.log(filePath);

            for (const file of req.files) {
                const { path: tempPath, originalname } = file;
                const encodedFileName = encodeURIComponent(originalname);
                // Check if filepath is in root or subfolder
                const path = filePath ? `${filePath}/${encodedFileName}` : `${encodedFileName}`;


                // Compress Images to WebP with 80% quality
                const tempOutput = `CMP-${tempPath}`;
                await compressImage(tempPath, tempOutput);


                await uploadFile(tempOutput, path);
                await fs.promises.unlink(tempOutput);

                // Store URL links
                urlLinks.push(`https://${process.env.PULL_ZONES}/${path}`);
            }

            for (const path of urlLinks) {
                console.log(path);
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