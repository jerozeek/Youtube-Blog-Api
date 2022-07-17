import {categoryProps} from "../interfaces";


export default class Workers {

    private static getCommands() {
        return {
            "help": "Show this help page",
            "worker:generate category --{count}": "Generate new categories with random names and a given number. Maximum count should be 5",
            "worker:create category --{name}": "Create a new category with the given name",
            "worker:delete category --{id}": "Delete a category by the given id",
            "worker:get categories": "Get all categories",
            "exit": "Exit the CLI",
        };
    }

    public static exitCli() {
        return process.exit(0);
    }

    public static getCliHelps() {
        //help commands to list all commands that are allowed
        let commands: any = Workers.getCommands();

        //Show the header for the help page
        Workers.horizontalLine();
        Workers.centered('CLI MANUAL');
        Workers.horizontalLine();
        Workers.verticalSpace(2);

        //Show each command and explanation
        for(let key in commands) {
            if(commands.hasOwnProperty(key)) {
                let value = commands[key];
                let line = '\x1b[32m'+key+'\x1b[0m';
                let padding = 60 - line.length;
                for(let i = 0; i < padding; i++) {
                    line += ' ';
                }
                line += value;
                console.log(line);
            }
        }
        Workers.verticalSpace(1);
    }

    public static generateRandomCategory(count: number = 5): Promise<categoryProps[]> {
        return new Promise((resolve, reject) => {

        })
    }

    public static createSingleCategory(name: string): Promise<categoryProps> {
        return new Promise((resolve, reject) => {

        })
    }

    public static deleteCategory(categoryId: string): Promise<categoryProps> {
        return new Promise((resolve, reject) => {

        })
    }

    public static getListsCategories(name: string): Promise<categoryProps[]> {
        return new Promise((resolve, reject) => {

        })
    }

    public static horizontalLine() {
        //Get the available screen size
        let width = process.stdout.columns;
        let line = '';
        for(let i = 0; i < width; i++) {
            line += '-';
        }
        console.log(line);
    }

    public static verticalSpace(lines: number) {
        if (lines > 0) {
            for (let i = 0; i < lines; i++) {
                console.log('');
            }
        }
    }

    public static centered(str: string) {
        //Get the available screen size
        let width = process.stdout.columns;

        //Calculate the left padding
        let padding = Math.floor((width - str.length) / 2);

        //Add the left padding to the string
        let line = '';
        for(let i = 0; i < padding; i++) {
            line += ' ';
        }
        line += str;
        console.log(line);
    }
}