import {prop, getModelForClass} from '@typegoose/typegoose';
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

class Category extends TimeStamps {
    @prop({ required: true, unique: true })
    public name: string;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;