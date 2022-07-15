import bcrypt = require('bcrypt');
import { Response } from 'express';

export const createPasswordHash = (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const verifyPasswordHash = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

export const generateRandomChar = (length: number = 4): number => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return parseInt(result);
}

export const errorHandler = (response: Response, statusCode:number, message:string, data?: any) => {
    return response.status(statusCode).json({
        error: {
            status: statusCode,
            message,
            data,
        }
    })
};

export const successHandler = (response: Response, statusCode:number, message:string, data?: any) => {
    return response.status(statusCode).json({
        success: {
            status: statusCode,
            message,
            data,
        }
    })
};

export const KeyPatternErrorResponse = (e: any) => {
    let errorMessage = '';
    let errorReceived = e.keyPattern;
    if (typeof errorReceived === 'object')
    {
        for (let key in errorReceived)
        {
            errorMessage = `${key} already exists. `;
        }
    }
    else
    {
        errorMessage = e.message;
    }
    return errorMessage;
}