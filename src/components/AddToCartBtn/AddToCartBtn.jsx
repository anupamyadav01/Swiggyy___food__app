import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../utils/slices/cartSlice";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

function AddToCartBtn({ info }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const handleAddToCart = () => {
    const idItemAdded = cartItems.find((item) => item.id === info.id);
    if (!idItemAdded) {
      dispatch(addToCart(info));
      toast.success("Item added to cart", {
        position: "top-right"
      });
    } else {
      toast.success("Item already added to cart", {
        position: "top-right"
      });
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-md border bg-white px-10 py-2 text-lg font-bold text-green-700 drop-shadow"
    >
      ADD
    </button>
  );
}

AddToCartBtn.propTypes = {
  info: PropTypes.object
};

export default AddToCartBtn;
