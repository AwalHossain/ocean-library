import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import config from '../../../config';
import { IUser, UserModel } from "./user.interface";



const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
});


UserSchema.statics.isUserExist = async function (
    email: string
):Promise<IUser | null>{
  return  await  User.findOne({email},{
        email:1,
        _id:1
    });
}

UserSchema.statics.isPasswordMatch = async function (
    givenPassword: string,
    savePassword: string
):Promise<boolean>{
  return await  bcrypt.compare(givenPassword, savePassword);
}

UserSchema. pre('save', async function (next) {
    const user = this as IUser;

    user.password = await bcrypt.hash(user.password, Number(config.bycrypt_salt_rounds));

    next();
});


export const User = model<IUser,UserModel>('User', UserSchema);
