import express, {Application, ErrorRequestHandler} from 'express';
import mongoose from 'mongoose';
import { config } from "dotenv";
import fileUploader from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary'
import routes = require('../routes');
import cors from 'cors';
config();

export class Connections {

    public static app: Application = express();

    public static StartServer(): void {
        const uri = process.env.DB_CONNECTION || '';
        const port = process.env.PORT || 3001;

        mongoose.connect(uri, () => {
            console.log('mongoose is connected');
            //cli.init();
        });

        Connections.app.listen(port, () => console.log(`app listening on port ${port}!`));

        //connect to cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME || '',
            api_key: process.env.CLOUDINARY_API_KEY || '',
            api_secret: process.env.CLOUDINARY_API_SECRET || ''
        })

        Connections.app.use(fileUploader({
            useTempFiles: true,
        }));

        //allow json data
        Connections.app.use(express.json());

        //use cors
        Connections.app.use(cors());

        //import all the route
        routes(Connections.app);

        const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
            res.status(err.status || 500).json({
                error: {
                    status: err.status || 500,
                    message: err.message,
                }
            });
        }

        Connections.app.use(errorHandler);

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose default connection is disconnected due to application termination');
                process.exit(0);
            });
        });
    }

    public static closeConnection(): void {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection is disconnected due to application termination');
            process.exit(0);
        });
    }
}
