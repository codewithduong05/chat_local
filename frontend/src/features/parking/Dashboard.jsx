import "@/styles/chat/mobile/parking/index.css"
import slots from "@/lib/slice_slot";
const ParkingDashboard = () => {
    // const slots = Array.from({ length: 30 }, (_, i) => ({
    //     id: i + 1,
    //     label: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`
    // }))
    // console.log(slots);
const rows = [
  slots.slice(0, 13),
  slots.slice(13, 26),
  slots.slice(26, 43),
  slots.slice(43, 60),
];
    return (
        <div>
            <h1>ParkingDashboard
            </h1>
            <div className="grid">
               {rows.map((row, rowIndex) => (
  <div key={rowIndex} className="row">
    {row.map(slot => {
      const occupied = parkingData[selectedDate]?.[slot.id];

      return (
        <button
          key={slot.id}
          className={occupied ? "slot occupied" : "slot"}
          onClick={() => toggleSlot(slot.id)}
        >
          {slot.label}
        </button>
      );
    })}
  </div>
))}

            </div>

        </div>);
}

export default ParkingDashboard;