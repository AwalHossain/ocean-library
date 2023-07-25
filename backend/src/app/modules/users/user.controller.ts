import { Request, RequestHandler, Response } from "express";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./user.interface";
import { UserService } from "./user.service";



const createUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const  userData  = req.body;
      console.log(userData,'userData');
      
      const result = await UserService.createUser( userData);
      const { refreshToken, ...others } = result;

      // set refresh token into cookie
      const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
      };
    
      res.cookie('refreshToken', refreshToken, cookieOptions);
    
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: others,
      });
    }
  );



const loginUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const  userData  = req.body;
      console.log(userData,'userData');
      
      const result = await UserService.loginUser( userData);
      const { refreshToken, ...others } = result;

      // set refresh token into cookie
      const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
      };
    
      res.cookie('refreshToken', refreshToken, cookieOptions);
    
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: others,
      });
    }
  );


  const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
  
    const result = await UserService.refreshToken(refreshToken);
  
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
  
    res.cookie('refreshToken', refreshToken, cookieOptions);
  
    sendResponse<ILoginUserResponse>(res, {
      statusCode: 200,
      success: true,
      message: 'User logged in successfully !',
      data: result,
    });
  });



  export const UserController = {
    createUser,
    loginUser,
    refreshToken
    }