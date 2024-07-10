require('dotenv').config();
const fetch = require('node-fetch');


async function fetchPullZones() {
    try {
        const pullUrl = "https://api.bunny.net/pullzone?page=0&perPage=1000&includeCertificate=false";
        const pullOptions = {
            method: 'GET', headers: {
                accept: 'application/json',
                AccessKey: process.env.API_KEY
            }
        };

        // Catch response to JSON
        const response = await fetch(pullUrl, pullOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function fetchStorageZone() {
    try {
        const storageUrl = "https://api.bunny.net/storagezone?page=0&perPage=1000&includeDeleted=false";
        const storageOptions = {
            method: 'GET', headers: {
                accept: 'application/json',
                AccessKey: process.env.API_KEY
            }
        };

        const response = await fetch(storageUrl, storageOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function fetchStorageFiles() {
    const region = process.env.REGION;
    const storageName = process.env.STORAGE_NAME;
    try {
        const url = `https://${region}.storage.bunnycdn.com/${storageName}/`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                AccessKey: process.env.STORAGE_API
            }
        };

        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    fetchPullZones,
    fetchStorageZone,
    fetchStorageFiles
}