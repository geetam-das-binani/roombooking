import { useState } from "react";
import {Input,Button} from '@chakra-ui/react'
import {useMutation} from '@tanstack/react-query'
import * as apiClient from '../apiCilet'
import toast from 'react-hot-toast'
import {ArrowBackIcon} from '@chakra-ui/icons'
import {useLocation, useNavigate, useParams} from 'react-router-dom'


const minDate=new Date().toISOString().split('T')[0]
const AddRoomAvailability = () => {
    const {id}=useParams()
 
    const location=useLocation()
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const navigate=useNavigate()

  const {mutate,isPending}=useMutation({
    mutationFn:apiClient.addAvailabilityAdmin,
    onSuccess:(data)=>{
        toast.success(data.message)
        navigate("/all-rooms") 
    },
    onError:(error)=>{
        toast.error(error.message)
    }
  })
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!startTime || !endTime || !date){
      toast.error("All fields are required")
      return
    }
    const data={
      startTime,
      endTime,
      date,
      roomId:id
    }
    
    mutate(data)
  }
  
  return (
    <div>
      <h1 className="text-center  text-xl font-bold m-2 ">
       <ArrowBackIcon onClick={()=>navigate('/all-rooms')}/> Add Room Availability for  {" "}
        {location?.state?.room?.description}
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

export default AddRoomAvailability;
