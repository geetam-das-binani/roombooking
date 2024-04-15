import { Button, Input } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import * as apiClient from "../apiCilet";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const minDate = new Date().toISOString().split("T")[0];
//  *  add chakra skeleton loader in all pages 
const AddRoom = () => {
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addRoomAdmin,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/dashboard/rooms");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!file) {
      toast.error("Please select an image");
      return;
    }
    formData.append("roomImage", file);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("date", date);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("description", description);
    mutate(formData);
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Add room</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 border border-slate-300 rounded-lg mx-auto w-1/2"
      >
        <div>
          <label className="font-semibold">
            Price Per Room:
            <Input
            ml={2}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              width="auto"
              htmlSize={4}
              variant="flushed"
            />
          </label>
        </div>
        <div>
          <label className="font-semibold">
            Capacity:
            <Input
            ml={2}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              min={1}
              max={2}
              width="auto"
              htmlSize={4}
              variant="flushed"
            />
          </label>
        </div>
        <div>
          <label className="font-semibold">
            Description:
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              type="text"
              variant="flushed"
            />
          </label>
        </div>

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
        <div>
          <label className="font-semibold">
            Choose an Image: <Icon as={FaImage} />
            <Input
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
              type="file"
              hidden
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

export default AddRoom;
