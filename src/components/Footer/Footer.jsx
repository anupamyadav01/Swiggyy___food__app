// import { PLAYSTORE_LOGO, APPSTORE_LOGO } from "../utils/constants";
import logo from "../../assets/swiggy-logo.svg";
import { ChevronDown } from "lucide-react";
const Footer = () => {
  return (
    <>
      <div className="mt-14 w-full bg-[#F0F0F5] px-2 py-6 sm:px-6 md:px-16 xl:mt-20 xl:px-72">
        <div className="text-center font-bold md:text-2xl">
          For better experience, download the Swiggy app now
        </div>
      </div>
      <div className="w-full bg-[#02060C] py-10 pb-10">
        <div className="grid grid-cols-2 gap-10 px-10 sm:grid-cols-5 sm:px-0">
          <div className="col-span-2 flex w-full flex-col items-center justify-center sm:-mt-10">
            <div>
              {" "}
              <img src={logo} alt="Logo" className="w-10 sm:w-20" />
            </div>
            <p className="text-center text-sm text-[#9A9B9E] md:text-lg">
              © 2023 Bundl Technologies Pvt. Ltd
            </p>
          </div>
          <div className="col-span-1">
            <p className="text-sm font-bold text-white md:text-lg">Company</p>
            <div className="text-xs text-gray-500 md:text-base">
              <p>About</p>
              <p>Careers</p>
              <p>Team</p>
              <p>Swiggy One</p>
              <p>Swiggy Instamart</p>
              <p>Swiggy Genie</p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="-mt-2 flex flex-col gap-2 sm:mt-0">
              <p className="text-sm font-bold text-white md:text-lg">
                Contact Us
              </p>
              <div className="text-xs text-gray-500 md:text-base">
                <p>Help & Support</p>
                <p>Partner with us</p>
                <p>Ride with us</p>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 md:text-base">
                <p>Terms & Conditions</p>
                <p>Cookie Policy</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <p className="text-sm font-bold text-white md:text-lg">
              We deliver to:
            </p>
            <div className="text-xs text-gray-500 md:text-base">
              <p>Bangalore</p>
              <p>Gurgaon</p>
              <p>Hyderabad</p>
              <p>Delhi</p>
              <p>Mumbai</p>
              <p>Pune</p>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg border-[1px] border-[#9A9B9E] px-2 py-1">
              <p className="text-xs text-[#9A9B9E]">589 Cities</p>
              <ChevronDown size={20} color="#9A9B9E" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
