import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import {
  deleteItem,
  clearCart,
  increaseItem,
  decreaseItem
} from "../../utils/slices/cartSlice";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { setToggleSignIn } from "../../utils/slices/toggleSignInSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const user = useSelector((state) => state.userSlice.user);
  // console.log(cartData);
  const resInfoLocalStorage = JSON.parse(
    localStorage.getItem("restaurantInfo")
  );
  const calculateTotalPrice = () => {
    return cartData.reduce(
      (acc, item) =>
        acc +
        (item.price / 100 || item.defaultPrice / 100) * (item.quantity || 1),
      0
    );
  };
  const handlePayment = () => {
    if (!user) {
      toast.error("Login to continue", {
        duration: 1000
      });
      setTimeout(() => {
        dispatch(setToggleSignIn());
      }, 1000);
    } else {
      toast.success("Payment Successful", {
        duration: 2000
      });
      dispatch(clearCart());
    }
  };
  // console.log(resInfoLocalStorage);

  return (
    <div className="h-full w-full">
      {cartData.length > 0 ? (
        <>
          <Link
            to={`/restaurant/${resInfoLocalStorage?.id}`}
            className="mx-8 mt-4 flex w-full gap-1 bg-white sm:gap-7"
          >
            <div className="w-28">
              <img
                className="w-full"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${resInfoLocalStorage?.cloudinaryImageId}`}
                alt=""
              />
            </div>
            <span>
              <h1 className="text-2xl font-bold text-gray-700">
                {resInfoLocalStorage?.name}
              </h1>
              <p className="text-sm text-gray-500">
                {resInfoLocalStorage?.city}
              </p>
            </span>
          </Link>
          <div className="relative flex w-full">
            <div className="grid w-full grid-cols-4 gap-4 sm:w-4/5">
              <div className="col-span-4 h-full w-full bg-white px-1 sm:px-4">
                <div className="sticky top-[80px] z-10 flex w-full items-center justify-between border-b-[2px] border-b-gray-300 bg-white py-3">
                  <h2 className="ml-4 text-3xl font-medium">Shopping Cart</h2>
                </div>
                <div>
                  {cartData.map((item) => (
                    <div
                      key={item.id}
                      className="flex w-full items-center border-b-[1px] border-b-gray-300 sm:gap-6 sm:p-4"
                    >
                      <div className="grid w-full grid-cols-5 sm:gap-8">
                        <div className="col-span-2">
                          <img
                            className="h-44 w-full object-contain"
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                            alt={item.name}
                          />
                        </div>
                        <div className="col-span-2 ml-10 mt-3 flex w-3/5 flex-col">
                          <h2 className="whitespace-nowrap text-justify text-base font-semibold">
                            {item.name}
                          </h2>
                          <div className="flex text-base">
                            <span className="whitespace-nowrap">
                              Unit Price:{" "}
                            </span>
                            <span className="font-semibold">
                              ₹{item.price / 100 || item.defaultPrice / 100}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 py-3 sm:block">
                            <div className="flex w-24 items-center justify-center gap-1 rounded-md bg-[#f0f2f2] px-2 py-1 drop-shadow-lg">
                              <p>Qty:</p>
                              <p
                                onClick={() => dispatch(decreaseItem(item.id))}
                                className="cursor-pointer rounded-md bg-gray-200 px-1 duration-300 hover:bg-gray-400"
                              >
                                -
                              </p>
                              <p>{item.quantity || 1}</p>
                              <p
                                onClick={() => dispatch(increaseItem(item.id))}
                                className="cursor-pointer rounded-md bg-gray-200 px-1 duration-300 hover:bg-gray-400"
                              >
                                +
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                toast.success("Item Deleted", {
                                  position: "top-right"
                                });
                                dispatch(deleteItem(item.id));
                              }}
                              className="w-24 whitespace-nowrap rounded-lg bg-red-600 px-2 py-1.5 text-sm text-white duration-300 hover:bg-red-700 active:bg-red-900 sm:text-base"
                            >
                              Delete Item
                            </button>
                          </div>
                          <div>
                            <p className="font-titleFont whitespace-nowrap text-lg font-semibold">
                              Total Price :₹
                              {((item.price || item.defaultPrice) *
                                (item.quantity || 1)) /
                                100}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center p-5">
                  <button
                    onClick={() => {
                      toast.success("Your cart is Empty", {
                        position: "top-right"
                      });
                      dispatch(clearCart());
                    }}
                    className="mt-2 w-36 rounded-md border border-[#F15700] py-2 text-lg font-medium text-[#F15700] duration-300 hover:bg-[#F15700] hover:text-white"
                  >
                    {cartData.length === 0 ? (
                      <p>Cart is Empty</p>
                    ) : (
                      "Clear Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="right-10 top-36 hidden w-[24%] border bg-white px-4 py-5 shadow-md sm:fixed">
              <div className="flex gap-8">
                <div className="flex items-center justify-center gap-3 bg-white">
                  <span>
                    <FaCheckCircle className="rounded-full bg-white text-3xl text-green-500" />
                  </span>
                  <p>
                    Your order qualifies for FREE Shipping. Choose this option
                    at Checkout. See details...
                  </p>
                </div>
              </div>
              <div>
                <p className="flex items-center justify-center gap-2 p-4 px-10 font-semibold">
                  Total:{" "}
                  <span className="text-lg font-bold">
                    ₹{calculateTotalPrice().toFixed(2)}
                  </span>
                </p>
              </div>
              <button
                onClick={handlePayment}
                className="font-titleFont mt-3 w-full rounded-md border border-[#F15700] bg-gradient-to-tr from-[#F15700] to-[#F15700] py-1.5 text-base font-medium uppercase tracking-[2px] text-white duration-200 hover:border-[#d14a00] hover:from-[#e85100] hover:to-[#e85100] active:bg-gradient-to-bl active:from-[#d14a00] active:to-[#d14a00]"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="relative top-[100px] flex w-full flex-col items-center justify-center">
          <div className="w-60">
            <img
              className="w-full rounded-xl"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt="Empty Cart"
            />
          </div>
          <div className="flex w-96 flex-col items-center rounded-md p-4">
            <h1 className="font-titleFont text-xl font-bold">
              Your cart is empty
            </h1>
            <p className="text-center text-sm">
              You can go to home page to view more restaurants
            </p>
            <Link to="/">
              <button className="font-titleFont mt-3 w-full rounded-md border border-[#F15700] bg-gradient-to-tr from-[#F15700] to-[#F15700] px-4 py-1.5 text-base font-medium uppercase text-white duration-200 hover:border-[#d14a00] hover:from-[#e85100] hover:to-[#e85100] active:bg-gradient-to-bl active:from-[#d14a00] active:to-[#d14a00]">
                See restaurants near you
              </button>
            </Link>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Cart;
