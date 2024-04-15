import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiCilet";
const MyBookings = () => {
  const { data,isError,error } = useQuery({
    queryKey: ["booking"],
    queryFn: apiClient.getMyBookings,
  });

  if (data?.bookings?.length===0) {
    return (
      <h1 className="text-3xl text-gray-500 text-center">No Bookings Found</h1>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {data?.bookings?.map((booking) => {
        return (
          <div
            key={booking._id}
            className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
          >
            <div className="lg:w-full h-[250px]">
              <img
                className="w-full h-full object-cover object-center"
                src={booking?.roomId?.roomImage}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold">
                {booking?.roomId?.description}
                <div className="text-xl font-semmibold">
                  Price Per Room-{" "}
                  <span className="text-gray-400">
                    ₹{booking?.roomId?.price}
                  </span>
                </div>
              </div>
              {/* {hotel?.bookings?.map((booking) => (
            <div>
              <div>
                <span className="font-bold mr-2">Dates:</span>

                <span>
                  {new Date(booking?.checkIn).toDateString()} -{" "}
                  {new Date(booking?.checkOut).toDateString()}
                </span>
              </div>
              <div>
                <span className="font-bold mr-2">Guests:</span>
                <span>
                  {booking?.adultCount} adults,
                  {booking?.childCount} children
                </span>
              </div>
            </div>
          ))} */}
              <div className="text-xl font-bold">
                <div>
                  Members:{" "}
                  <span className="text-gray-400">
                    {booking?.totalPrice / booking?.roomId?.price}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold">
                <div className="text-xl font-semmibold">
                  Total Price-{" "}
                  <span className="text-gray-400">₹{booking?.totalPrice}</span>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold ">
                  Booked On-
                  <span className="text-gray-400">
                    {" "}
                    {new Date(booking?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-xl font-bold">
                <div>
                  Payment Status:{" "}
                  {booking.paymentStatus ? (
                    <span className="text-white bg-green-500 p-2 rounded-md font-bold">
                      Paid
                    </span>
                  ) : (
                    <span className="text-white bg-red-500 p-2 rounded-md font-bold">
                      Not Paid
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xl font-bold">
                Timings:
                 <span className=" text-gray-400"> 
                  {booking?.startTime +
                    " - " +
                   booking?.endTime}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
