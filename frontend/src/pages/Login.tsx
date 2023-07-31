
    
    import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";
import { useLoginUserMutation } from "../redux/feature/auth/authApi";
import { IUser } from "../types";

// interface IResponse {
//     success: boolean;
//     message: string;
//     accessToken: string;
// }

    function Login() {
        const { register, handleSubmit } = useForm<IUser>();
        const [loginUser] = useLoginUserMutation();
        const [authLoading, setAuthLoading] = useState(false);

        const handelLogin = async (data: IUser): Promise<void> => {
            setAuthLoading(true);
            try {
                const {data:response} = await loginUser(data);
                const cookie = response.data.refreshToken;
                console.log(cookie, "cookie");
                
            Cookies.set("refreshToken", cookie, { expires: 365 }); 
               
                console.log(response, "response");
            } catch (error) {
                console.log(error);
            } finally {
                setAuthLoading(false);
            }
        };

        return (
            <div className="flex  h-screen items-center justify-center bg-gray-100 py-10">
                <form
                    onSubmit={handleSubmit(handelLogin)}
                    className="mx-6 flex w-full flex-col space-y-6 rounded-lg border bg-white px-7 py-10 shadow-lg lg:w-2/5"
                >
                    {/* logo */}
                    <div className="mx-auto w-44">
                        <img className="mx-auto" src={logo} alt="logo"/>
                    </div>

                    {authLoading && (
                        <div>
                            <p>Loading...</p>
                        </div>
                    )}

                    <>
                        <input
                            className="rounded-lg border-gray-300 pl-3  py-4 text-sm shadow transition hover:shadow-lg"
                            type="email"
                            required
                            placeholder="Email"
                            {...register("email")}
                        />
                        <input
                            className="rounded-lg border-gray-300 pl-3 py-4  text-sm shadow transition hover:shadow-lg"
                            type="password"
                            required
                            placeholder="Password"
                            {...register("password")}
                        />

                        <button className="bg-blue-800 p-3 rounded-sm text-white font-bold" type="submit">
                            Login
                        </button>
                    </>

                    {/* already registered */}
                    {/* {!verify.success && (
                        <p className="text-center text-sm font-semibold">
                            Already have an account ?{" "}
                            <Link href="/login">
                                <a className="text-blue-500">Login</a>
                            </Link>
                        </p>
                    )} */}
                </form>
            </div>
        );
    }
    export default Login;

