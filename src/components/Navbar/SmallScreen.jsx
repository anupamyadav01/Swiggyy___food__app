/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { setToggleSignIn } from "../../utils/slices/toggleSignInSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

const SmallScreen = ({ handleLocationFunc, isActive, setIsActive }) => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(
    (state) => state.cartSlice.cartItems.length
  );
  const address = useSelector((state) => state.addressSlice.address);

  return (
    <div>
      {/* for small screen  */}
      <div
        className={`absolute left-0 z-50 flex w-full flex-col bg-white transition-all duration-500 lg:hidden ${isActive ? "translate-y-0" : "-translate-y-[100%]"}`}
      >
        {/* navbar */}
        <div className="z-50 w-full px-16 shadow-lg">
          <div className="flex w-full items-center justify-between pb-4">
            <div className="flex items-center">
              <Link to={"/"} className="cursor-pointer pr-10">
                <svg
                  className="_8pSp-"
                  viewBox="0 0 559 825"
                  height="49"
                  width="34"
                  fill="#fc8019"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M542.92 388.542C546.805 366.526 542.355 349.598 530.881 340.76C513.621 327.466 487.698 320.236 425.954 320.236C380.271 320.236 331.225 320.286 310.268 320.275C308.322 319.894 301.285 317.604 301.02 309.112L300.734 174.289C300.727 165.779 307.531 158.857 315.943 158.839C324.369 158.825 331.204 165.723 331.211 174.226C331.211 174.226 331.421 247.414 331.441 273.424C331.441 275.936 332.892 281.8 338.549 283.328C375.43 293.267 561.865 285.999 558.967 251.804C543.147 109.96 424.476 0 280.394 0C235.021 0 192.065 10.9162 154.026 30.2754C62.9934 77.5955 -1.65904 173.107 0.0324268 283.43C1.23215 361.622 52.2203 500.605 83.434 521.234C97.8202 530.749 116.765 527.228 201.484 527.228C239.903 527.228 275.679 527.355 293.26 527.436C295.087 527.782 304.671 530.001 304.671 538.907L304.894 641.393C304.915 649.907 298.104 656.826 289.678 656.829C281.266 656.843 274.434 649.953 274.42 641.446C274.42 641.446 275.17 600.322 275.17 584.985C275.17 581.435 275.424 575.339 265.178 570.727C231.432 555.553 121.849 564.712 115.701 581.457C113.347 587.899 125.599 612.801 144.459 644.731C170.102 685.624 211.889 747.245 245.601 792.625C261.047 813.417 268.77 823.813 280.467 824.101C292.165 824.389 300.514 814.236 317.213 793.928C383.012 713.909 516.552 537.663 542.92 388.542Z"
                    fill="url(#paint0_linear_19447_66107)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_19447_66107"
                      x1="445.629"
                      y1="63.8626"
                      x2="160.773"
                      y2="537.598"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF993A"></stop>
                      <stop offset="1" stopColor="#F15700"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </Link>
              <div
                className="flex items-center gap-3"
                onClick={handleLocationFunc}
              >
                <p className="cursor-pointer border-b-2 border-b-black font-bold hover:border-b-2 hover:border-b-orange-500 hover:text-orange-500">
                  Others
                </p>
                <p className="text-sm text-gray-500">
                  {address.substring(0, 38)}
                </p>
                <i className="fi fi-rr-angle-small-down mt-2 cursor-pointer text-2xl text-orange-600"></i>
              </div>
            </div>

            <div
              className="cursor-pointer"
              onClick={() => setIsActive(!isActive)}
            >
              <IoClose size={30} />
            </div>
          </div>
        </div>
        {/* navbar */}
        {/* navlinks  */}
        <div
          className={`flex h-screen w-full flex-col items-center justify-center gap-6 bg-white text-[#374151]`}
        >
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
      </div>
      {/* for small screen  */}
    </div>
  );
};

export default SmallScreen;
