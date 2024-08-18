import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RestaurantCard = ({ item }) => {
  const IMG_BASE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/";

  return (
    <Link
      to={`/restaurant/${item?.cta?.link.split("/").at(-1)}`}
      key={item.info.id}
      className="cursor-pointer duration-100 hover:scale-95"
    >
      <div className="relative h-40 overflow-hidden rounded-2xl border border-gray-300">
        <img
          className="h-full w-full object-cover"
          src={IMG_BASE_URL + item.info.cloudinaryImageId}
          alt={item.info.name}
        />
        <div className="absolute bottom-0 left-0 flex w-full items-end bg-gradient-to-t from-black to-transparent p-2 text-lg font-extrabold uppercase text-white">
          {item.info?.aggregatedDiscountInfoV3 &&
            item.info?.aggregatedDiscountInfoV3?.header +
              " " +
              item.info?.aggregatedDiscountInfoV3?.subHeader}
        </div>
      </div>
      <div className="pl-3 pt-2">
        <p className="text-lg font-bold">{item.info.name}</p>
        <div className="flex items-center gap-1">
          <i className="fi fi-sr-circle-star text-xl text-green-600"></i>
          <p className="flex items-center justify-center">
            <span className="mr-2 font-medium">{item.info.avgRating}</span> •{" "}
            <span className="ml-2 font-semibold">
              {item.info.sla.slaString}
            </span>
          </p>
        </div>
        <div className="line-clamp-1 text-gray-600">
          {item.info.cuisines.join(", ")}
        </div>
        <div className="text-gray-600">{item.info.areaName}</div>
      </div>
    </Link>
  );
};

RestaurantCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default RestaurantCard;
