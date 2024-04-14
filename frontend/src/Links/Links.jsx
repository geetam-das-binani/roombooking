import { TbTruckDelivery } from "react-icons/tb";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaHouseCircleExclamation } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
const linksArray = [
  {
    name: "Add Room",
    url: "/dashboard/add-room",
      icon: <FaHouseUser color="black" />,
  },
  {
    name: "Bookings",
    url: "/dashboard/bookings",
    icon: <TbTruckDelivery />,
  },
  {
    name: "Rooms",
    url: "/dashboard/rooms",
    icon: <BsFillHouseDoorFill />,
  },
  {
    name: "AvailableRooms",
    url: "/dashboard/available-rooms",
    icon: <FaHouseCircleExclamation />,
  },
  {
    name:"Users",
    url:"/dashboard/users",
    icon:<IoPeopleSharp/>
  }
];
export default linksArray;
