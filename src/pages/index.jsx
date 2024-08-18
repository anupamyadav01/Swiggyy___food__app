import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="w-full">
      <div className="w-full px-2 sm:mx-auto sm:max-w-[80%] 2xl:max-w-[1200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
