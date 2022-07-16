import { Request, Response } from "express";
import {errorHandler, successHandler} from "../helpers";
import {categoryInterface} from "../interfaces";
import Category from "../classes/Category";

const categoryInstance: categoryInterface = new Category();

const fetchAll = async (req: Request, res: Response) => {
    try {
        categoryInstance.getAll().then((categories) => {
            return successHandler(res, 200, 'Categories fetched successfully', categories.length > 0 ? categories : []);
        }).
        catch((error: Error) => {
            return errorHandler(res, 500, error.message);
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal Server Error');
    }
}

export = {
    fetchAll
}