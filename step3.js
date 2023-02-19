const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const axios = require('axios');

const arg2 = process.argv[2];
const arg3 = process.argv[3];
const arg4 = process.argv[4];

if (!arg) {
    console.error('Please provide a file path or URL.');
    process.exit(1);
}
function cat(filePath, write = false) {
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
            if (write) {
                //write to a file
                writeDATA(data)
            } else {
                //console log content
                console.log(data);
            }
        })

    } catch (err) {
        console.log(`'${filePath}'<<<<ERROR>>>>>Not a File or URL`);
        console.log(err.message)
    }
}

async function webCat(url) {
    try {
        const res = await axios.get(arg)
        console.log(res.data);

    } catch (error) {
        console.error('<<<ERROR>>>');
        console.error(error.message)
    }
}

function urlXfile(arg2, arg3, arg4) {
    try {
        // check if arg is a url
        const url = new URL(arg2);
        const protocol = url.protocol;
        if (protocol === 'http:' || protocol === 'https:') {
            webCat(arg4)
            return
        }
    } catch (err) {
        cat(arg2)
        return
    }
}
function writeDATA(data) {
    return
}
urlXfile(arg2, arg3, arg4)