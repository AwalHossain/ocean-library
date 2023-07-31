import Cookies from "js-cookie";
import { useRefreshTokenMutation } from "../redux/feature/auth/authApi";


interface Props {
    children: React.ReactNode;
}


function AuthenticatedLayout({ children }: Props) {
   const cookie =  Cookies.get("refreshToken")
const [refreshToken] = useRefreshTokenMutation();


const handleRefreshToken = async () => {
  const { data } = await refreshToken(cookie);
  // Handle the response from the server
  console.log(data, "cookie");
};

  handleRefreshToken();  
    return <div>
        {children}
    </div>
        
}


export default AuthenticatedLayout;
