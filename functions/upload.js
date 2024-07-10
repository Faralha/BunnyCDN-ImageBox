const https = require('https');
const fs = require('fs');
require('dotenv').config();

const REGION = process.env.REGION;
const BASE_HOSTNAME = 'storage.bunnycdn.com';
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = process.env.STORAGE_NAME;
// const FILENAME_TO_UPLOAD = 'filenameyouwishtouse.txt';
// const FILE_PATH = '/path/to/your/file/upload.txt';
const ACCESS_KEY = process.env.STORAGE_API;

function uploadFile(FILE_PATH, FILENAME_TO_UPLOAD) {
        const encodedFileName = encodeURIComponent(FILENAME_TO_UPLOAD);
        const readStream = fs.createReadStream(FILE_PATH);
        const options = {
            method: 'PUT',
            host: HOSTNAME,
            path: `/${STORAGE_ZONE_NAME}/${encodedFileName}`,
            headers: {
                'AccessKey': ACCESS_KEY,
                'Content-type': 'application/octet-stream',
            },
        };

        const req = https.request(options, (res) => {
            res.on('data', (chunk) => {
                console.log(chunk.toString('utf8'));
            });
        });

        req.on('error', (error) => {
            console.error(error);
        });

        readStream.pipe(req);
    }
    
    const main = async () => {
        await uploadFile();
    }

module.exports = {
    uploadFile,
}