import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getDishesData, getSearchRestaurant } from "../../apis";
import SearchRestaurant from "./SearchRestaurant/SearchRestaurant";
import Dishes from "./Dishes/Dishes";

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
  const [activeTab, setActiveTab] = useState("dishes");
  const [showData, setShowData] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  // const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  const searchData = async () => {
    if (searchVal === "") return;

    try {
      setLoading(true);
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
      setLoading(false);
      setShowData(true);
      // setDishes(newDishesData || []);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    searchData();
  }, []);

  const handleClearSearch = () => {
    setSearchVal("");
    // setRestaurantData([]);
    // setDishes([]);
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
        <div className="sticky top-[80px] z-30 flex h-full w-full flex-col items-center bg-white">
          <div className="mx-auto w-[85%]">
            <div className="">
              <form
                onSubmit={handleFormSubmit}
                className="relative flex w-full items-center justify-center pt-10"
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
            <div className="mx-auto flex w-[85%] flex-col gap-2 py-6">
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
          {!showData ? (
            <div></div>
          ) : (
            <div>
              <div className="w-full">
                <div className="mx-auto w-[85%] border-b border-b-gray-300 pb-1 pt-4 text-sm">
                  <button
                    className={`mr-3 rounded-full px-4 py-2 ${
                      activeTab === "restaurants"
                        ? "bg-[#282c3f] text-white"
                        : "border border-[#282c3f] bg-white text-[#282c3f]"
                    }`}
                    onClick={() => setActiveTab("restaurants")}
                  >
                    Restaurants
                  </button>
                  <button
                    className={`rounded-full px-4 py-2 ${activeTab === "dishes" ? "bg-[#282c3f] text-white" : "border border-[#282c3f] bg-white text-[#282c3f]"}`}
                    onClick={() => setActiveTab("dishes")}
                  >
                    Dishes
                  </button>
                </div>
              </div>

              {activeTab === "dishes" ? (
                <Dishes restaurantData={restaurantData} />
              ) : (
                <SearchRestaurant restaurantData={restaurantData} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
