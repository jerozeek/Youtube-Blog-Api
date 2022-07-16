import {blogData, blogInterface, createBlogPayload} from "../interfaces";
import blogServices from "../services/blogServices";

export default class Blog implements blogInterface {

    public createBlog(payload: createBlogPayload): Promise<blogData> {
        return new Promise(async (resolve, reject) => {
            blogServices.create(payload).then((blog) => {
                resolve(blog);
            }).
            catch((error: Error) => {
                reject({message: error.message});
            })
        })
    }

    public deleteBlog(blogId: string): Promise<blogData> {
        return new Promise(async (resolve, reject) => {
            blogServices.removeBlog(blogId).then((blog) => {
                //returned the deleted blog data that was removed!!!
                return resolve(blog);
            }).
            catch((error: Error) => {
                reject({message: error.message});
            })
        })
    }

    public getAll(): Promise<blogData[]> {
        return new Promise(async (resolve, reject) => {
            blogServices.getAll().then((blog) => {
                resolve(blog);
            }).
            catch((error: Error) => {
                reject({message: error.message});
            })
        })
    }

    public addToView(blogId: string): Promise<blogData> {
        return new Promise(async (resolve, reject) => {
            blogServices.addToView(blogId).then((blog) => {
                resolve(blog);
            }).
            catch((error: Error) => {
                reject({message: error.message});
            })
        })
    }

}