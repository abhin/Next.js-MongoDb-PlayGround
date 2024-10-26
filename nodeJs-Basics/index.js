import {openFile, readFile, deleteFile, writeToFile, updateFile} from "./fileSystem.js"
import {parsedUrl} from "./url.js"
import {getBaseName} from "./path.js"



openFile('mynewfile2.txt');

readFile('../MongoDb Commands.txt');

deleteFile('mynewfile2.txt');

writeToFile('mynewfile2.txt', 'This is the written content to the file');
updateFile('mynewfile2.txt', '. This is the updated content to the file')

parsedUrl('https://github.com/abhin/Next.js-MongoDb-PlayGround/tree/main/nodeJs-Basics');

getBaseName('/a/b/lkj.js');


import "./http.js";