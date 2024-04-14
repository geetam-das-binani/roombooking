import { useNavigate } from 'react-router-dom';
import Dashboard from "./Dashboard";
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
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiCilet";
import { Fragment } from "react";

const DashboardRooms = () => {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: apiClient.getAllRooms,
  });

  if (!data) return <div>Something Went Wrong</div>;

  return (
  <Fragment>
      <TableContainer>
      <Table className="relative" size="sm">
        <Thead className="sticky top-0">
          <Tr>
            <Th>roomId</Th>
            <Th>capacity</Th>
            <Th>description</Th>
            <Th>created at</Th>
            <Th>price</Th>
            <Th>room Number</Th>
            <Th>image</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.rooms?.slice(0,3).map((room) => (
            <Tr
              key={room._id}
              className="hover:bg-blue-600 hover:text-white font-semibold duration-300 "
            >
              <Td className="w-3">{room?._id}</Td>
              <Td className="w-3">{room?.capacity}</Td>
              <Td className="w-3">{room?.description}</Td>
              <Td className="w-3">
                {room?.createdAt
                  ? new Date(room?.createdAt).toDateString()
                  : "N/A"}
              </Td>
              <Td> ₹{room?.price}</Td>
              <Td>{room?.roomNumber}</Td>
              <Td>
                <img
                  className="w-10 h-10 rounded-full"
                  src={room.roomImage}
                  alt={room.description}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    <div className="flex justify-center m-2">
        <Button onClick={()=>navigate("/all-rooms")} colorScheme="blue">
          View More
        </Button>
      </div>
  </Fragment>
  );
};

export default Dashboard(DashboardRooms);
