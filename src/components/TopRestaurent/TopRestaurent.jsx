import { useContext, useEffect, useState } from "react";
// import SwiggyData from "../../constants/SwiggyData.json";
import { Link } from "react-router-dom";
import { getTopRestaurantsData } from "../../apis";
import { LatitudeAndLogitudeContext } from "../../context/SwiggyContext";
const IMG_BASE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/";
const TopRestaurent = () => {
  const [value, setValue] = useState(0);
  // const [food] = useState(
  //   SwiggyData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //     ?.restaurants
  // );
  // console.log(food);
  const {
    cordinates: { lat, lng }
  } = useContext(LatitudeAndLogitudeContext);

  const [food, setFood] = useState([]);
  useEffect(() => {
    getTopRestaurantsData(lat, lng)
      .then((data) => {
        setFood(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [lat, lng]);
  const handlePrev = () => {
    if (value <= 47) {
      setValue(0);
      return;
    }
    setValue((prev) => prev - 45.5);
  };
  // console.log(value);

  const handleNext = () => {
    if (value >= 501) return;
    setValue((prev) => prev + 45.6);
  };
  return (
    <div className="w-full py-4">
      <div className="mb-3 flex w-full items-center justify-between">
        <p className="text-2xl font-bold">Top restaurant chains in Jaipur</p>
        <div className="flex gap-3">
          <span
            onClick={handlePrev}
            style={value <= 0 ? { opacity: "0.5" } : null}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300"
          >
            <i className="fi fi-rr-arrow-small-left mt-1 text-2xl"></i>
          </span>
          <span
            onClick={handleNext}
            style={value >= 501 ? { opacity: "0.5" } : null}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-300"
          >
            <i className="fi fi-rr-arrow-small-right mt-1 text-2xl"></i>
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex gap-8 duration-1000"
          style={{
            transform: `translateX(-${value}%)`
          }}
        >
          {food &&
            food.map((item) => {
              return (
                <Link
                  key={item.info.id}
                  to={`/restaurant/${item?.cta?.link.split("/").at(-1)}`}
                  className="cursor-pointer duration-100 hover:scale-95"
                >
                  <div className="relative h-44 overflow-hidden rounded-2xl">
                    <img
                      className="min-w-[270px]"
                      src={IMG_BASE_URL + item.info.cloudinaryImageId}
                      alt=""
                    />
                    <div className="from-1% absolute bottom-0 left-0 flex h-full w-full items-end justify-start bg-gradient-to-t from-black to-transparent to-40% p-2 text-xl font-extrabold uppercase text-white">
                      {item.info?.aggregatedDiscountInfoV3 &&
                        item.info?.aggregatedDiscountInfoV3?.header +
                          " " +
                          item.info?.aggregatedDiscountInfoV3?.subHeader}
                    </div>
                  </div>
                  <div className="pl-3">
                    <p className="text-lg font-bold">{item.info.name}</p>
                    <div className="flex items-center gap-1">
                      <div>
                        <i className="fi fi-sr-circle-star text-base text-green-600"></i>
                      </div>
                      <p className="flex items-center justify-center">
                        <span className="mr-2 font-medium">
                          {item.info.avgRating}{" "}
                        </span>
                        •{" "}
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
            })}
        </div>
      </div>
    </div>
  );
};

export default TopRestaurent;
