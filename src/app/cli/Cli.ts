//CLI tasks
import readline from 'readline';
import util from "util";
import events from "events";
import {cliProps} from "../interfaces";
import Workers from "../events/Workers";
let debug = util.debuglog('cli');
class _events extends events {}
let e = new _events();

//Input Handlers
e.on('exit', function (str: string){
    Workers.exitCli();
})

//Input Handlers
e.on('help', function (str: string){
    Workers.getCliHelps();
})

//Input Handlers
e.on('stats', function (str: string){
    Workers.getStats();
})

//Input Handlers
e.on('test', function (str: string){
    Workers.runTest();
})

//Input Handlers
e.on('worker:get categories', async function (str: string) {
    await Workers.getCategories();
})

//Input Handlers
e.on('worker:create category', async function (str: string) {
    await Workers.createNewCategory(str)
})

//Instantiate the CLI module object
let cli: cliProps = {

    init: function () {

        //Send the start message to the console
        console.log('\x1b[36m%s\x1b[0m', 'CLI is running...');

        //Start the CLI interface
        let _interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '$ '
        });

        //Create an initiate prompt function
        _interface.prompt();

        //handle each line of input separately
        _interface.on('line', function (str: string) {

           //send to the input processor
           cli.processInput(str);

           //Re-initialize the prompt afterwards
            _interface.prompt();
        });

        //if the user stop the cli, kill the associated processor.
        _interface.on('close', function () {
            process.exit(0);
        });
    },

    processInput: function (str: string) {
        //only process the input if the string is valid
        if (str) {
            //Codify the unique strings that identify the different cli commands
            let uniqueInput = [
                "help",
                "stats",
                "test",
                "worker:generate category",
                "worker:create category",
                "worker:delete category",
                "worker:get categories",
                "exit"
            ];
            //Go tru the possible inputs and emit the appropriate event
            let matchFound: boolean = false;
            //let counter = 0;
            uniqueInput.some(function (input: string) {
                if (str.toLowerCase().indexOf(input) > -1) {
                    matchFound = true;
                    //Emit the event to the CLI module
                    e.emit(input, str);
                    return true;
                }
            });

            //If no match, tell the user to try again
            if (!matchFound) {
                console.log('\x1b[31m%s\x1b[0m', 'Sorry, try again');
            }
        }
    },
};

export = cli;
