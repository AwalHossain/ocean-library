
// import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.svg";
import { useRegisterUserMutation } from "../redux/feature/auth/authApi";
import { useAppSelector } from "../redux/hooks";
import { IUser } from "../types";

function Signup() {
    const { register, handleSubmit } = useForm<IUser>();
    const [registerUser, { isLoading, isError, error, isSuccess, }] =
        useRegisterUserMutation();
    const [authLoading, setAuthLoading] = useState(false);
    const { user } = useAppSelector(state => state.userState)

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/';


    const handelRegister = async (data: IUser): Promise<void> => {

        setAuthLoading(true);
        try {
            const { data: res } = await registerUser(data) as { data: any };
            console.log(res, "ree");

            const cookie = res?.data?.refreshToken;
            if(cookie){
                Cookies.set("refreshToken", cookie, { expires: 365 });
            
            }
        } catch (error) {
            console.log(error);
        } finally {
            setAuthLoading(false);
        }
        console.log(data, 'data');

    };

    useEffect(() => {

        if (isSuccess && !isLoading) {
            toast.success('You successfully signup ');

            navigate(from);

              // Reload the page after successful signup
              window.location.reload();
        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    })
                );
            } else {
                toast.error((error as any).data.message, {
                    position: 'top-right',
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <div className="flex  h-screen items-center justify-center bg-gray-100 py-10">
            <form
                onSubmit={handleSubmit(handelRegister)}
                className="mx-6 flex w-full flex-col space-y-6 rounded-lg border bg-white px-7 py-10 shadow-lg lg:w-2/5"
            >
                {/* logo */}
                <div className="mx-auto w-44">
                    <img className="mx-auto" src={logo} alt="logo" />
                </div>

                {/* {authLoading && (
                        <div>
                            <CircleLoader />
                        </div>
                    )} */}

                <>
                    <input
                        className="rounded-lg border-gray-300 pl-3  py-4 text-sm shadow transition hover:shadow-lg"
                        type="text"
                        required
                        placeholder="Name"
                        {...register("name")}
                    />
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

                 { isLoading ? <p>Loading...</p> :
                   <button className="bg-blue-800 p-3 rounded-sm" type="submit">
                        Sign up
                    </button>}
                </>

                {/* already registered */}
                <p className="text-center text-lg font-semibold">
                    already registered ?{" "}
                    <Link to="/login">
                        <a className="text-blue-500">Login</a>
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;