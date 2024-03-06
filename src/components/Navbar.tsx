import logo from "/logo.png";
import icon from "/icon.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-[100%] flex flex-row items-center justify-between p-[10px]">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      <div className="">
        <img src={icon} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
