/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import NoImage from "../../../assets/no-image.png";
import { Link } from "react-router-dom";

const RestaurantCard = ({ data }) => {
  const imgURL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/`;
  const dishes = data?.card?.card?.dishes;
  const resData = data?.card?.card?.restaurant;

  const {
    info: {
      name,
      avgRating,
      sla: { slaString }
    }
  } = resData;

  const [expanded, setExpanded] = useState({});
  const [showButton, setShowButton] = useState({});

  const textRefs = useRef({});

  useEffect(() => {
    // Calculate if the text is overflowing
    dishes?.forEach((dish) => {
      const textElement = textRefs.current[dish.info.id];
      const isOverflowing =
        textElement?.scrollHeight > textElement?.clientHeight;
      if (isOverflowing) {
        setShowButton((prev) => ({ ...prev, [dish.info.id]: true }));
      }
    });
  }, [dishes]);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex w-full rounded-3xl bg-white p-4 shadow-md">
      <div className="w-full">
        <div className="flex items-start justify-between pb-4">
          <div>
            <Link
              to={`/restaurant/${resData?.info?.id}`}
              className="text-2xl font-semibold"
            >
              {name}
            </Link>
            <div className="flex items-center text-[19px] font-medium text-gray-700">
              <span className="mr-2 flex items-center">
                <span className="mr-1 mt-0.5">
                  {/* SVG for rating */}
                  <svg width="25" height="25" viewBox="0 0 20 21" fill="none">
                    <circle
                      cx="10"
                      cy="10.583"
                      r="9"
                      fill="url(#paint0_linear_18487_66968)"
                    ></circle>
                    <path
                      d="M10.0816 13.448C10.0312 13.4183 9.96876 13.4183 9.91839 13.448L7.31647 14.9798C6.93482 15.2045 6.47106 14.8587 6.57745 14.4288L7.27568 11.6075C7.29055 11.5474 7.26965 11.4842 7.22195 11.4448L4.95521 9.57328C4.60833 9.28689 4.78653 8.72386 5.23502 8.6892L8.23448 8.45743C8.29403 8.45283 8.34612 8.41562 8.36979 8.36078L9.54092 5.64686C9.71462 5.24433 10.2854 5.24433 10.4591 5.64686L11.6302 8.36078C11.6539 8.41562 11.706 8.45283 11.7655 8.45743L14.765 8.6892C15.2135 8.72386 15.3917 9.28689 15.0448 9.57328L12.7781 11.4448C12.7303 11.4842 12.7095 11.5474 12.7243 11.6075L13.4225 14.4288C13.5289 14.8587 13.0652 15.2045 12.6835 14.9798L10.0816 13.448Z"
                      fill="white"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_18487_66968"
                        x1="10"
                        y1="1.58301"
                        x2="10"
                        y2="19.583"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#21973B"></stop>
                        <stop offset="1" stopColor="#128540"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="">{avgRating}</span>
              </span>
              <span>{slaString.toLowerCase()}</span>
            </div>
          </div>
        </div>
        {/* Dishes Section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {dishes?.map((dish) => (
            <div
              key={dish.info.id}
              className="grid grid-cols-6 gap-2 rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="col-span-4">
                <h3 className="mb-1 text-xl font-semibold text-zinc-800">
                  {dish.info.name}
                </h3>
                <p
                  ref={(el) => (textRefs.current[dish.info.id] = el)}
                  className={`mb-2 text-sm text-gray-600 ${
                    expanded[dish.info.id] ? "" : "line-clamp-2"
                  }`}
                >
                  {dish?.info?.description}
                </p>
                {showButton[dish.info.id] && (
                  <button
                    onClick={() => toggleExpanded(dish.info.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {expanded[dish.info.id] ? "Show Less" : "Show More"}
                  </button>
                )}
                <p className="mt-2 text-lg font-bold">
                  ₹{dish?.info?.price / 100}
                </p>
              </div>
              <div className="col-span-2 h-36">
                <img
                  src={`${imgURL}${dish?.info?.imageId}` || NoImage}
                  alt={name}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
