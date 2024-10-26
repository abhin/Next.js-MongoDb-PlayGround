import path from "path";

export function getBaseName(itemPath) {
    console.log('Path', itemPath);
    console.log('basename', path.basename(itemPath));
    console.log('delimiter', path.delimiter);
    console.log('extname',path.extname(itemPath));

    const f1 = 'app';
    const f2 = 'script';
    const file = 'index.js';
    
    console.log('Join', path.join(f1, f2, file))
}