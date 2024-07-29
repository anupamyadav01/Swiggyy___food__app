import PropTypes from "prop-types";
const RestaurentCard = ({ item }) => {
  const IMG_BASE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/";
  return (
    <>
      <div
        key={item.info.id}
        className="w-min cursor-pointer duration-100 hover:scale-95"
      >
        <div className="relative h-36 overflow-hidden rounded-2xl">
          <img
            className="min-w-[225px]"
            src={IMG_BASE_URL + item.info.cloudinaryImageId}
            alt=""
          />
          <div className="from-1% absolute bottom-0 left-0 flex h-full w-full items-end justify-start bg-gradient-to-t from-black to-transparent to-40% p-2 text-lg font-extrabold uppercase text-white">
            {item.info?.aggregatedDiscountInfoV3?.header +
              " " +
              item.info?.aggregatedDiscountInfoV3?.subHeader}
          </div>
        </div>
        <div className="pl-3">
          <p className="text-lg font-bold">{item.info.name}</p>
          <div className="flex items-center gap-1">
            <div className="mt-1">
              <i className="fi fi-sr-circle-star text-xl text-green-600"></i>
            </div>
            <p className="flex items-center justify-center">
              <span className="mr-2 font-medium">{item.info.avgRating} </span>•{" "}
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
      </div>
    </>
  );
};

RestaurentCard.propTypes = {
  item: PropTypes.object
};
RestaurentCard.defaultProps = {
  item: {}
};

export default RestaurentCard;
