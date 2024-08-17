import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchLocation } from "../../utils/slices/toggleSlice";
import { setToggleSignIn } from "../../utils/slices/toggleSignInSlice";
import SignIn from "../SignIn/SignIn";
import SwiggyLogo from "../../assets/swiggy-logo.svg";
// import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import SmallScreen from "./SmallScreen";
import { useState } from "react";
const Navbar = () => {
  const dispatch = useDispatch();
  const handleLocationFunc = () => {
    dispatch(toggleSearchLocation());
  };
  const address = useSelector((state) => state.addressSlice.address);
  const { displayName, photoURL, email } = useSelector(
    (state) => state.userSlice.user
  );
  console.log(displayName, photoURL, email);

  const cartItemsCount = useSelector(
    (state) => state.cartSlice.cartItems.length
  );
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="sticky top-0 z-50 h-20 w-full bg-white px-16 py-4 shadow-md">
      {/* small screen  */}

      <SmallScreen
        handleLocationFunc={handleLocationFunc}
        isActive={isActive}
        setIsActive={setIsActive}
      />

      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <div className="flex items-center">
          <Link to={"/"} className="cursor-pointer pr-10">
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

        <div className={`hidden items-center gap-12 text-[#374151] lg:flex`}>
          <Link
            to={"/search"}
            className="flex cursor-pointer items-center gap-2"
          >
            <i className="fi fi-rr-search mt-1 text-xl"></i>
            <p className="text-lg font-medium">Search</p>
          </Link>{" "}
          <div
            onClick={() => dispatch(setToggleSignIn())}
            className="flex cursor-pointer items-center gap-2"
          >
            <i className="fi fi-rr-user mt-1 text-xl"></i>
            <p className="text-lg font-medium">Sign in</p>
          </div>{" "}
          <Link to={"/cart"} className="flex cursor-pointer items-center gap-2">
            <i className="fi fi-rr-shopping-cart-add mt-1 text-xl"></i>
            <p className="text-lg font-medium">Cart</p>
            <p className="text-lg font-medium">{cartItemsCount}</p>
          </Link>
        </div>
        <CgMenuRight
          size={30}
          onClick={() => setIsActive(!isActive)}
          className="lg:hidden"
        />
      </div>

      <SignIn />
    </div>
  );
};

export default Navbar;
