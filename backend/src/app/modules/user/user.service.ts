import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ILoginUserResponse, IUser } from "./user.interface";
import { User } from "./user.model";




const createUser = async (
    user: IUser
  ): Promise<ILoginUserResponse> => {

    const isUserExist = await User.isUserExist(user.email);
    if(isUserExist){
        throw new ApiError(httpStatus.BAD_REQUEST,'User already exist');
    }

    
    const result = await User.create(user);

      //create access token & refresh token



      const { email, _id } = result;

  const accessToken = jwtHelpers.createToken(
    { email, _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );



    return {
      accessToken,
      refreshToken,
    };

  }



    export const UserService = {
        createUser
        }   