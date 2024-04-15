import { useQuery } from "@tanstack/react-query";
import React from "react";
import * as apiClient from "../apiCilet";
import LatestRoomCard from "../components/LatestRoomCard";
import { Skeleton, Stack } from "@chakra-ui/react";
const HomePage = () => {
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: apiClient.getAllRooms,
  });

  if (!data || !data?.rooms?.length)
    return (
      <Stack>
        <Stack flexDir={"row"} >
          <Skeleton height="300px" width="100%"  />
          <Skeleton height="300px" width="100%" />
        </Stack>
        <Stack flexDir={"row"} >
          <Skeleton height="300px" width="100%"  />
          <Skeleton height="300px" width="100%" />
          <Skeleton height="300px" width="100%" />
        </Stack>
      </Stack>
    );

  const topRowRooms = data?.rooms?.slice(0, 2) || [];
  const bottomRowRooms = data?.rooms?.slice(2) || [];
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">
        <p className="text-2xl mb-2 ">Most Recent Rooms added by our hosts</p>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {topRowRooms?.map((room) => (
              <LatestRoomCard key={room._id} room={room} />
            ))}
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            {bottomRowRooms?.map((room) => (
              <LatestRoomCard key={room._id} room={room} />
            ))}
          </div>
        </div>
      </h2>
    </div>
  );
};

export default HomePage;
