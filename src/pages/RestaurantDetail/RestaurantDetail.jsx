import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import OffersCard from "../../components/OffersCard/OffersCard";
import MenuItems from "./MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../utils/slices/cartSlice";
import { toggleDifferentRestaurant } from "../../utils/slices/toggleSlice";
import {
  HelpAndSupportSkeleton,
  OfferSkeleton
} from "../../components/Shimmer/Shimmer/Shimmer";

const RestaurantDetail = () => {
  const { id } = useParams();
  const match = id.match(/(\d+)$/);
  const mainID = match ? match[1] : null;

  const dispatch = useDispatch();
  const [menuData, setMenuData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const showCartCheckingPopup = useSelector(
    (state) => state.toggleSlice.showDifferentRestaurant
  );

  const [value, setValue] = useState(0);

  const fetchRestaurantDetails = useCallback(async () => {
    if (!mainID) {
      console.error("No valid restaurant ID found");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.95250&lng=75.71050&restaurantId=${mainID}&catalog_qa=undefined&submitAction=ENTER`
      );
      const results = await response.json();
      setRestaurantInfo(results?.data?.cards[2]?.card?.card?.info);
      setOffersData(
        results?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
      );

      let filteredData =
        results?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
        );
      setMenuData(filteredData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [mainID]);

  useEffect(() => {
    fetchRestaurantDetails();
  }, [fetchRestaurantDetails]);

  const handleNext = () => {
    if (value < menuData.length - 1) {
      setValue((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (value > 0) {
      setValue((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full">
      {loading ? (
        <div className="mx-auto my-4 flex h-screen max-w-[800px] flex-col">
          <HelpAndSupportSkeleton />
          <OfferSkeleton />
        </div>
      ) : (
        <div className="mx-auto my-4 max-w-[800px]">
          {/* bread crumb */}
          <div className="mb-9 flex gap-2 text-[11px] text-gray-400">
            <Link to="/" className="hover:text-gray-800">
              Home
            </Link>
            /
            <Link to="/" className="hover:text-gray-800">
              {restaurantInfo?.city}
            </Link>{" "}
            /{" "}
            <Link to="/" className="text-gray-800">
              {restaurantInfo?.name}
            </Link>
          </div>

          {/* restaurant info */}
          <div className="mx-3">
            <div className="my-5">
              <h1 className="text-2xl font-bold">{restaurantInfo?.name}</h1>
            </div>

            <div className="mt-3 h-[206px] w-full rounded-2xl bg-gradient-to-t from-gray-300/80 px-4 pb-4">
              <div className="h-full w-full rounded-2xl border border-gray-300/70 bg-white">
                <div className="w-full p-4">
                  <div className="flex items-center gap-2 font-bold">
                    <i className="fi fi-ss-circle-star mt-1 text-lg text-green-600"></i>
                    <span>{restaurantInfo?.avgRating}</span>
                    <span>({restaurantInfo?.totalRatingsString})</span>•
                    <span>{restaurantInfo?.costForTwoMessage}</span>
                  </div>

                  <p className="font-semibold text-orange-600 underline">
                    {restaurantInfo?.cuisines?.join(", ")}
                  </p>

                  <div className="mt-2 flex gap-2">
                    <div className="flex w-[9px] flex-col items-center justify-center">
                      <div className="h-[7px] w-[7px] rounded-full bg-gray-500"></div>
                      <div className="h-[25px] w-[1px] bg-gray-500"></div>
                      <div className="h-[7px] w-[7px] rounded-full bg-gray-500"></div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm font-semibold">
                      <p>
                        Outlet{" "}
                        <span className="font-normal text-gray-500">
                          {restaurantInfo?.locality}
                        </span>
                      </p>
                      <p>{restaurantInfo?.sla?.slaString}</p>
                    </div>
                  </div>
                </div>
                <hr />

                <div className="w-full">
                  <div className="flex items-center p-3">
                    {restaurantInfo?.length !== 0 &&
                    restaurantInfo?.expectationNotifiers ? (
                      <>
                        <img
                          className="w-6"
                          src={
                            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/" +
                            restaurantInfo.feeDetails?.icon
                          }
                          alt=""
                        />

                        <span className="ml-4 text-sm font-normal text-gray-500">
                          {restaurantInfo?.expectationNotifiers[0]?.enrichedText.replace(
                            /<[^>]*>/g,
                            ""
                          )}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* deals for you section */}
          <div className="mx-6">
            <div className="w-full overflow-hidden">
              <div className="mt-8 flex justify-between">
                <h1 className="text-xl font-bold">Deals for you</h1>
                <div className="flex gap-3">
                  <div
                    onClick={handlePrev}
                    className={
                      `flex h-9 w-9 cursor-pointer items-center justify-center rounded-full ` +
                      (value <= 0 ? "bg-gray-100" : "bg-gray-200")
                    }
                  >
                    <i
                      className={
                        `fi fi-rr-arrow-small-left mt-1 text-2xl ` +
                        (value <= 0 ? "text-gray-300" : "text-gray-800")
                      }
                    ></i>
                  </div>
                  <div
                    onClick={handleNext}
                    className={
                      `flex h-9 w-9 cursor-pointer items-center justify-center rounded-full ` +
                      (value >= menuData.length - 1 ? "bg-gray-100" : "bg-gray-200")
                    }
                  >
                    <i
                      className={
                        `fi fi-rr-arrow-small-right mt-1 text-2xl ` +
                        (value >= menuData.length - 1 ? "text-gray-300" : "text-gray-800")
                      }
                    ></i>
                  </div>
                </div>
              </div>
              <div className="mx-4 mt-5 flex gap-4 hover:cursor-pointer">
                {offersData?.map((data, i) => (
                  <OffersCard data={data} key={i} />
                ))}
              </div>
            </div>

            {/* Menu section */}
            <div className="mb-5 mt-12 flex w-full items-center justify-center">
              <p className="text-center text-xs font-bold tracking-[4px] text-gray-900 text-opacity-70">
                MENU
              </p>
            </div>

            {/* search bar */}
            <div className="flex w-full items-center justify-between rounded-xl bg-gray-200 px-5 py-3">
              <span></span>
              <span className="font-medium text-slate-700">
                Search for dishes
              </span>
              <span>
                <i className="fi fi-rr-search"></i>
              </span>
            </div>

            <div className="mt-10">
              {menuData?.map(({ card: { card } }) => {
                return (
                  <MenuItems
                    key={card.title}
                    restaurantInfo={restaurantInfo}
                    card={card}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* cart ckecking box  */}
      {showCartCheckingPopup && (
        <div className="fixed bottom-10 left-[33%] z-50 flex h-[204px] w-[550px] flex-col gap-2 border bg-white p-8 py-5 shadow-[0_0_15px_6px_rgba(0,0,0,0.35)]">
          <h1 className="text-xl font-bold">Items already in cart</h1>
          <p className="text-base font-normal text-gray-500">
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="mt-5 flex w-full justify-between gap-3 uppercase">
            <button
              onClick={() => dispatch(toggleDifferentRestaurant())}
              className="w-1/2 border-2 border-green-600 py-3 text-green-600"
            >
              No
            </button>
            <button
              onClick={() => {
                dispatch(clearCart());
                dispatch(toggleDifferentRestaurant());
              }}
              className="w-1/2 bg-green-600 py-3 text-white"
            >
              Yes, start Afresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
