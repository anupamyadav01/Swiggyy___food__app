import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[80%] 2xl:max-w-[1200px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
