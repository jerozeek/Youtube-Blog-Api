import {prop, getModelForClass, mongoose, modelOptions, Severity} from '@typegoose/typegoose';
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW,
    },
})

class Users extends TimeStamps{
    @prop({ required: true, unique: true })
    public username: string;

    @prop({ required: true, unique: true })
    public email: string;

    @prop({ required: true, type: String, minlength: 6 })
    public password: string;

    @prop({ required: false, default: null })
    public image: string;

    @prop({ default: false, type: Boolean })
    passwordReset: boolean;

    @prop({ default: false, type: Number })
    otp: number;

    @prop({ required: false, default: {tokens: []}, type: mongoose.Schema.Types.Mixed  })
    security: {tokens: [refreshToken: string, createdAt: string]}

}

const UsersModel = getModelForClass(Users);
export default UsersModel;