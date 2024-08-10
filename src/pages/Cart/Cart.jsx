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

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  console.log(cartData);

  const calculateTotalPrice = () => {
    return cartData.reduce(
      (acc, item) => acc + (item.price || 1000) * (item.quantity || 1),
      0
    );
  };

  return (
    <div className="w-full">
      {cartData.length > 0 ? (
        <div className="relative flex w-full">
          <div className="grid w-4/5 grid-cols-4 gap-4">
            <div className="col-span-4 h-full w-full bg-white px-4">
              <div className="sticky top-[80px] z-10 flex items-center justify-between border-b-[1px] border-b-gray-400 bg-white py-3">
                <h2 className="text-3xl font-medium">Shopping Cart</h2>
              </div>
              <div>
                {cartData.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full items-center gap-6 border-b-[1px] border-b-gray-300 p-4"
                  >
                    <div className="flex w-full items-center gap-6">
                      <div className="w-1/5">
                        <img
                          className="h-44 w-full object-contain"
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                          alt={item.name}
                        />
                      </div>
                      <div className="w-3/5">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-base">
                          Unit Price:{" "}
                          <span className="font-semibold">
                            ₹{item.price / 100 || item.defaultPrice / 100}
                          </span>
                        </p>
                        <div className="flex w-24 items-center justify-center gap-1 rounded-md bg-[#f0f2f2] py-1 text-center drop-shadow-lg">
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
                          className="mt-2 w-36 rounded-lg bg-red-500 py-1 text-white duration-300 hover:bg-red-700 active:bg-red-900"
                        >
                          Delete Item
                        </button>
                      </div>
                      <div>
                        <p className="font-titleFont text-lg font-semibold">
                          ₹
                          {((item.price || item.defaultPrice) *
                            (item.quantity || 1)) /
                            100}
                        </p>
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
                  className="mt-2 w-36 rounded-lg bg-red-600 py-1 text-white duration-300 hover:bg-red-700 active:bg-red-800"
                >
                  {cartData.length === 0 ? <p>Cart is Empty</p> : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>
          <div className="fixed right-10 top-36 w-[25%] border bg-white px-4 py-5 shadow-md">
            <div className="flex gap-8">
              <div className="flex items-center justify-center gap-3 bg-white">
                <span>
                  <FaCheckCircle className="rounded-full bg-white text-3xl text-green-500" />
                </span>
                <p>
                  Your order qualifies for FREE Shipping. Choose this option at
                  Checkout. See details...
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
            <button className="font-titleFont mt-3 w-full rounded-md border border-[#F15700] bg-gradient-to-tr from-[#F15700] to-[#F15700] py-1.5 text-base font-medium text-white duration-200 hover:border-[#d14a00] hover:from-[#e85100] hover:to-[#e85100] active:bg-gradient-to-bl active:from-[#d14a00] active:to-[#d14a00]">
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-96">
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
