import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as apiClient from "../apiCilet";
import { Button, Icon, Input } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FaImage } from "react-icons/fa";
const minDate = new Date().toISOString().split("T")[0];
const UpdateRoom = () => {
  const location = useLocation();
 
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    location?.state?.room?.roomImage || ""
  );
 
  const [price, setPrice] = useState(location?.state?.room?.price || "");
  const [capacity, setCapacity] = useState(
    location?.state?.room?.capacity || ""
  );
  const [description, setDescription] = useState(
    location?.state?.room?.description || ""
  );
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateRoomAdmin,
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
    if (!imagePreview) {
      toast.error("Please select an image");
      return;
    }
    formData.append("roomImage", file);
    formData.append("existingImage", imagePreview);
  
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("description", description);
    
    const roomId = location?.state?.room?._id;
    formData.append("roomId", roomId);
    mutate(formData);
  };

  const handleFileChange = (e) => {
    const inputFile = e.target.files?.[0];
    if (inputFile) {
      setFile(inputFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(inputFile);
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Update Room</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 border
           border-slate-300 rounded-lg mx-auto w-1/2"
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

       
      
        {imagePreview && (
          <div>
            <label className="font-semibold">
              Preview :{" "}
              <CloseIcon ml={2} onClick={() => setImagePreview(null)} />
              <img src={imagePreview} alt={description} />
            </label>
          </div>
        )}

        <div>
          <label className="font-semibold">
            Choose an Image: <Icon as={FaImage} />
            <Input
              accept="image/*"
              onChange={handleFileChange}
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

export default UpdateRoom;
