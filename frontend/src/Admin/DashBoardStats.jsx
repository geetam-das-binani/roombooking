import Dashboard from "./Dashboard";
import * as apiClient from "../apiCilet";
import { FaArrowDown } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaHouseCircleExclamation } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaArrowUp } from "react-icons/fa";
const DashBoardStats = () => {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: apiClient.getDasboardStats,
  });
  if (!data) {
    return <div>Something Went Wrong</div>;
  }

  return (
    <div className="p-3">
      <h2 className="text-2xl mb-2 text-center font-semibold  ">Statistics</h2>
      {/* widgets with icon */}
      <div
        className="grid
      w-[70%]
      grid-cols-1 md:grid-cols-2  mx-auto  gap-3"
      >
        <div className="hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-fuchsia-200 text-black   shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.users?.length > 5 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}{" "}
              Users
            </div>
            <div className="flex flex-col justify-between ">
              {data?.users?.length} <IoMdPeople className="mt-3 text-xl" />
            </div>
          </div>

          <hr className="mt-2 mb-1 border border-black w-full" />

          <Link
            to={"/dashboard/users"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
        <div className=" hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-yellow-200 text-black  shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.bookings?.length >= 3 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}{" "}
              Bookings
            </div>
            <div className="flex flex-col justify-between ">
              {data?.bookings?.length}
              <TbTruckDelivery className="mt-3 text-2xl" />
            </div>
          </div>
          <hr className="mt-2 mb-1 border border-black w-full" />
          <Link
            to={"/dashboard/bookings"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
        <div className="hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-orange-200 text-black  shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.rooms?.length >= 8 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}{" "}
              Rooms
            </div>
            <div className="flex flex-col justify-between ">
              {data?.rooms?.length}{" "}
              <BsFillHouseDoorFill className="mt-3 text-2xl" />
            </div>
          </div>
          <hr className="mt-2 mb-1 border border-black w-full" />
          <Link
            to={"/dashboard/rooms"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
        <div className="hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-sky-200 text-black   shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.availableRooms?.length >= 5 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}
              Available Rooms
            </div>
            <div className="flex flex-col justify-between ">
              {data?.availableRooms?.length}{" "}
              <FaHouseCircleExclamation className="mt-3 text-2xl" />
            </div>
          </div>
          <hr className="mt-2 mb-1 border border-black w-full" />
          <Link
            to={"/dashboard/available-rooms"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard(DashBoardStats);

// change the arrow icons up and down on all 4 cards based on length logic
