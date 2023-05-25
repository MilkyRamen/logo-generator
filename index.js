const fs = require('fs');
const inquirer = require('inquirer');

//shape options
const shapeOptions = ['circle', 'triangle', 'square'];

//User Input
async function promptUser() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'enter up to three characters',
                validate: (input) => {
                    if (input.length <= 3) {
                        return true;
                    }
                    return 'please enter up to three characters';
                },
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'enter text color',
            },
            {
                type: 'list',
                name: 'shape',
                message: 'choose a shape',
                choices: shapeOptions,
            },
            {
                type: 'input',
                name: 'shapeColor',
                message: 'enter shape color',
            }, 
        ]);
        
        //generate svg markup
        const SvgMarkup = generateSvgMarkup(answers);

        //save svg to file
        fs.writeFileSync('logo.svg', SvgMarkup);

        console.log('generated logo.svg');
    } catch (error) {
        console.error(error);
    }
}
   

    function generateSvgMarkup(answers) {
        const { text, textColor, shape, shapeColor } = answers;

        // create svg markup
        const SvgMarkup = `
        <svg version="1.1" xm1ns="http://www.w3.org/2000/svg" width="300" height="200">
            <rect x="0" y="0" width="300" height="200" fill="${shapeColor}" />
            <text x="150" y="100" fill="${textColor}" text-anchor="middle">${text}</text>
        </svg>
        `;
        //return svg markup
        return SvgMarkup;
    }

    //call promptUser to start
    promptUser();