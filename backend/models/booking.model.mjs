import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms',
    required: true,
  },
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
  totalPrice:{
    type:Number,
    required:true
  },
  paymentStatus:{
    type:Boolean,
    default:false
  }
},{timestamps:true});
export default mongoose.model('booking', bookingSchema);