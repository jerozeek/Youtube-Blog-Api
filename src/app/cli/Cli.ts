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
e.on('man', function (str: string){
    cli.cliResponder(str);
})

//Input Handlers
e.on('help', function (str: string){
    cli.cliResponder(str);
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
            prompt: '> '
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
                "worker:generate category --{count}",
                "worker:create category --{name}",
                "worker:delete category --{id}",
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

    cliResponder: function (str: string) {
        switch (str) {

            case 'exit' :
                Workers.exitCli();
                break;

            case 'help' :
                Workers.getCliHelps();
                break;
        }
    }
};

export = cli;
