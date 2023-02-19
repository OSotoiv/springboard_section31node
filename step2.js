const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const axios = require('axios');

const arg = process.argv[2];

if (!arg) {
    console.error('Please provide a file path or URL.');
    process.exit(1);
}
function cat(filePath) {
    // Check if the file exists
    try {
        fs.accessSync(filePath, fs.constants.F_OK)
        // If the file exists, read its contents to the console
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log("erererererer", err);
                return
                // process.kill(2);
            }
            console.log(data);
        })

    } catch (err) {
        console.log(`'${filePath}'<<<<ERROR>>>>>Not a File or URL`);
        console.log(err.message)
    }
}

async function webCat(url) {
    try {
        const res = await axios.get(url)
        console.log(res.data);

    } catch (error) {
        console.error('<<<ERROR>>>');
        console.error(error.message)
    }
}

function urlXfile(arg) {
    try {
        // check if arg is a url
        const url = new URL(arg);
        const protocol = url.protocol;
        if (protocol === 'http:' || protocol === 'https:') {
            webCat(arg)
            return
        }
    } catch (err) {
        cat(arg)
        return
    }
}
urlXfile(arg)