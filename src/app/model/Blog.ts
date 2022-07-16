import {prop, getModelForClass, mongoose} from '@typegoose/typegoose';
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

class Blog extends TimeStamps {
    @prop({ required: true, unique: true })
    public title: string;

    @prop({ required: true, unique: true, type: String })
    public content: string;

    @prop({ required: true, default: null, type: String })
    public image: string;

    @prop({ required: false, ref: 'Users', type: mongoose.Schema.Types.ObjectId })
    public author: string;

    @prop({ required: false, default: 0 })
    public views: number;
}

const BlogModel = getModelForClass(Blog);
export default BlogModel;