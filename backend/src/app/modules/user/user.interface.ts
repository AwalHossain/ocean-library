/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type IUser = {
    email: string;
    password: string;
    _id: string;
}

export type ILoginUserResponse = {
    refreshToken?: string ;
    accessToken: string;
  };


export type UserModel ={
    isUserExist(email:string):Promise<Pick<IUser,'email'| 'password' |'_id' >>;
    isPasswordMatch(
        givenPassword:string,
        savePassword:string
    ):Promise<boolean>;
}
& Model<IUser>