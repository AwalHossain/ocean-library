/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type Iuser = {
    email: string;
    password: string;
}


export type UserModel ={
    isUserExist(email:string):Promise<Pick<Iuser,'email'>>;
    isPasswordMatch(
        givenPassword:string,
        savePassword:string
    ):Promise<boolean>;
}
& Model<Iuser>