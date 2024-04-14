import Dashboard from '../Admin/Dashboard'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    useDisclosure,
  } from "@chakra-ui/react";
;
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiCilet";
const DashboardUsers = () => {

    const { data, isError, error } = useQuery({
        queryFn: apiClient.getAllUsers,
        queryKey: ["users"],
      });
    
      if (isError || !data?.length) {
        return <div>{error?.message || "Soemthing went wrong"}</div>;
      }

    
  return (
    <TableContainer >
      <Table className="relative" size="sm">
        <Thead className="sticky top-0">
          <Tr>
            <Th>UserId</Th>
            <Th>mail</Th>
            <Th>name</Th>
            <Th>joined on</Th>
            <Th>avatar</Th>
            <Th>isAdmin</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((user) => (
            <Tr  
            key={user._id}
            className="hover:bg-blue-600 hover:text-white font-semibold duration-300 ">
              <Td className="w-3">{user?._id}</Td>
              <Td className="w-3">{user?.email}</Td>
              <Td className="w-3">
             {
                user?.name
             }
              </Td>
              <Td className="w-3">
                 {user?.createdAt
                  ? new Date(user.createdAt).toDateString()
                  : "N/A"} 
              </Td>
              <Td>
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.avatar}
                  alt={user.firstName}
                />
              </Td>
              <Td className={`${user?.isAdmin ? "text-green-500" : "text-red-500"}`}>
                {user?.isAdmin ? "Yes" : "No"}
              </Td>
           
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default Dashboard(DashboardUsers)
