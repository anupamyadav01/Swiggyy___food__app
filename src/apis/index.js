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

// search api
//www.swiggy.com/dapi/restaurants/search/v3?lat=26.9124336&lng=75.7872709&str=roll&trackingId=null&submitAction=SUGGESTION&queryUniqueId=572a500d-f0ae-fb0b-8426-a6020a278975&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22VEG%22%2C%22cloudinaryId%22%3A%22alyuywz7pihls3ebepiu%22%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D
// const searchQuery = "roll";
const getSearchRestaurant = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=26.9124336&lng=75.7872709&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=d39ed60b-5f72-4e19-4b90-aa7de4905097&selectedPLTab=RESTAURANT`
    );
    const data = response.json();
    // console.log(data);

    return data;
  } catch (error) {
    throw new Error("Error while fetchig data", error);
  }
};

const getDishesData = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=26.9124336&lng=75.7872709&str=${searchQuery}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=c9ab3a26-b88a-5e2b-c5b1-791bdf2b80df&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22jcgm3y2tv77mgi48cc4q%22%2C%22dishFamilyId%22%3A%22846565%22%2C%22dishPreparationStyleId%22%3A%22848841%22%2C%22dishFamilyIds%22%3A%5B%22846565%22%5D%2C%22dishPreparationStyleIds%22%3A%5B%22848841%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`
    );
    const data = response.json();
    // console.log(data);

    return data;
  } catch (error) {
    throw new Error("Error while fetchig data", error);
  }
};

// dishes api

// restaurant api
// https://www.swiggy.com/dapi/restaurants/search/v3?lat=26.9124336&lng=75.7872709&str=roll&trackingId=undefined&submitAction=ENTER&queryUniqueId=d39ed60b-5f72-4e19-4b90-aa7de4905097&selectedPLTab=RESTAURANT

export {
  getFoodTypesData,
  getTopRestaurantsData,
  getSearchRestaurant,
  getDishesData
};
