import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import linkedin_icon from "../assets/linkedin-icon.svg";
import twitter_icon from "../assets/twitter-icon.svg";
import facebook_icon from "../assets/facebook-icon.svg";

const Footer = () => {
  return (
    <div className="m-0 px-3 py-10 md:px-10 md:py-16 flex flex-col justify-center items-center gap-5 bg-[#1f1f1f]">
      <div className="flex items-center gap-1">
        <img src={logo} alt="" className="w-8" />
        <p className="text-center font-bold text-white md:text-xl">SPERAX</p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="text-sm font-medium text-white hover:text-[#9B31CD] cursor-pointer"
        >
          Home
        </Link>
        <Link
          to="/wallet-balance"
          className="text-sm font-medium text-white hover:text-[#9B31CD] cursor-pointer"
        >
          Token balance
        </Link>
        <Link
          to="/transfer"
          className="text-sm font-medium text-white hover:text-[#9B31CD] cursor-pointer"
        >
          Send Token
        </Link>
        <p
          onClick={() =>
            window.open("/sperax-client-documentation.pdf", "_self")
          }
          className="text-sm font-medium text-white hover:text-[#9B31CD] cursor-pointer"
        >
          Documentation
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="cursor-pointer p-2 rounded-full border border-white flex items-center justify-center">
          <img src={linkedin_icon} alt="" className="w-4" />
        </div>
        <div className="cursor-pointer p-2 rounded-full border border-white flex items-center justify-center">
          <img src={twitter_icon} alt="" className="w-4" />
        </div>
        <div className="cursor-pointer p-2 rounded-full border border-white flex items-center justify-center">
          <img src={facebook_icon} alt="" className="w-4" />
        </div>
      </div>

      <p className="text-xs md:text-sm text-white">
        &copy; 2024 All rights reserved
      </p>
    </div>
  );
};

export default Footer;
