import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiCilet";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Details = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authUser);
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => apiClient.getSingleRoomDetailsById(id),
  });

  if (!data) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Room Detail for # {data?.room?._id}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr]  border border-slate-300 rounded-lg p-8 gap-5  ">
        <div className="lg:w-full h-[250px]">
          <img
            className="w-full h-full object-cover object-center"
            src={data?.room?.roomImage}
          />
        </div>
        <div className="flex flex-col gap-4  ">
          <div className="text-2xl font-bold">
            {data?.room?.description}
            <div className="text-2xl font-semibold">
              Capacity- {data?.room?.capacity}
            </div>
          </div>
          <div>
            <p className="font-bold mr-2">Price:₹{data?.room?.price}</p>
            <p className="font-bold mr-2">Room No:{data?.room?.roomNumber}</p>
          </div>
          <div className="max-h-[150px] overflow-y-auto gap-1">
            {data?.room?.availability?.map((elem, idx) => (
              <div key={idx}>
                <p className="font-bold mr-2">
                  Date: {new Date(elem.date).toLocaleDateString()}
                </p>

                <p className="font-bold mr-2">
                  Time Slots:{" "}
                  {
                    <span>
                      {elem.startTime} - {elem.endTime}
                      {elem.isBooked ? (
                        <span
                          className="text-white p-2 bg-red-500 
                        rounded-md  ml-2 "
                        >
                          Not Available
                        </span>
                      ) : (
                        <span
                          className="text-white p-2 bg-green-500 
                        rounded-md  ml-2
                        "
                        >
                          Available
                        </span>
                      )}
                    </span>
                  }
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                isAuthenticated
                  ? navigate(`/booking/${data?.room?._id}`, { state: { data } })
                  : navigate("/login", { state: { from: location } });
              }}
              className="text-white p-2 bg-blue-500 rounded-md font-bold hover:bg-blue-600 duration-200"
            >
              {isAuthenticated ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
