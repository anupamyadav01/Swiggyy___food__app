import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import OffersCard from "../../components/OffersCard/OffersCard";
// import RestaurantData from "../../constants/RestaurantDetails.json";
const RestaurantDetail = () => {
  const { id } = useParams();
  const mainID = id.split("-").at(-1);

  const [menuData, setMenuData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [value, setValue] = useState(0);
  // const [currentId, setCurrentId] = useState(null);
  // console.log(menuData?.card);

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

      let filteredData =
        results?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
          (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
        );
      setMenuData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(menuData);

  useEffect(() => {
    fetchRestaurantDetails();
  }, []);

  const handleNext = () => {};
  const handlePrev = () => {};

  // function for single card open
  // const handleOnClick = (id) => {
  //   // console.log(id);
  //   setCurrentId(currentId === id ? null : id);
  //   console.log(currentId);
  // };

  // const handleOnClick = () => {
  //   setIsOpen((prev) => !prev);
  // };

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
                    (value >= 124 ? "bg-gray-100" : "bg-gray-200")
                  }
                >
                  <i
                    className={
                      `fi fi-rr-arrow-small-right mt-1 text-2xl ` +
                      (value >= 124 ? "text-gray-300" : "text-gray-800")
                    }
                  ></i>
                </div>
              </div>
            </div>
            <div className="mx-4 mt-5 flex gap-4 hover:cursor-pointer">
              {offersData.map((data, i) => (
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
            {menuData.map(({ card: { card } }) => {
              return <MenuCard key={card.title} card={card} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const MenuCard = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };
  // console.log(itemCards);
  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <div>
        <div>
          <h1 className="flex items-center justify-between text-lg font-bold">
            {title} ({itemCards.length})
            <span onClick={toggleDropDown}>
              {isOpen ? (
                <i className="fi fi-ss-angle-small-up cursor-pointer text-3xl"></i>
              ) : (
                <i className="fi fi-ss-angle-small-down cursor-pointer text-3xl"></i>
              )}
            </span>
          </h1>
        </div>
        {isOpen && <DetailMenu itemCards={itemCards} />}
      </div>
    );
  } else {
    const { title, categories } = card;
    return (
      <div>
        <p>{title}</p>
        <div>
          {categories.map((data) => {
            return <MenuCard key={data.title} card={data} />;
          })}
        </div>
      </div>
    );
  }
};

const DetailMenu = ({ itemCards }) => {
  return (
    <div className="mx-4 my-4">
      {itemCards.map(({ card: { info } }) => {
        return <div key={info.id}>{info.name}</div>;
      })}
    </div>
  );
};

DetailMenu.propTypes = {
  itemCards: PropTypes.array
};

MenuCard.propTypes = {
  card: PropTypes.object
};
export default RestaurantDetail;
