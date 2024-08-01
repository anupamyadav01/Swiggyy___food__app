import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import RestaurantData from "../../constants/RestaurantDetails.json";
const RestaurantDetail = () => {
  const { id } = useParams();
  const mainID = id.split("-").at(-1);

  const [menuData, setMenuData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  // console.log(menuData);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.9124336&lng=75.7872709&restaurantId=${mainID}&catalog_qa=undefined&submitAction=ENTER`
      );
      const results = await response.json();
      setRestaurantInfo(results?.data?.cards[2]?.card?.card?.info);
      setOffersData(
        results?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
      );
      setMenuData(
        results?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  return (
    <div className="w-full">
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
                  <span>{restaurantInfo.avgRating}</span>
                  <span>({restaurantInfo.totalRatingsString})</span>•
                  <span>{restaurantInfo.costForTwoMessage}</span>
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
                        {restaurantInfo.locality}
                      </span>
                    </p>
                    <p>{restaurantInfo.sla?.slaString}</p>
                  </div>
                </div>
              </div>
              <hr />

              <div className="w-full">
                <div className="flex items-center p-3">
                  {restaurantInfo.length !== 0 &&
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
      </div>
    </div>
  );
};

export default RestaurantDetail;
