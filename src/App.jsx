import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[75%] py-3">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
