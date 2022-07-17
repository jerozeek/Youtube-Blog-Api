import os from "os";
import v8 from "v8";
import { config } from "dotenv";
import axios from "axios";
config();

export default class Workers {

    private static checkConnection() {
        //Check if the connection is alive
        if (process.env.BASE_URL === undefined) {
            return console.log('\x1b[31m%s\x1b[0m', 'Please set the BASE_URL environment variable');
        }
    }

    private static getCommands() {
        return {
            "help": "Show this help page",
            "test": "Run a test",
            "stats": "Show the current stats of the application",
            "worker:create category --{name}": "Create a new category with the given name",
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

    public static getStats() {
        let stats: any = {
            'Load Average': os.loadavg().join(' '),
            'CPU Count': os.cpus().length,
            'Free Memory': os.freemem(),
            'Total Memory': os.totalmem(),
            'Uptime': os.uptime()+' seconds',
            'Platform': os.platform(),
            'Architecture': os.arch(),
            'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
            'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
            'Allocated Heap Used (%)': Math.round(v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size * 100),
            'Available Heap Allocated (%)': Math.round(v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit * 100),
        };

        //Show the header for the help page
        Workers.horizontalLine();
        Workers.centered('SYSTEM STATS');
        Workers.horizontalLine();
        Workers.verticalSpace(2);

        //logout each stat
        for(let key in stats) {
            if(stats.hasOwnProperty(key)) {
                let value = stats[key];
                let line = '\x1b[32m'+key+'\x1b[0m';
                let padding = 60 - line.length;
                for(let i = 0; i < padding; i++) {
                    line += ' ';
                }
                line += value;
                console.log(line);
                Workers.verticalSpace(1);
            }
        }
        Workers.verticalSpace(1);
        Workers.horizontalLine();
    }

    public static async getCategories() {
        Workers.checkConnection();
        try{
            let categories: any = await Workers.apiRequest('/category/get', 'GET', {});
            if (categories && categories.length > 0) {
                //Show the header for the help page
                Workers.horizontalLine();
                Workers.centered('CATEGORIES');
                Workers.horizontalLine();
                Workers.verticalSpace(1);

                //logout each category
                for(let category of categories) {
                    let line = '\x1b[32m'+'Category Name: '+'\x1b[0m';
                    let padding = 60 - line.length;
                    for(let i = 0; i < padding; i++) {
                        line += ' ';
                    }
                    line += category.name;
                    console.log(line);
                    Workers.verticalSpace(1);
                }
                Workers.horizontalLine();
            }
            else
            {
                console.log('\x1b[31m%s\x1b[0m', 'No categories found');
            }
        }
        catch (e) {
            console.log('\x1b[31m%s\x1b[0m', 'Connection error');
        }
    }

    public static async createNewCategory(str: string) {
        Workers.checkConnection();
        let args = str.split('--');
        let name = args[1].trim();
        let body = {
            name
        };
        try{
            let response = await Workers.apiRequest('/category/create', 'POST', body);
            if (response) {
                console.dir(response,{colors: true});
            }
            else {
                console.log('\x1b[31m%s\x1b[0m', 'Category creation failed');
            }
        }
        catch (e) {
            console.log('\x1b[31m%s\x1b[0m', 'Connection error');
        }
    }

    public static runTest() {
        console.log('\x1b[31m%s\x1b[0m', 'Running test');
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

    private static apiRequest(url: string, method: string, body: any) {
        return new Promise((resolve, reject) => {
            const request = axios({
                baseURL: process.env.BASE_URL+'api/v1',
                url: url,
                method: method,
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            request.then((response) => {
                resolve(response.data.success.data);
            }).
            catch((error) => {
                reject({message: error.message});
            })
        });
    }
}