/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();
  const [authLoading, setAuthLoading] = useState(false);
  const { user } = useAppSelector((state) => state.userState);

  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || "/";

  const handelRegister = async (data: IUser): Promise<void> => {
    setAuthLoading(true);
    try {
      const { data: res } = (await registerUser(data)) as { data: any };
      console.log(res, "ree");

      const cookie = res?.data?.refreshToken;
      if (cookie) {
        Cookies.set("refreshToken", cookie, { expires: 365 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
    console.log(data, "data");
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success("You successfully signup ");

      navigate(from);

      // Reload the page after successful signup
      window.location.reload();
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#F9F6EA]">
      <form
        onSubmit={handleSubmit(handelRegister)}
        className="flex w-full max-w-[500px] flex-col p-6 my-24 sm:my-6 sm:p-3"
      >
        {/* logo */}
        <div className="mx-auto">
          <p className="primary-color text-[22px] sm:text-[20px] md:text-[22px] font-medium text-center mb-2">
            Hello new comers,
          </p>
          <div className=" w-full">
            <img className="mx-auto" src={logo} alt="logo" />
          </div>
          {/* <p className="tertiary-color text-[25px] font-medium  text-center mb-[20px] mt-[15px]">
              Sign In
            </p> */}
        </div>

        {/* <div className="bg-gray-200 rounded-lg p-3 mb-6">
            <p className="font-semibold">Default Login Credentials:</p>
            <p>Email: admin@admin.com</p>
            <p>Password: 123456</p>
          </div> */}

        {authLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}

        <div className="flex flex-col space-y-3 my-[20px]">
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="pl-5 pb-1 tertiary-color text-lg font-medium"
            >
              Enter your name
            </label>
            <input
              className="rounded-[25px] bg-[#EEE9CE] pl-3 py-[10px] text-md shadow transition duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:tertiary-color"
              type="text"
              required
              {...register("name")}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="pl-5 pb-1 tertiary-color text-lg font-medium"
            >
              Email
            </label>
            <input
              className="rounded-[25px] bg-[#EEE9CE] pl-3 py-[10px] text-md shadow transition duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-tertiary-color"
              type="email"
              required
              {...register("email")}
            />
          </div>
          <div className="flex flex-col pb-5">
            <label
              htmlFor=""
              className="pl-5 pb-1 tertiary-color text-lg font-medium"
            >
              Password
            </label>
            <input
              className="rounded-[25px] bg-[#EEE9CE] pl-3 py-[10px] text-md shadow transition duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:tertiary-color"
              type="password"
              required
              {...register("password")}
            />
          </div>
          <div className="w-full text-center">
            <button
              className="p-3 w-[235px] rounded-full mx-auto text-white bg-main font-medium transition duration-200 ease-in-out hover:bg-[#8b7414] focus:outline-none focus:ring-2 focus:ring-[#8b7414]"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
        {/* already registered */}
        {/* {!verify.success && (
                          <p className="text-center text-sm font-semibold">
                              Already have an account ?{" "}
                              <Link href="/login">
                                  <a className="text-blue-500">Login</a>
                              </Link>
                          </p>
                      )} */}
        {/* <div> */}
        <p className="text-center text-lg font-medium tertiary-color mb-3">
          Alread member of oceanLibrary?{" "}
        </p>
        <Link to="/login" className="block w-full mx-auto text-center">
          <button className="w-[200px] p-3 rounded-full border font-medium border-[#8b7414] secondary-color mx-auto">
            Login
          </button>
        </Link>
        {/* </div> */}
      </form>
    </div>
  );
}

export default Signup;
