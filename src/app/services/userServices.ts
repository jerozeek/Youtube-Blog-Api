import jwt from "jsonwebtoken";
import {createUserProps, userProps} from "../interfaces";
import UsersModel from "../model/Users";
import {verifyPasswordHash} from "../helpers";

const generateAccessToken = async (user: userProps): Promise <string | null> => {
    const tokenKey = process.env.ACCESS_TOKEN_SECRET || '';
    const expiryTime = process.env.ACCESS_TOKEN_EXPIRY || '1h';
    const accessToken = jwt.sign({ id: user.id, email: user.email},tokenKey, { expiresIn: expiryTime});
    if (accessToken) return accessToken;
    return null;
}

const generateRefreshToken = async (user: userProps): Promise <string | null> => {
    const tokenKey = process.env.REFRESH_TOKEN_SECRET || '';
    const expiryTime = process.env.REFRESH_TOKEN_EXPIRY || '30d';
    const refreshToken = jwt.sign({ id: user.id, email: user.email}, tokenKey, { expiresIn: expiryTime});
    try{
        const existingRefreshToken: any | [] = user.security.tokens;
        if (existingRefreshToken.length < 5)
        {
            //generate new refresh token
            await UsersModel.updateOne({email: user.email}, {$push: {"security.tokens": {refreshToken, createdAt: new Date()}}});
        }
        else
        {
            //pull all token out from the box....
            await UsersModel.updateOne({email: user.email}, {$pull: {"security.tokens": {_id: existingRefreshToken[0]._id}}});

            //push a new token........
            await UsersModel.updateOne({email: user.email}, {$push: {"security.tokens": {refreshToken, createdAt: new Date()}}});
        }

        return refreshToken;
    }
    catch (e) {
        return null;
    }
}

const createUser = async (payload: createUserProps): Promise <userProps | any> => {
    const user =  new UsersModel(payload);
    const created = await user.save();
    if (created) return created;
    else return null;
}

const verifyPassword = async (hash: string, newPassword: string): Promise<boolean> => {
    return verifyPasswordHash(newPassword, hash);
}

const findByEmail = async (email: string): Promise <userProps | any> => {
    const user = await UsersModel.findOne({email});
    if (user) return user;
    else return null;
}

const findByUserId = async (userId: string): Promise<userProps| any> => {
    const user = await UsersModel.findById(userId);
    if (user) return user;
    else return null;
}

const setPasswordResetState = async (userId: string, state: boolean) => {
    await UsersModel.findByIdAndUpdate(userId, {$set: {passwordReset: state}});
}

const updatePassword = async (userId: string, password: string): Promise<userProps | any> => {
    const reset = await UsersModel.findByIdAndUpdate(userId, {$set: {password}});
    if (reset)
    {
        await setPasswordResetState(userId, false);
    }
}


const setOTP = async (userId: string, otp: number) => {
    await UsersModel.findByIdAndUpdate(userId, {$set: {otp}});
}


export = {
    generateAccessToken,
    generateRefreshToken,
    createUser,
    verifyPassword,
    findByEmail,
    updatePassword,
    setPasswordResetState,
    setOTP,
    findByUserId
}