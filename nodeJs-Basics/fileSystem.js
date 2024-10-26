
import fs from "fs";

export function openFile(path) {
    fs.open(path, 'w', (err, file) => {

        if (err)  console.log( err);

        console.log('Saved!');

    });
}


export function readFile(path) {
    fs.readFile(path, 'UTF-8', (err, data) => {

        if (err)  console.log( err);

        console.log('File Content', data);

    });
}


export function deleteFile(path) {
    fs.unlink(path, (err) => {
        if (err) 
            console.log('Unable to delete the file')
        else 
            console.log("File deleted successfully");
    });
}

export function writeToFile(path, content) {
    fs.writeFile(path, content, (err) => {
        if (err) 
            console.log('Unable to write the file')
        else 
            console.log("File is written successfully");
    });
}

export function updateFile(path, content) {
    fs.appendFile(path, content, (err) => {
        if (err) 
            console.log('Unable to update the file')
        else 
            console.log("File is updated successfully");
    });
}