import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { userApi } from "../redux/api/userApi";


interface IProps {
  children: ReactNode;
  allowedRoles: string[]
}

function AuthenticatedLayout({ allowedRoles, children }: IProps) {
  //  const cookie =  Cookies.get("refreshToken")
   const location = useLocation();
const {isLoading, isFetching} = userApi.endpoints.getMe.useQuery(null,{
  skip: false,
  refetchOnMountOrArgChange: true
})

const loading = isLoading || isFetching;

// console.log(loading,'checki');


const {data} = userApi.endpoints.getMe.useQueryState(null,{
  selectFromResult: (data) => data!,
})

console.log(data,'user');


if(loading){
  return <div>Loading.....</div>
}

    return data && allowedRoles.includes(data.role) ? (
      
        children
      
    ): (
      <Navigate to="/login" state={{from:location}} replace />
    )
        
}


export default AuthenticatedLayout;
