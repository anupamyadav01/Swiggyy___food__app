import { useContext, useEffect, useState } from "react";
import FoodTypes from "./FoodTypes/FoodTypes";
import AllRestaurants from "./AllRestaurants/AllRestaurants";
import TopRestaurent from "./TopRestaurants/TopRestaurants";
import { getTopRestaurantsData } from "../../apis/index";
import { LatitudeAndLogitudeContext } from "../../context/SwiggyContext";
import { useSelector } from "react-redux";
import {
  CircleSkeleton,
  RectangleSkeleton
} from "../../components/Shimmer/Shimmer/Shimmer";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const filterBtnName = useSelector((state) => state.filterSlice.filterBtnName);
  const [title, setTitle] = useState("");
  const [restaurantData, setRestaurantData] = useState([]);
  const filteredData = restaurantData?.filter((item) => {
    // console.log(item?.info?.costForTwo);

    switch (filterBtnName) {
      case "Ratings 4.0+":
        return item.info.avgRating > 4.0;
      case "New on Swiggy":
        return item.info.isNewlyOnboarded;
      case "Fast Delivery":
        return item.info.sla.deliveryTime < 30;
      case "Offers":
        return (
          item?.info?.aggregatedDiscountInfoV3?.header ||
          item?.info?.aggregatedDiscountInfoV3?.subHeader
        );
      case "Rs. 300-Rs. 600":
        return (
          // 499
          +item?.info?.costForTwo?.split(" ").splice(0, 1)[0].substring(1) >
            300 &&
          +item?.info?.costForTwo?.split(" ").splice(0, 1)[0].substring(1) < 600
        );
      case "Less than Rs. 300":
        return (
          +item?.info?.costForTwo?.split(" ").splice(0, 1)[0].substring(1) < 300
        );
      default:
        return item;
    }
  });
  // console.log(filterBtnName);

  const {
    cordinates: { lat, lng }
  } = useContext(LatitudeAndLogitudeContext);
  // *****************************************

  useEffect(() => {
    setLoading(true);
    getTopRestaurantsData(lat, lng)
      .then((data) => {
        setTitle(data?.data?.cards[1]?.card?.card?.header?.title);
        setRestaurantData(
          data?.data.cards[1].card?.card.gridElements?.infoWithStyle
            ?.restaurants
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [lat, lng]);

  // *****************************************
  // const fetchData = async () => {
  //   try {
  //     const data = await getTopRestaurantsData(lat, lng);

  //     setTitle(data?.data?.cards[1]?.card?.card?.header?.title);
  //     setRestaurantData(
  //       data?.data.cards[1].card?.card.gridElements?.infoWithStyle?.restaurants
  //     );
  //   } catch (error) {
  //     console.log("fetching Error from home page", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <>
      {loading ? (
        <div>
          <CircleSkeleton />
          <RectangleSkeleton />
        </div>
      ) : (
        <div className="w-full">
          {/* food types carousel */}
          <FoodTypes />
          {/* horizontal line */}
          <div className="w-full">
            <hr className="mb-8 mt-10" />
          </div>

          {/* Top Restaurant Carousel */}
          <TopRestaurent />

          {/* All restaurant section  */}
          <div className="w-full">
            <hr className="mb-9 mt-10" />
          </div>
          <div className="w-full">
            <AllRestaurants
              restaurantData={
                filterBtnName ? (
                  filteredData ? (
                    filteredData
                  ) : (
                    <div>No data found</div>
                  )
                ) : (
                  restaurantData
                )
              }
              title={title}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
