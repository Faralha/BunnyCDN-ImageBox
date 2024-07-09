const https = require('https');
const fs = require('fs');
require('dotenv').config();

const REGION = 'YOUR_REGION'; // If German region, set this to an empty string: ''
const BASE_HOSTNAME = 'storage.bunnycdn.com';
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = 'YOUR_STORAGE_ZONE_NAME';
const FILENAME_TO_UPLOAD = 'filenameyouwishtouse.txt';
const FILE_PATH = '/path/to/your/file/upload.txt';
const ACCESS_KEY = process.env.STORAGE_API;

