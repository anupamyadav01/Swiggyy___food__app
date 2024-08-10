import PropTypes from "prop-types";
import { useState } from "react";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";
import { Toaster } from "react-hot-toast";
let veg =
  "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
  "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";
const MenuCard = ({ card }) => {
  let opened = false;
  if (card["@type"]) {
    opened = true;
  }
  const [isOpen, setIsOpen] = useState(opened);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };
  // console.log(itemCards);
  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div>
          <div>
            <div className={"flex items-center justify-between"}>
              <h1
                className={
                  "text-" + (card["@type"] ? "lg font-bold" : "base font-bold")
                }
              >
                {title} ({itemCards.length})
              </h1>
              <span onClick={toggleDropDown}>
                {isOpen ? (
                  <i className="fi fi-ss-angle-small-up cursor-pointer text-3xl"></i>
                ) : (
                  <i className="fi fi-ss-angle-small-down cursor-pointer text-3xl"></i>
                )}
              </span>
            </div>
          </div>
          {isOpen && <DetailMenu itemCards={itemCards} />}
        </div>

        <hr className="mt-5 h-3" />
      </>
    );
  } else {
    const { title, categories } = card;
    // console.log(categories);

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{title}</div>
        </div>
        <div>
          {categories.map((data) => {
            return <MenuCard key={data.title} card={data} />;
          })}
        </div>
      </div>
    );
  }
};
const DetailMenu = ({ itemCards }) => {
  // console.log(itemCards);
  return (
    <div className="my-4">
      {itemCards.map(({ card: { info } }) => {
        return <DetailMenuCard key={info.name} info={info} />;
      })}
    </div>
  );
};
function DetailMenuCard({ info }) {
  const [isDiffRes] = useState(false);
  // console.log(info)
  const {
    name,
    defaultPrice,
    price,
    itemAttribute,
    ratings: {
      aggregatedRating: { rating, ratingCountV2 }
    },
    description = "",
    imageId
  } = info;

  function handleIsDiffRes() {}
  function handleClearCart() {}

  const [isMore, setIsMore] = useState(false);

  let trimDes = description.substring(0, 138) + "...";

  return (
    <div className="relative w-full">
      <div className="flex min-h-[182px] w-full justify-between">
        <div className="w-[55%] md:w-[70%]">
          <img
            className="w-5 rounded-sm"
            src={
              itemAttribute && itemAttribute.vegClassifier == "VEG"
                ? veg
                : nonVeg
            }
            alt=""
            srcSet=""
          />
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-lg font-bold">
            ₹{defaultPrice / 100 || price / 100}{" "}
          </p>

          <div className="flex items-center gap-1">
            {" "}
            <i className={"fi fi-ss-star mt-1 text-xl"}></i>{" "}
            <span>
              {rating} ({ratingCountV2})
            </span>
          </div>

          {description.length > 140 ? (
            <div>
              <span className="line-clamp-2 md:line-clamp-none">
                {isMore ? description : trimDes}
              </span>
              <button
                className="hidden font-bold md:block"
                onClick={() => setIsMore(!isMore)}
              >
                {isMore ? "less" : "more"}
              </button>
            </div>
          ) : (
            <span className="">{description}</span>
          )}
        </div>
        <div className="relative h-[162px] w-[170px]">
          <img
            className="h-full rounded-xl"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
              imageId
            }
          />
          <div>
            <AddToCartBtn info={info} />
            <Toaster />
          </div>
        </div>
      </div>
      <hr className="my-5" />
      {isDiffRes && (
        <div className="fixed bottom-10 left-[33%] z-50 flex h-[204px] w-[520px] flex-col gap-2 border bg-white p-8 shadow-md">
          <h1>Items already in cart</h1>
          <p>
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="flex w-full justify-between gap-3 uppercase">
            <button
              onClick={handleIsDiffRes}
              className="w-1/2 border-2 border-green-600 p-3 text-green-600"
            >
              No
            </button>
            <button
              onClick={handleClearCart}
              className="w-1/2 bg-green-600 p-3 text-white"
            >
              Yes, start Afresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
DetailMenuCard.propTypes = {
  info: PropTypes.object
};

DetailMenu.propTypes = {
  itemCards: PropTypes.array
};

MenuCard.propTypes = {
  card: PropTypes.object
};

export default MenuCard;
