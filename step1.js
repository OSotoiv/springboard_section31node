const fs = require('fs');
const arg = process.argv[2];

if (!arg) {
    console.error('Please provide a file path.');
    process.exit(1);
}

function cat(filePath) {
    // Check if the file exists
    try {
        fs.accessSync(filePath, fs.constants.F_OK)
        // If the file exists, read its contents to the console
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return
                // process.kill(2);
            }
            console.log(data);
        })

    } catch (err) {
        console.log(`File >>> '${filePath}' does not exits`);
        return err
    }
}
cat(arg)
// module.exports = { cat }

// >>>>>>>>fs.constants.F_OK is a flag in the Node.js fs module that is used to check if a file exists.
// It is one of several constants that can be passed to the fs.access() method to specify the type 
// of file system operation to perform.>>>>>>>>>>

//>>>>>>>>> When fs.access() is called with the fs.constants.F_OK flag,
// it checks whether the file exists. If the file exists,
// the method completes successfully and does not return an error.
// If the file does not exist, the method returns an error.>>>>>>>>

// here is another way to write cat that is no using he syncronous version of fs.access
function cat(filePath) {
    if (!filePath) return;
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`File >>> '${filePath}' does not exits`);
            return err
            // process.kill(1);
        } else {
            // If the file exists, read its contents to the console
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    return
                    // process.kill(2);
                }
                console.log(data);
            })
        }
        return
    })
}