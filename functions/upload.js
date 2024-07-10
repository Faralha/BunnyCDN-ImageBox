const https = require('https');
const fs = require('fs');
require('dotenv').config();

const REGION = process.env.REGION;
const BASE_HOSTNAME = 'storage.bunnycdn.com';
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = process.env.STORAGE_NAME;
const ACCESS_KEY = process.env.STORAGE_API;

function uploadFile(FILE_PATH, PATH) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(FILE_PATH);

        const options = {
            method: 'PUT',
            host: HOSTNAME,
            path: `/${STORAGE_ZONE_NAME}/${PATH}`,
            headers: {
                'AccessKey': ACCESS_KEY,
                'Content-type': 'application/octet-stream',
            },
        };

        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk.toString('utf8');
            });
            res.on('end', () => {
                resolve(responseBody); 
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        readStream.pipe(req);
    });
}

module.exports = {
    uploadFile,
}