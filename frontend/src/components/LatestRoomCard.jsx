import { Link } from "react-router-dom";

const LatestRoomCard = ({room}) => {
  return (
    <Link
      className="relative cursor-pointer overflow-hidden rounded-md"
      to={`/detail/${room._id}`}
    >
      <div className="h-[300px]">
        <img
          className="w-full h-full object-cover object-center"
          src={room.roomImage}
          alt={room.description}
        />
      </div>
      <div className="absolute bottom-0 p-4 w-full bg-black bg-opacity-50 rounded-b-md">
        <div className="text-white font-bold tracking-tight text-3xl">
        {room.description}
        </div>
      </div>
    </Link>
  );
};

export default LatestRoomCard;
