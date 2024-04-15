import { Button, Input } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import * as apiClient from "../apiCilet";
import { ArrowBackIcon } from "@chakra-ui/icons";
const minDate = new Date().toISOString().split("T")[0];
const UpdateAvailability = () => {
  const { roomId, availabilityId } = useParams();

  const location = useLocation();
  const transformedDate = new Date(location?.state?.elem?.date)
    .toISOString()
    .split("T")[0];
  const [startTime, setStartTime] = useState(
    location?.state?.elem?.startTime || ""
  );
  const [endTime, setEndTime] = useState(location?.state?.elem?.endTime || "");
  const [date, setDate] = useState(transformedDate || "");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateRoomAvailability,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/all-rooms");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startTime || !endTime || !date) {
      toast.error("All fields are required");
      return;
    }
    const data = {
      startTime,
      endTime,
      date,
      roomId,
      availabilityId,
    };

    mutate(data);
  };
  return (
    <div>
      <h1 className="text-center  text-xl font-bold m-2 ">
        <ArrowBackIcon onClick={() => navigate("/all-rooms")} /> Update Room
        Availability for {location?.state?.room?.description}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 border
         border-slate-300 rounded-lg mx-auto w-1/2"
      >
        <div className="flex gap-2">
          <label className="font-semibold">
            StartTime:{" "}
            <Input
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              type="text"
              pattern="(0[1-9]|1[0-2]):[0-5][0-9] [APap][mM]"
              title="HH:MM AM/PM"
            />
          </label>
          <label className="font-semibold">
            EndTime:{" "}
            <Input
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              pattern="(0[1-9]|1[0-2]):[0-5][0-9] [APap][mM]"
              title="HH:MM AM/PM"
              type="text"
            />
          </label>
        </div>
        <div>
          <label className="font-semibold">
            Date:{" "}
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              required
              width="auto"
              type="date"
            />
          </label>
        </div>
        <Button isLoading={isPending} type="submit" colorScheme="blue">
          Confirm
        </Button>
      </form>
    </div>
  );
};

export default UpdateAvailability;
