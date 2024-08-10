const getFoodTypesData = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const results = await response.json();
    return results?.data?.cards[0]?.card?.card?.imageGridCards?.info;
  } catch (error) {
    throw new Error("Error while fetchig data", error);
  }
};

const getTopRestaurantsData = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const results = await response.json();
    // console.log(results?.data?);

    return results;
  } catch (error) {
    throw new Error("Error while fetchig data", error);
  }
};

// const getAllData = async (lat, lng) => {
//   try {
//     const response = await fetch(
//       `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
//     );
//     const results = await response.json();
//     return results?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
//       ?.restaurants;
//   } catch (error) {
//     throw new Error("Error while fetchig data", error);
//   }
// };

export { getFoodTypesData, getTopRestaurantsData };
