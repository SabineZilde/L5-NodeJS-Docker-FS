// 1. Task
// Print out the name ex: "The curent name is: Jānis"
// Ask for a new name: "Please enter a new name: " (enters "Anna")
// Print out the name ex: "The new name is: Anna"
// exit

import { accessSync, readFileSync, writeFileSync } from 'fs';

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const filePath = `${process.cwd()}/name.json`;

accessSync(filePath);
const jsonObject = readFileSync(filePath, 'utf8');
const decodedObject = JSON.parse(jsonObject);
console.log(`The current name is: ${decodedObject.name}`);


const changeName = (newName) => {
    try {
        decodedObject.name = newName;
        writeFileSync(filePath, JSON.stringify(decodedObject));
        console.log(`The new name is: ${newName}`);
    } catch (err) {
        console.error('Something went wrong', err);
    }
 }
 
 rl.question('Please enter a new name: ', (answer) => {
    changeName(answer);
    rl.close();
})
 