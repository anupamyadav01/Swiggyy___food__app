import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[75%] py-3">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
