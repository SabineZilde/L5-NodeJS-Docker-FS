// 2. Task - ATM
// Asks for action "Please tell me what to do": + | -
// Asks for amount "How much? "
// Print out current ballance "Current ballance is: 100"

import { accessSync, readFileSync, writeFileSync } from 'fs';

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const filePath = `${process.cwd()}/ATM.json`;

accessSync(filePath);
const jsonObject = readFileSync(filePath, 'utf8');
const decodedObject = JSON.parse(jsonObject);
console.log(`Your current account balance is ${decodedObject.bilance} EUR.`)

try {
    rl.question('Please press + to increace or - to decrease your bilance: ', (answer) => {
        if (answer === '+') {
            rl.question('Please specify the amount: ', (amount) => {
                decodedObject.bilance += parseInt(amount);
                writeFileSync(filePath, JSON.stringify(decodedObject));
                console.log(`You are so rich now. There are ${decodedObject.bilance} EUR in your bank account!`);
                rl.close();
            });
        } else if (answer === '-') {
            rl.question('Please specify the amount: ', (amount) => {
                if (amount > decodedObject.bilance) {
                    console.log('Insufficient funds. Please try different amount.');
                rl.close();
                } else if (amount == decodedObject.bilance) {
                    decodedObject.bilance -= parseInt(amount);
                    writeFileSync(filePath, JSON.stringify(decodedObject));
                    console.log(`Oh, no! You have emptied your bank account!`);
                    rl.close();
                } else {
                    decodedObject.bilance -= parseInt(amount);
                    writeFileSync(filePath, JSON.stringify(decodedObject));
                    console.log(`You have left only ${decodedObject.bilance} EUR in your bank account.`);
                    rl.close();
                };
            });
        } else {
            console.log('Please try again and press only + or -')
            rl.close();
        }
    });
} catch (err) {
    console.log('Something went wrong: ', err);
}