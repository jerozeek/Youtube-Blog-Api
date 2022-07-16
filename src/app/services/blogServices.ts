import BlogModel from "../model/Blog";
import {blogData, createBlogPayload} from "../interfaces";

const create = async (payload: createBlogPayload):Promise<blogData | any> => {
    const data = new BlogModel(payload);
    return data.save();
}

const getAll = async ():Promise<blogData[] | any> => {
    return BlogModel.find({}).sort({createdAt: -1});
}

const removeBlog = async (blogId: string): Promise<blogData | any> => {
    const remove = await BlogModel.findByIdAndDelete(blogId);
    if (remove){
        return remove;
    }
    return null;
}

const addToView = async (blogId: string): Promise<blogData | any> => {
    return BlogModel.findByIdAndUpdate(blogId, {$inc: {views: 1}}, {new: true});
}

export = {
    create,
    getAll,
    removeBlog,
    addToView
}