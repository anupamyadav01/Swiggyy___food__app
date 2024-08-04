import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="relative w-full">
      <div className="absolute z-50 h-full w-full bg-black/35"></div>
      <div className="mx-auto max-w-[75%] py-3">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
