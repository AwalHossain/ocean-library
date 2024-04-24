import Cookies from 'js-cookie';
import React from 'react';
import { userApi } from '../redux/api/userApi';

type IAuthMiddleware = {
    children: React.ReactElement;
  };


const AuthMiddleware:React.FC<IAuthMiddleware> = ({children}) => {
    const cookie = Cookies.get('refreshToken')
    const {  isLoading } = userApi.endpoints.getMe.useQuery(null);
      

   if (isLoading) {
    return <div> 
        Looading......
    </div>;
  }

  return children;
}

export default AuthMiddleware