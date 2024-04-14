import { useNavigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiCilet";
import { Button } from "@chakra-ui/react";
const AllRooms = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: apiClient.getAllRooms,
  });

  if (!data) return <div>Something Went Wrong</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">All Rooms</h1>

      {data?.rooms?.map((room) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr]  border border-slate-300 rounded-lg p-8 gap-4 mb-3">
          <div className="lg:w-full h-[250px]">
            <img
              className="w-full h-full object-cover object-center"
              src={room?.roomImage}
            />
          </div>
          <div className="flex flex-col gap-4  ">
            <div className="text-2xl font-bold">
              {room?.description}
              <div className="text-2xl font-semibold">
                Capacity- {room?.capacity}
              </div>
            </div>
            <div>
              <p className="font-bold mr-2">Price:₹{room?.price}</p>
              <p className="font-bold mr-2">Room No:{room?.roomNumber}</p>
            </div>
            <div className="max-h-[200px] overflow-y-auto gap-1">
              {room?.availability?.map((elem, idx) => (
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
              <Button
                onClick={() =>
                  navigate(`/update`, {
                    state: {
                      room,
                    },
                  })
                }
                colorScheme="blue"
              >
                Want To update ?
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRooms;
