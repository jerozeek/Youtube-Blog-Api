import CategoryModel from "../model/Category";
import {categoryProps} from "../interfaces";

const findByCategoryId = async (categoryId: string): Promise<categoryProps | any> => {
    return CategoryModel.findById(categoryId);
}

const getAllCategories = async (): Promise<categoryProps[] | any> => {
    return CategoryModel.find();
}

export = {
    findByCategoryId,
    getAllCategories
}