import { useState } from "react";
import SwiggyData from "../../constants/SwiggyData.json";
const IMG_BASE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/";
const TopRestaurent = () => {
  const [value, setValue] = useState(0);
  const [food] = useState(
    SwiggyData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants
  );
  console.log(food);
  const handlePrev = () => {
    if (value <= 47) {
      setValue(0);
      return;
    }
    setValue((prev) => prev - 45.5);
  };
  console.log(value);

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
          {food.map((item) => {
            return (
              <div
                key={item.info.id}
                className="cursor-pointer duration-100 hover:scale-95"
              >
                <div className="relative h-44 overflow-hidden rounded-2xl">
                  <img
                    className="min-w-[270px]"
                    src={IMG_BASE_URL + item.info.cloudinaryImageId}
                    alt=""
                  />
                  <div className="from-1% absolute bottom-0 left-0 flex h-full w-full items-end justify-start bg-gradient-to-t from-black to-transparent to-40% p-2 text-xl font-extrabold uppercase text-white">
                    {item.info?.aggregatedDiscountInfoV3?.header +
                      " " +
                      item.info?.aggregatedDiscountInfoV3?.subHeader}
                  </div>
                </div>
                <div className="pl-3">
                  <p className="text-lg font-bold">{item.info.name}</p>
                  <div className="flex items-center gap-1">
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        role="img"
                        aria-hidden="true"
                        // eslint-disable-next-line react/no-unknown-property
                        strokeColor="rgba(2, 6, 12, 0.92)"
                        // eslint-disable-next-line react/no-unknown-property
                        fillColor="rgba(2, 6, 12, 0.92)"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                        ></circle>
                        <path
                          d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                          fill="white"
                        ></path>
                        <defs>
                          <linearGradient
                            id="StoreRating20_svg__paint0_linear_32982_71567"
                            x1="10"
                            y1="1"
                            x2="10"
                            y2="19"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#21973B"></stop>
                            <stop offset="1" stopColor="#128540"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopRestaurent;
