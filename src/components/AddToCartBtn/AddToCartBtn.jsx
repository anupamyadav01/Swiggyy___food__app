/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../utils/slices/cartSlice";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

function AddToCartBtn({ info, restaurantInfo }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const handleAddToCart = () => {
    console.log(restaurantInfo);
    const resInfoLocalStorage = JSON.parse(
      localStorage.getItem("restaurantInfo")
    );
    const isItemAdded = cartItems.find((item) => item.id === info.id);
    if (!isItemAdded) {
      if (resInfoLocalStorage.name === restaurantInfo.name) {
        dispatch(addToCart(info));
        localStorage.setItem("restaurantInfo", JSON.stringify(restaurantInfo));
        toast.success("Item added to cart", {
          position: "top-right"
        });
      } else {
        toast.error("Different Restaurant Item", {
          position: "top-right"
        });
      }
    } else {
      toast.success("Item already added to cart", {
        position: "top-right"
      });
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-md border bg-white px-10 py-2 text-lg font-bold text-green-700"
      >
        ADD
      </button>
      <Toaster />
    </>
  );
}

AddToCartBtn.propTypes = {
  info: PropTypes.object
};

export default AddToCartBtn;
