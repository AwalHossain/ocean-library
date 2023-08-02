import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { Types } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginUserResponse, IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<ILoginUserResponse> => {
  const isUserExist = await User.isUserExist(user.email);
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exist');
  }

  const result = await User.create(user);

  //create access token & refresh token

  const { email, role } = result;

  const accessToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (user: IUser): Promise<ILoginUserResponse> => {
  const isUserExist = await User.isUserExist(user.email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(user.password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
  }

  //create access token & refresh token

  const { email, role } = isUserExist;

  console.log(isUserExist, 'isUserExist');

  const accessToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};


const wishlist =   async (user: JwtPayload | null, productId:string) => {

    // want to push the product id in the wishlist

    const existingUser = await User.findOne({email: user?.email});
    if (!existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
    }

    existingUser.wishlist?.push(new Types.ObjectId(productId));
    await existingUser.save(); 

  }


  const readingList =   async (user: JwtPayload | null, productId:string) => {
    // want to push the product id in the reading list

    const existingUser = await User.findOne({email: user?.email});
    if (!existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
    }

    existingUser.readingList?.push(new Types.ObjectId(productId));
    await existingUser.save(); 

  }
  const finishedBooks =   async (user: JwtPayload | null, productId:string) => {
    // want to push the product id in the reading list

    const existingUser = await User.findOne({email: user?.email});
    if (!existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist');
    }

    existingUser.readingList?.push(new Types.ObjectId(productId));
    await existingUser.save(); 

  }

const refreshToken = async (token: string): Promise<ILoginUserResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { email } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  wishlist,
  readingList,
  finishedBooks,
};
