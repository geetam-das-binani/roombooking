import mongoose from "mongoose";
function generateRoomNumber() {
  return Math.floor(Math.random() * 10000) + 1; // Change the range as needed
}


const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    default: generateRoomNumber(),
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  roomImage:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  availability: [
    {
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      isBooked: {
        type: Boolean,
        default: false,
      },
    },
  ],
},{timestamps:true});

export default mongoose.model('rooms', roomSchema);


