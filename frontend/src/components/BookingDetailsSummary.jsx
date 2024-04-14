const BookingDetailsSummary = ({ data }) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2> Booking Details</h2>
      <div className="border-b py-2">
        Room No:
        <div className="font-bold">{data?.roomNumber}</div>
      </div>
      <div>
        Description:
        <div className="font-bold">{data?.description}</div>
      </div>
      <div className="border-t border-b py-2">
        Total Capacity:
        <div className="font-bold"> {data?.capacity}</div>
      </div>
      <div>
        Price Per Room
        <div className="font-bold">₹{data.price}</div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
