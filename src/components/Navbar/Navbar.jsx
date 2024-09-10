import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchLocation } from "../../utils/slices/toggleSlice";
import { setToggleSignIn } from "../../utils/slices/toggleSignInSlice";
import SignIn from "../SignIn/SignIn";
import SwiggyLogo from "../../assets/swiggy-logo.svg";
import { CgMenuRight } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase.config";
import { clearUser } from "../../utils/slices/userSlice";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector((state) => state.addressSlice.address);
  const user = useSelector((state) => state?.userSlice?.user);
  const cartItemsCount = useSelector(
    (state) => state.cartSlice.cartItems.length
  );

  const [isActive, setIsActive] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLocationFunc = () => {
    dispatch(toggleSearchLocation());
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(clearUser());
        navigate("/");
        setShowLogout(false);
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sticky top-0 z-50 h-20 w-full bg-white px-4 py-4 shadow-md sm:px-16">
      {/* Responsive Navigation */}
      <div className={`lg:hidden absolute left-0 z-50 flex w-full flex-col bg-white transition-all duration-500 ${isActive ? "translate-y-0" : "-translate-y-[110%]"}`}>
        <div className="z-50 w-full px-4 shadow-lg sm:px-16">
          <div className="flex w-full items-center justify-between pb-4">
            <div className="flex items-center">
              <Link to={"/"} className="cursor-pointer pr-3">
                <img src={SwiggyLogo} alt="swiggy-logo" className="h-12" />
              </Link>
              <div className="flex items-center gap-1" onClick={handleLocationFunc}>
                <p className="cursor-pointer border-b-2 border-b-black font-bold hover:border-b-2 hover:border-b-orange-500 hover:text-orange-500">
                  Others
                </p>
                <p className="text-sm text-gray-500">
                  {address.substring(0, 38)}
                </p>
                <i className="fi fi-rr-angle-small-down mt-2 cursor-pointer text-2xl text-orange-600"></i>
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => setIsActive(!isActive)}>
              <IoClose size={30} />
            </div>
          </div>
          <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-white text-[#374151] border border-black">
            <Link to={"/search"} className="flex cursor-pointer items-center gap-2">
              <i className="fi fi-rr-search mt-1 text-xl"></i>
              <p className="text-lg font-medium">Search</p>
            </Link>
            <div onClick={() => dispatch(setToggleSignIn())} className="flex cursor-pointer items-center gap-2">
              <i className="fi fi-rr-user mt-1 text-xl"></i>
              <p className="text-lg font-medium">Sign in</p>
            </div>
            <Link to={"/cart"} className="flex cursor-pointer items-center gap-2">
              <i className="fi fi-rr-shopping-cart-add mt-1 text-xl"></i>
              <p className="text-lg font-medium">Cart</p>
              <p className="text-lg font-medium">{cartItemsCount}</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <div className="flex items-center">
          <Link to={"/"} className="cursor-pointer pr-3 sm:pr-10">
            <img src={SwiggyLogo} alt="swiggy-logo" className="h-12" />
          </Link>
          <div className="flex items-center gap-3" onClick={handleLocationFunc}>
            <p className="cursor-pointer border-b-2 border-b-black font-bold hover:border-b-2 hover:border-b-orange-500 hover:text-orange-500">
              Others
            </p>
            <p className="text-sm text-gray-500">{address.substring(0, 38)}</p>
            <i className="fi fi-rr-angle-small-down mt-2 cursor-pointer text-2xl text-orange-600"></i>
          </div>
        </div>
    {/* TODO : APPLY RESPONSIVE NAVBAR */}
        <div className="hidden sm:items-center sm:gap-12 sm:flex text-[#374151]">
          <Link to={"/search"} className="flex cursor-pointer items-center gap-2">
            <i className="fi fi-rr-search mt-1 text-xl"></i>
            <p className="text-lg font-medium">Search</p>
          </Link>
          {user ? (
            <div className="flex cursor-pointer items-center gap-2">
              <div className="relative">
                <img
                  onClick={() => setShowLogout(!showLogout)}
                  src={user.photoURL}
                  alt="user"
                  className="h-10 w-10 rounded-full duration-200 active:scale-90"
                />
                {showLogout && (
                  <div className="absolute -right-40 top-16 flex w-fit flex-col items-center rounded-xl bg-[#FC8019] px-5 py-4 text-white">
                    <p className="mb-4 whitespace-nowrap text-lg font-medium">
                      Hi, {user.displayName || "User"}
                    </p>
                    <p className="mb-2 text-center text-sm">
                      Want to Log Out?
                    </p>
                    <button
                      onClick={handleLogOut}
                      className="rounded-md border border-white px-3 py-1 text-lg font-medium text-white duration-100 hover:scale-90"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div onClick={() => dispatch(setToggleSignIn())} className="flex cursor-pointer items-center gap-2">
              <i className="fi fi-rr-user mt-1 text-xl"></i>
              <p className="text-lg font-medium">Sign in</p>
            </div>
          )}
          <Link to={"/cart"} className="flex cursor-pointer items-center gap-2">
            <i className="fi fi-rr-shopping-cart-add mt-1 text-xl"></i>
            <p className="text-lg font-medium">Cart</p>
            <p className="text-lg font-medium">{cartItemsCount}</p>
          </Link>
        </div>
        <CgMenuRight size={30} onClick={() => setIsActive(!isActive)} className="md:hidden" />
      </div>

      <Toaster />
      <SignIn />
    </div>
  );
};

export default Navbar;
