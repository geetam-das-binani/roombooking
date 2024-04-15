import mongoose from "mongoose";



const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    
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

roomSchema.pre('save', async function (next) {
  if (!this.roomNumber) {
    
    let roomNumber;
    do {
      roomNumber = Math.floor(Math.random() * 10000) + 1000;
    } while (await mongoose.model('rooms').findOne({ roomNumber }));
    this.roomNumber = roomNumber;
  }
  next();
});
export default mongoose.model('rooms', roomSchema);


