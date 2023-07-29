
// import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";
import { IUser } from "../types";

function Signup() {
    const { register, handleSubmit } = useForm<IUser>();
    // const { register: signUp, verify, authLoading, verifyOtp } = useAuth();
    // const [counter, setCounter] = useState(59);
    // const [tempData, setTempData] = useState<any>({});

    // set otp minutes
    // let timer: any;

    useEffect(() => {
        // if (verify.success) {
        //     timer = setInterval(() => {
        //         if (counter === 0) {
        //             return setCounter(0);
        //         }
        //         setCounter(counter - 1);
        //     }, 1000);
        // }

        // return () => clearInterval(timer);
    }, []);

    const handelRegister = async (data: IUser): Promise<void> => {
        // if (data.password!.length < 6) {
        //     return cogoToast.error("Password must be at least 6 characters !!!");
        // }
        // if (verify.success) {
        //     await verifyOtp(data);
        // } else {
        //     await signUp(data);
        // }
        // setTempData(data);
        console.log(data, 'data');
        
    };

    // const resendOtp = async () => {
    //     setCounter(59);
    //     await signUp(tempData);
    // };

    return (
            <div className="flex  h-screen items-center justify-center bg-gray-100 py-10">
                <form
                    onSubmit={handleSubmit(handelRegister)}
                    className="mx-6 flex w-full flex-col space-y-6 rounded-lg border bg-white px-7 py-10 shadow-lg lg:w-2/5"
                >
                    {/* logo */}
                    <div className="mx-auto w-44">
                        <img className="mx-auto" src={logo} alt="logo"/>
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

                            <button className="bg-blue-800 p-3 rounded-sm" type="submit">
                                Sign up
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

export default Signup;