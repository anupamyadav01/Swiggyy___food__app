/* eslint-disable react/prop-types */
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setToggleSignIn } from "../../utils/slices/toggleSignInSlice";
import Login_logo from "../../assets/signin_logo.webp";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebase.config";
import { useState } from "react";
import { updateUser } from "../../utils/slices/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [user, setUser] = useState({});
  const isLogin = true;
  const isSubmitting = false;
  const toggleSignIn = useSelector(
    (state) => state.toggleSignInSlice.toggleSignIn
  );
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(updateUser(user));
      setShowLoginBox(false);
      console.log(user);
    } catch (error) {
      console.log("error while logging" + error);
    }
  };
  const handleSetLogin = () => {};

  return (
    <>
      <div
        className={`fixed right-0 top-0 z-[60] h-screen w-full overflow-y-scroll bg-white p-4 transition-all duration-500 sm:w-[50%] md:p-8 lg:w-[35%] ${
          toggleSignIn ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form className="w-full md:w-[85%]">
          <X
            size={"2rem"}
            className="cursor-pointer font-light text-gray-500"
            onClick={() => dispatch(setToggleSignIn())}
          />
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold capitalize">Sign in</h1>
              <p className="text-[0.9rem]">
                or{" "}
                <button
                  className="font-semibold text-[#FC8019]"
                  onClick={handleSetLogin}
                >
                  {isLogin === "login"
                    ? "create an account"
                    : "login to your account"}
                </button>
              </p>
            </div>
            <img src={Login_logo} alt="Login Logo" className="h-28 w-28" />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <input
                type="email"
                className="w-full border border-gray-500 px-4 py-2"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full border border-gray-500 px-4 py-2"
                placeholder="Password"
              />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                className={`w-full ${
                  isSubmitting ? "bg-[#adadad]" : "bg-[#FC8019]"
                } rounded-md py-3 text-[0.9rem] font-semibold uppercase text-white`}
              >
                {isSubmitting ? "submitting..." : "continue"}
              </button>
              <p className="text-xs">
                By creating an account, I accept the Terms & Conditions &
                Privacy Policy
              </p>
            </div>
            <div className="text-center">
              <span className="bg-white px-2 text-gray-700">
                Or continue with
              </span>
              <div className="mt-4">
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="flex w-full items-center justify-center space-x-2 rounded-md border bg-white px-4 py-2 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
                >
                  <FcGoogle className="h-7 w-7" />
                  <span className="text-lg font-medium text-gray-700">
                    Sign in with Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
