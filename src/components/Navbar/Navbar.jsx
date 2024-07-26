const Navbar = () => {
  return (
    <div className="h-20 w-full p-4 shadow">
      <div className="mx-auto flex max-w-[95%] items-center justify-between">
        <div className="flex items-center">
          <div>
            <img
              className="w-24 hover:scale-110 transition-all duration-200 cursor-pointer ease-in-out"
              src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Emblem.png"
              alt="logo"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="cursor-pointer border-b-2 border-b-black font-bold hover:text-orange-500 hover:border-b-2 hover:border-b-orange-500">others</p>
            <i className="fi fi-rr-angle-small-down mt-2 cursor-pointer text-2xl text-orange-600"></i>
          </div>
        </div>
        <div className="flex items-center text-[#374151] gap-12">
          <div className="flex items-center gap-2 cursor-pointer">
            <i className="fi fi-rr-search mt-1 text-xl"></i>
            <p className="text-lg font-medium">Search</p>
          </div>{" "}
          <div className="flex items-center gap-2 cursor-pointer">
            <i className="fi fi-rr-user mt-1 text-xl"></i>
            <p className="text-lg font-medium">Sign in</p>
          </div>{" "}
          <div className="flex items-center gap-2 cursor-pointer">
            <i className="fi fi-rr-shopping-cart-add mt-1 text-xl"></i>
            <p className="text-lg font-medium">Cart</p>
            <p className="text-lg font-medium">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
