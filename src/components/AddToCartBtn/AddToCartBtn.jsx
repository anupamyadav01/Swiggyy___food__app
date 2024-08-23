/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../utils/slices/cartSlice";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { toggleDifferentRestaurant } from "../../utils/slices/toggleSlice";

function AddToCartBtn({ info, restaurantInfo }) {
  const dispatch = useDispatch();
  // const showCartCheckingPopup = useSelector(
  //   (state) => state.toggleSlice.showDifferentRestaurant
  // );
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const handleAddToCart = () => {
    const resInfoLocalStorage = JSON.parse(
      localStorage.getItem("restaurantInfo")
    );
    // console.log(restaurantInfo);
    // console.log(resInfoLocalStorage);

    const isItemAdded = cartItems.find((item) => item.id === info.id);
    if (!isItemAdded) {
      if (
        resInfoLocalStorage?.name === restaurantInfo?.name ||
        !resInfoLocalStorage
      ) {
        dispatch(addToCart(info));
        localStorage.setItem("restaurantInfo", JSON.stringify(restaurantInfo));
        toast.success("Item added to cart", {
          style: {
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1) !important" // Removes the shadow completely
          }
        });
      } else {
        dispatch(toggleDifferentRestaurant());
        toast.error("Different Restaurant Item", {
          style: {
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1) !important" // Removes the shadow completely
          }
        });
      }
    } else {
      toast.error("Item already added to cart", {
        style: {
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1) !important" // Removes the shadow completely
        }
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
