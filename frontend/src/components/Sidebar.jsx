import { Link } from "react-router-dom";
import linksArray from "../Links/Links";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="border-b-2 md:border-r-2">
      <div className="sidebar   lg:left-0 p-2 overflow-y-auto text-center bg-white-600">
        <div className="text-gray-100 text-xl">
          <Link
            to={"/dashboard"}
            className="
          cursor-pointer
          p-2.5 mt-1 flex items-center"
          >
            <MdDashboard size={25} color="blue" />
            <h1 className="font-bold text-black  text-[15px] ml-3">
              Dashboard
            </h1>
            <i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
          </Link>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        {linksArray.map((elem) => (
          <Link
            key={elem.name}
            to={elem.url}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 
            duration-300 cursor-pointer hover:bg-blue-600
            
            hover:text-white "
          >
            {elem.icon}
            <span className="text-[15px]  ml-4 font-bold ">{elem.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
