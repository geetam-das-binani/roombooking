import { useLocation } from "react-router-dom"
import BookingDetailsSummary from "../components/BookingDetailsSummary"
import BookingForm from '../forms/BookingForm'

const Booking = () => {
  const location = useLocation()


  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Confirm Your Booking</h1>
       <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr]"> 
       <BookingDetailsSummary data={location.state.data.room} />
     
       <BookingForm data={location.state.data.room}  />
       </div>
     
    </div>
  )
}

export default Booking
