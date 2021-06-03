// 1. Task
// Print out the name ex: "The curent name is: Jānis"
// Ask for a new name: "Please enter a new name: " (enters "Anna")
// Print out the name ex: "The new name is: Anna"
// exit

// To run to app write in terminal:
// docker run -it --rm -v ${PWD}:/app/ node:alpine sh
// cd app
// node index.js

import { accessSync, readFileSync, writeFileSync } from 'fs';

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const filePath = `${process.cwd()}/name.json`;
 
try {
    accessSync(filePath);
    const jsonObject = readFileSync(filePath, 'utf8');
    const decodedObject = JSON.parse(jsonObject);
    console.log(`The current name is: ${decodedObject.name}`);
    
    rl.question('Please enter a new name: ', (answer) => {
        decodedObject.name = answer;
        writeFileSync(filePath, JSON.stringify(decodedObject));
        console.log(`The new name is: ${answer}`);
        rl.close();
    })
} catch(err) {
    console.error('Something went wrong', err);
}

