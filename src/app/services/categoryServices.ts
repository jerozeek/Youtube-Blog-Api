import CategoryModel from "../model/Category";
import {categoryProps} from "../interfaces";

const findByCategoryId = async (id: string): Promise<categoryProps | any> => {
    return CategoryModel.findById(id);
}

const createCategory = async (name: string): Promise<categoryProps | any> => {
    const create = new CategoryModel({name});
    return create.save();
}

const getAllCategories = async (): Promise<categoryProps[]> => {
    return CategoryModel.find({});
}

export = {
    findByCategoryId,
    getAllCategories,
    createCategory,
}