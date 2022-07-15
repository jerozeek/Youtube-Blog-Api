import { Request, Response } from 'express';
import {createPasswordHash, errorHandler, generateRandomChar, successHandler} from "../helpers";
import {authProps, userProps} from "../interfaces";
import {Auth} from "../classes/Auth";
import {
    validateLogin,
    validateSignup,
    validateEmail,
    validateEmailOTP
} from "../middlewares/validation";
import userServices from '../services/userServices';
import {customUserResponse} from '../services/customResponse';
import jwt from "jsonwebtoken";

let authInstance: authProps = new Auth();

const doSignUp = async (req: Request, res: Response) => {
    try{

        const { username, email, password } = req.body;

        const { error } = validateSignup.validate(req.body, { abortEarly: false });

        if (error) return errorHandler(res, 400, error.details[0].message, error.details);

        const otp = generateRandomChar(4);

        authInstance.create({ username, email, password: createPasswordHash(password), otp }).then(async (user) => {
            return successHandler(res, 201, 'Account created Successful', await _usersResponse(user));
        }).
        catch((err: Error) => {
            return errorHandler(res, 500, err.message);
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error', e);
    }
}

const doLogin = async (req: Request, res: Response) => {

    try{

        const { email, password } = req.body;

        const { error } = validateLogin.validate(req.body, { abortEarly: false });

        if (error) return errorHandler(res, 400, error.details[0].message, error.details);

        authInstance.login(email, password).then(async (user) => {
            return successHandler(res, 200, 'Login Successful', await _usersResponse(user));
        }).
        catch((error: Error) => {
          return errorHandler(res, 500, error.message);
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error', e);
    }
}

const resetPassword = async (req: Request, res: Response) => {
    try{
        const { email } = req.body;

        const { error } = validateEmail.validate(req.body, { abortEarly: false });

        if (error) return errorHandler(res, 400, error.details[0].message, error.details);

        authInstance.forgetPassword(email).then(async () => {
            return successHandler(res, 200, 'An OTP have been sent to user');
        }).
        catch((err: Error) => {
            return errorHandler(res, 500, err.message);
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error', e);
    }
}

const verifyOTP = async (req: Request, res: Response) => {
    try{
        const { otp, email } = req.body;

        const { error } = validateEmailOTP.validate(req.body, { abortEarly: false });

        if (error) return errorHandler(res, 400, error.details[0].message, error.details);

        authInstance.verifyOTP(email, otp).then(async (user) => {
            return successHandler(res, 200, 'OTP verified Successful');
        }).
        catch((err: Error) => {
          return errorHandler(res, 500, err.message);
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error', e);
    }
}

const updatePassword = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;

        const { error } = validateLogin.validate(req.body, { abortEarly: false });

        if (error) return errorHandler(res, 400, error.details[0].message, error.details);

        authInstance.updatePassword(email, password).then(async (user) => {
            return successHandler(res, 200, 'Password updated Successful');
        }).
        catch((err: Error) => {
            return errorHandler(res, 500, err.message);
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error', e);
    }
}

const _usersResponse = async (user: userProps, withToken: boolean = true) => {

    if (withToken) {
        const accessToken = await userServices.generateAccessToken(user);

        const refreshToken = await userServices.generateRefreshToken(user);

        const data = customUserResponse(user);

        return { accessToken, refreshToken, user: data };
    }

    return customUserResponse(user);
}

const middleware = async (req: Request, res: Response) => {
    try{
        authInstance.authMiddleware(req.user.id).then(async (data) =>
        {
            return successHandler(res, 200, 'User Token was verified successfully', await _usersResponse(data, false));
        }).
        catch((error) => {
            return errorHandler(res, 401, error.message);
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error');
    }
}

const refreshAppToken = async (req: Request, res: Response) => {
    try{
        const {refreshToken} = req.body;

        if (refreshToken)
        {

            const decoded = <any>jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '');

            const user : userProps = await userServices.findByEmail(decoded.email);

            if (!user) return errorHandler(res, 401, 'Invalid Token');

            const existingToken : any[] = user.security.tokens;
            //check if refresh token is in documents
            if (existingToken.some(token => token.refreshToken === refreshToken))
            {
                return successHandler(res, 200, 'Access Token generated successfully', {accessToken: await userServices.generateAccessToken(user)})
            }
        }

        return errorHandler(res, 401, 'Refresh Token is required');
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error');
    }
}


export = {
    doLogin,
    doSignUp,
    resetPassword,
    verifyOTP,
    updatePassword,
    middleware,
    refreshAppToken,
}