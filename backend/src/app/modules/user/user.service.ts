import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
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

  const { email, _id } = isUserExist;

  console.log(isUserExist, 'isUserExist');

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
};

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
      _id: isUserExist._id,
      email: isUserExist.email,
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
  refreshToken
};
