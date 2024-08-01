import { useState } from "react";
import RestaurentCard from "../RestaurentCard/RestaurentCard";
import SwiggyData from "../../constants/SwiggyData.json";
const Restaurents = () => {
  const [food] = useState(
    SwiggyData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants
  );
  // console.log(food);
  return (
    <div>
      <div>
        <p className="text-2xl font-bold">
          Restaurants with online food delivery in Jaipur
        </p>
        <div className="mb-10 mt-5 flex gap-3">
          <div className="flex items-center gap-2 rounded-[18px] border border-gray-200 px-3 py-0.5 shadow-md">
            <span className="text-sm font-medium">Sort By</span>
            <span className="mt-1.5">
              <i className="fi fi-rs-angle-small-down"></i>
            </span>
          </div>{" "}
          <div className="flex items-center gap-2 rounded-[18px] border border-gray-200 px-3 py-0.5 shadow-md">
            <span className="text-sm font-medium">Fast Delivery</span>
          </div>{" "}
          <div className="flex items-center gap-2 rounded-[18px] border border-gray-200 px-3 py-0.5 shadow-md">
            <span className="text-sm font-medium">Ratings 4.0+</span>
          </div>{" "}
          <div className="flex items-center gap-2 rounded-[18px] border border-gray-200 px-3 py-0.5 shadow-md">
            <span className="text-sm font-medium">Pure Veg</span>
          </div>{" "}
          <div className="flex items-center gap-2 rounded-[18px] border border-gray-200 px-3 py-0.5 shadow-md">
            <span className="text-sm font-medium">Rs. 300-Rs. 600</span>
          </div>{" "}
          <div className="flex items-center gap-2 rounded-[18px] border border-gray-200 px-3 py-0.5 shadow-md">
            <span className="text-sm font-medium">Less than Rs. 300</span>
          </div>{" "}
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-7">
        {food.map((item) => {
          return <RestaurentCard key={item.info.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Restaurents;
