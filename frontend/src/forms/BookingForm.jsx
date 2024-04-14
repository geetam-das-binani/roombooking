import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../apiCilet";
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
const BookingForm = ({ data: room }) => {
  const { user } = useSelector((state) => state.authUser);
  const navigate=useNavigate()
  const [members, setMembers] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const { mutate } = useMutation({
    mutationFn: apiClient.makeBooking,
    onSuccess: (data) => {
      toast.success(data.message)
      navigate("/my-bookings")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      roomId: room?._id,
      members,
      startTime,
      endTime,
      date,
    }

    mutate(formData);

  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="text-gray-700 font-bold text-sm flex-1">
          Name
          <input
            disabled
            readOnly
            value={user?.name || ""}
            type="text"
            className="mt-1 w-full border border-slate-300 rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>

        <label className="text-gray-700 font-bold text-sm flex-1">
          Email
          <input
            disabled
            readOnly
            type="email"
            value={user?.email || ""}
            className="mt-1 w-full border border-slate-300 rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-2 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost :₹{members ? members * room.price : 0}
            <div className="text-xs">Includes Tax and Charges</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <label className="text-gray-700 font-bold text-sm flex-1 w-fit">
          Start Time:
          <select
            required
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
            className="p-2 rounded-md bg-gray-100 border border-slate-300"
          >
            <option value="">Select Start Time</option>
            {room?.availability?.map((elem, idx) => (
              <option key={idx} value={elem?.startTime}>
                {elem?.startTime}
              </option>
            ))}
          </select>
        </label>
        <label className="text-gray-700 font-bold text-sm flex-1 w-fit">
          End Time:
          <select
            required
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="p-2 rounded-md border bg-gray-100 border-slate-300"
          >
            <option value="">Select End Time</option>
            {room?.availability?.map((elem, idx) => (
              <option key={idx} value={elem?.endTime}>
                {elem?.endTime}
              </option>
            ))}
          </select>
        </label>
        <label className="text-gray-700 flex font-bold text-sm flex-1 w-fit">
          Members:
          <input
            required
            className="border w-10 border-slate-300 rounded  p-1 text-gray-700  font-normal mb-1"
            type="number"
            min={1}
            value={members}
            onChange={(e) => setMembers(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        Date:
        <select
          className="p-2 rounded-md border bg-gray-100 border-slate-300"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          <option value="">Select Date</option>

          {room?.availability?.map((elem, idx) => (
            <option key={idx} value={elem?.date}>
              {new Date(elem?.date).toDateString()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          // disabled={disabled}
          type="submit"
          className="bg-blue-600
         text-white p-2 font-bold
          hover:bg-blue-500 text-md
           disabled:bg-gray-500"
        >
          Confirm Book
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
