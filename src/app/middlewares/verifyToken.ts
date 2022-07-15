import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {errorHandler} from "../helpers";

export const verifyToken = async (req:Request, res: Response, next: NextFunction) => {
    try{
        let token = req.header('Authorization');
        if (token)
        {
            const accessToken: string = token.split(' ')[1];
            try{
                const secret = process.env.ACCESS_TOKEN_SECRET || '';

                req.user = <any>jwt.verify(accessToken, secret);

                next();
            }
            catch (e) {
                return errorHandler(res, 401, 'Invalid token');
            }
        }
        else
        {
            return errorHandler(res, 400, 'No token provided');
        }
    }
    catch (e) {
        return errorHandler(res, 401, 'Access Denied');
    }

}
