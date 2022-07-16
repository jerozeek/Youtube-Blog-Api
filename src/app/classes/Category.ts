import {categoryInterface, categoryProps} from "../interfaces";
import categoryServices from "../services/categoryServices";

export default class Category implements categoryInterface{

    public getAll(): Promise<categoryProps[]> {
        return new Promise((resolve, reject) => {
            categoryServices.getAllCategories().then((categories) => {
                resolve(categories);
            }).
            catch((error: Error) => {
                reject({message: error.message});
            })
        })
    }

}