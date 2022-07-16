import { Request, Response } from 'express'
import {errorHandler, successHandler} from "../helpers";
import {blogInterface, FileProps} from "../interfaces";
import Blog from "../classes/Blog";
import {validateBlog} from "../middlewares/validation";
import {fileUploader} from "../helpers/fileUploader";
import {blogListing, customBlogResponse} from "../services/customResponse";

const blogInstance: blogInterface = new Blog();

const getAll = async (req: Request, res: Response) => {
    try {
        blogInstance.getAll().then(async (blogs) => {
            return successHandler(res, 200, 'Blog posts fetch successfully', await blogListing(blogs));
        }).
        catch((err) => {
            return errorHandler(res, 401, err.message)
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal server error')
    }
}

const createBlog = async (req: Request, res: Response) => {
    try
    {
        const { title, content, author, categoryId } = req.body;

        const { error } = validateBlog.validate(req.body, {abortEarly: false});

        if (error) return errorHandler(res, 400, error.details[0].message);

        let image: FileProps | any;

        image = req.files === undefined ? null : req.files.image;

        if (image === null) return errorHandler(res,400, 'No file was uploaded');

        await fileUploader(image, 'blog', async (err: any, result: any) => {

            if (error) return errorHandler(res, 400, error);

            const payload = { title, content, author, image: result, categoryId };

            blogInstance.createBlog(payload).then(async (result) => {
                return successHandler(res, 200, 'Blog post created successfully', await customBlogResponse(result));
            }).
            catch((err: Error) => {
                return errorHandler(res, 400, err.message)
            })
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal server error')
    }
}

const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) return errorHandler(res, 400, 'No id was provided');

        blogInstance.deleteBlog(id).then(async (result) => {
            return successHandler(res, 200, 'Blog post deleted successfully', await customBlogResponse(result));
        }).
        catch((err: Error) => {
            return errorHandler(res, 400, err.message)
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal server error')
    }
}

const addViews = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) return errorHandler(res, 400, 'No id was provided');

        blogInstance.addToView(id).then(async (result) => {
            return successHandler(res, 200, 'Blog post views updated successfully', await customBlogResponse(result));
        }).
        catch((err: Error) => {
            return errorHandler(res, 400, err.message)
        })
    }
    catch (e) {
        return errorHandler(res, 500, 'Internal server error')
    }
}

export = {
    getAll,
    createBlog,
    deleteBlog,
    addViews
}