import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SearchRestaurantCard = ({ restaurant }) => {
  // console.log(restaurant);

  const {
    name,
    cloudinaryImageId,
    avgRatingString,
    sla: { slaString },
    costForTwoMessage,
    cuisines,
    aggregatedDiscountInfoV3
  } = restaurant?.card?.card?.info || {};

  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`;
  const offerText = aggregatedDiscountInfoV3?.header;
  const subheader = aggregatedDiscountInfoV3?.subHeader;
  const flatDeal = aggregatedDiscountInfoV3?.discountTag;

  return (
    <Link
      to={`/restaurant/${restaurant?.card?.card?.info?.id}`}
      className="flex w-full max-w-lg rounded-lg border border-gray-300 bg-white p-4"
    >
      {/* Left Side Image with Offer */}
      <div className="relative h-28 w-[28%] flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded object-cover"
        />
        <div className="absolute -bottom-2 left-1/2 flex w-2/3 -translate-x-1/2 flex-col items-center justify-center whitespace-nowrap shadow">
          {flatDeal && (
            <div className="w-[80%] bg-[#ED5E0E] py-1 text-center text-[10px] font-semibold text-white">
              {flatDeal}
            </div>
          )}
          {offerText && (
            <div className="flex flex-col items-center rounded bg-white px-2 py-1 leading-none text-red-500">
              <span className="text-[15px] font-bold">{offerText}</span>
              {subheader && (
                <div className="mt-1 flex items-center justify-center gap-1">
                  <span className="text-[8px]">•</span>
                  <span className="text-[8px]">{subheader}</span>
                  <span className="text-[8px]">•</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side Information */}
      <div className="flex w-[70%]">
        <div className="ml-4 flex w-full flex-col justify-center whitespace-nowrap">
          <h3 className="truncate text-lg font-semibold">{name}</h3>
          <div className="flex items-center text-xs font-medium text-gray-600">
            <span className="">
              {" "}
              <span className="mr-1 text-sm">★</span>
              {avgRatingString}
            </span>
            <span className="mx-1">•</span>
            <span className="">{slaString}</span>
            <span className="mx-1">•</span>
            <span>{costForTwoMessage}</span>
          </div>
          <div className="">
            <p className="line-clamp-1 text-sm text-gray-500">
              {cuisines.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

SearchRestaurantCard.propTypes = {
  restaurant: PropTypes.object
};

export default SearchRestaurantCard;
