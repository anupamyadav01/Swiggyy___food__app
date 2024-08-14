import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getDishesData, getSearchRestaurant } from "../../apis";
import SearchRestaurantCard from "./RestaurantSearchCard";

const popularCuisines = [
  {
    name: "biryani",
    URL: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/b4ff78ecc5b8b66f732dd06228916d65"
  },
  {
    name: "pizzas",
    URL: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/5dd234f7decdac4b4f71a2ff1408e10f"
  },
  {
    name: "rolls",
    URL: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/3df4fca020027e89b89c733cdffc4966"
  },
  {
    name: "burger",
    URL: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/e76b511935016406e6ebc11dd7593387"
  },
  {
    name: "tea",
    URL: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/rng/md/carousel/production/87664acb0f9dd95d10a549bb8190ab27"
  }
];

const SearchPage = () => {
  const [searchVal, setSearchVal] = useState("");
  // const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const searchData = async () => {
    if (searchVal === "") return;

    try {
      const [restaurantResult, dishesResult] = await Promise.all([
        getSearchRestaurant(searchVal),
        getDishesData(searchVal)
      ]);
      const newRestaurantData =
        restaurantResult?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards?.filter(
          (item) => item?.card?.card?.info
        );
      // const newRestaurantData =
      //   restaurantResult?.data?.cards[0]?.groupedCard?.cardGroupMap.RESTAURANT
      //     .cards;

      // const newDishesData =
      //   dishesResult?.data?.cards[1]?.groupedCard?.cardGroupMap.DISH.cards;

      // console.log("RESTAURANT DATA ", newRestaurantData);
      // console.log("DISH DATA ", newDishesData);

      setRestaurantData(newRestaurantData || []);
      // setDishes(newDishesData || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchData();
  }, []);

  const handleClearSearch = () => {
    setSearchVal("");
    setRestaurantData([]);
    setDishes([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim() === "") return;
    console.log(searchVal);
    searchData();
  };

  return (
    <>
      <div
        className="flex h-full w-full flex-col items-center"
        onClick={() => {}}
      >
        {/* Search */}
        <div className="mx-auto w-[80%]">
          <div className="">
            <form
              onSubmit={handleFormSubmit}
              className="relative flex h-32 w-full items-center justify-center"
            >
              <input
                type="text"
                placeholder="Search for restaurants and food"
                className="w-full rounded-[4px] border border-gray-400 py-3 pl-4 pr-10 font-medium text-gray-600 outline-none"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              {searchVal.length === 0 ? (
                <Search className="absolute right-[2%] cursor-pointer text-gray-600 md:right-[2%]" />
              ) : (
                <X
                  className="absolute right-[2%] cursor-pointer text-gray-600 md:right-[2%]"
                  onClick={handleClearSearch}
                />
              )}
            </form>
          </div>
        </div>
        {/* Popular Cuisins */}
        {searchVal.length === 0 && (
          <div className="mx-auto flex w-[80%] flex-col gap-2 py-6">
            <h1 className="ml-4 text-2xl font-bold">Popular Cuisines</h1>
            <div className="cws flex w-full overflow-x-scroll">
              {popularCuisines.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl.URL}
                  className="h-32 w-24 cursor-pointer object-contain"
                />
              ))}
            </div>
          </div>
        )}

        {/* Showing result */}
        {/* <div className="border-#EDEDEF] cws flex h-[100vh] w-[90%] flex-wrap justify-center gap-4 overflow-y-scroll border-t-[3px] bg-[#F4F5F6] px-4 py-6">
          {dishes.length === 0 ? (
            <h1 className="mx-auto mt-32 h-[90vh] overflow-y-hidden text-center text-5xl font-bold tracking-wide text-[#e2e2e2] sm:text-[3rem]">
              Search Something
            </h1>
          ) : (
            <div>{dishes}</div>
          )}
        </div> */}
        <div className="grid w-[80%] grid-cols-2 gap-6 py-4">
          {restaurantData.map((item, index) => (
            <SearchRestaurantCard key={index} restaurant={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
