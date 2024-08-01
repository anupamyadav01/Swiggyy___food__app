import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  const { id } = useParams();
  console.log(id);
  return <div className="h-screen w-full">RestaurantDetail {id}</div>;
};

export default RestaurantDetail;
