import Dashboard from "./Dashboard";
import * as apiClient from "../apiCilet";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
const DashboardBookings = () => {
  const navigate=useNavigate()
  const { data } = useQuery({
    queryKey: ["bookings"],
    queryFn: apiClient.getAllBookingsAdmin,
  });

  if (!data) {
    return <div>Something Went Wrong</div>;
  }

  return (
    <Fragment>
      <TableContainer>
        <Table className="relative" size="sm">
          <Thead className="sticky top-0">
            <Tr>
              <Th>BookingId</Th>
              <Th>startTime</Th>
              <Th>endTime</Th>
              <Th>totalPrice</Th>
              <Th>created at</Th>
              <Th>booked by</Th>
              <Th>Members</Th>
              <Th> status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.bookings?.slice(0,3).map((booking) => (
              <Tr
                key={booking._id}
                className="hover:bg-blue-600 hover:text-white font-semibold duration-300 "
              >
                <Td className="w-3">{booking?._id}</Td>
                <Td className="w-3">{booking?.startTime}</Td>
                <Td className="w-3">{booking?.endTime}</Td>
                <Td className="w-1"> ₹{booking?.totalPrice}</Td>

                <Td className="w-3">
                  {booking?.createdAt
                    ? new Date(booking.createdAt).toDateString()
                    : "N/A"}
                </Td>

                <Td>{booking?.user?.name}</Td>

                <Td className="w-1">
                  {booking?.totalPrice / booking?.roomId?.price}
                </Td>
                <Td
                  className={`w-3 ${
                    booking.paymentStatus ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {booking.paymentStatus ? "Paid" : "Unpaid"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className="flex justify-center m-2">
        <Button onClick={() => navigate("/all-bookings")} colorScheme="blue">
          View More
        </Button>
      </div>
    </Fragment>
  );
};

export default Dashboard(DashboardBookings);
