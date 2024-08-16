import { useContext, useEffect, useState } from "react";
import FoodTypes from "../../components/FoodTypes/FoodTypes";
import Restaurents from "../../components/Restaurents/Restaurents";
import TopRestaurent from "../../components/TopRestaurent/TopRestaurent";
import { getTopRestaurantsData } from "../../apis";
import { LatitudeAndLogitudeContext } from "../../context/SwiggyContext";
import { useSelector } from "react-redux";

const Home = () => {
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
  const fetchData = async () => {
    try {
      const data = await getTopRestaurantsData(lat, lng);
      // console.log(
      //   data?.data.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants
      // );
      setTitle(data?.data?.cards[1]?.card?.card?.header?.title);
      setRestaurantData(
        data?.data.cards[1].card?.card.gridElements?.infoWithStyle?.restaurants
      );
    } catch (error) {
      console.log("fetching Error from home page", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
        <Restaurents
          restaurantData={filterBtnName ? filteredData : restaurantData}
          title={title}
        />
      </div>
    </div>
  );
};

export default Home;
