const fs = require('fs');
const http = require('http');
const https = require('https');
const { URL } = require('url');
const axios = require('axios');
const { parseArgs } = require('util');

const arg2 = process.argv[2];
const writeFILE = process.argv[3];
const readFILE = process.argv[4];
const args = process.argv.slice(2);
if (args.includes('--help')) {
    console.log('Usage: node step3.js [OPTIONS] writeFILE readFILE\n');
    console.log('if no options are provided, you should only include a read file or url to be returned to the console')
    console.log('Options:');
    console.log('--help:    How to use this scrip');
    console.log('--out:    node step3.js --out writeFILE readFILE');
    console.log('>>>>when using --out option please provide a file name for writing to and a file or url to read from.')
    process.exit();
}
if (!arg2) {
    console.error('Please provide a file path or URL.');
    process.exit(1);
}
function cat(filePath, writeFILE = false) {
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
            if (writeFILE) {
                //write to a file
                writeDATA(data, writeFILE)
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

async function webCat(url, writeFILE = false) {
    try {
        const { data } = await axios.get(url)
        //if a write file is provided call writeDATA
        if (writeFILE) {
            writeDATA(data, writeFILE)
        } else {
            // ELSE just log data to the console
            console.log(data);
        }

    } catch (error) {
        console.error('<<<ERROR with URL>>>');
        console.error(error.message)
    }
}

function url_x_file(arg2, writeFILE, readFILE) {
    if (arg2 == '--out') {
        try {
            // check if arg is a url
            const url = new URL(readFILE);
            const protocol = url.protocol;
            if (protocol === 'http:' || protocol === 'https:') {
                webCat(readFILE, writeFILE)
                return
            }
        } catch (err) {
            cat(readFILE, writeFILE)
            return
        }
    }
    try {
        // check if arg is a url
        const url = new URL(arg2);
        const protocol = url.protocol;
        if (protocol === 'http:' || protocol === 'https:') {
            webCat(arg2)
            return
        }
    } catch (err) {
        cat(arg2)
        return
    }
}
function writeDATA(data, writeFILE) {
    try {
        fs.writeFile(writeFILE, data, (err) => {
            if (err) {
                console.error('<<<ERROR with path to write file>>>');
                console.error(err.message)
            }
            console.log(`Data written to ${writeFILE}`);
        });
        return
    } catch (err) {
        console.error('<<<ERROR with path to write file>>>');
        console.error(err.message)
    }
}
// call url_x_file on load
url_x_file(arg2, writeFILE, readFILE)