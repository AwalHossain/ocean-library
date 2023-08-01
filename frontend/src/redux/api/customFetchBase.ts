import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout } from '../feature/auth/userSlice';
  
  const baseUrl = `http://127.0.0.1:3000/api/v1/`;
  
  // Create a new mutex
  const mutex = new Mutex();
  
  const baseQuery = fetchBaseQuery({
    baseUrl,
  });
  
  const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    console.log("lim",result, api,"result"); 
    
    if ((result.error?.data as any)?.message === 'You are not logged in') {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
  
        try {
          const refreshResult = await baseQuery(
            { credentials: 'include', url: 'users/refresh-token' },
            api,
            extraOptions
          )
            
          if (refreshResult.data) {
              // Retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
            window.location.href = '/login';
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  
    return result;
  };
  
  export default customFetchBase;