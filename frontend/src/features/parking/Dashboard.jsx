import "@/styles/chat/mobile/parking/index.css"
import slots from "@/lib/slice_slot";
import { useEffect, useState } from "react";
import { socket } from "@/services/socket.service";
import formatTime from "@/utils/format_time";

const ParkingDashboard = () => {
  const [selectedDate] = useState("today");
  // const [parkingData, setParkingData] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [now, setNow] = useState(Date.now());

  const rows = [
    slots.slice(0, 13),
    slots.slice(13, 26),
    slots.slice(26, 43),
    slots.slice(43, 60),
  ];
  const toggleSlot = (id) => {
    setSelectedSlot(id === selectedSlot ? null : id);
        // socket.emit("slots:init", {message : "hello"});
  };
  useEffect(() => {
    const t = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(t);
  }, []);
  // useEffect(() => {



  //   socket.on("slot:update", (slot) => {
  //     console.log(slot);

      

  //     setSelectedSlot((prev) => ({ ...prev, [slot.slotId]: slot }));
  //   });
  //   socket.on("slot:reset", (slotId) => {
  //     setSelectedSlot((prev) => {
  //       const copy = { ...prev };
  //       delete copy[slotId];
  //       return copy;
  //     });
  //   });

  //   return () => {
  //     socket.off("slots:init");
  //     socket.off("slot:update");
  //     socket.off("slot:reset");
  //   };
  // }, [toggleSlot]);
  const getTimeLeft = (expiresAt) => {
    const diff = expiresAt - now;
    return diff > 0 ? diff : 0;
  };
  // console.log(selectedSlot);

  return (
    <div>
      <h1>ParkingDashboard </h1>
      {/* <p className="new_date">
        Hết hạn sau:
        {formatTime(getTimeLeft(selectedSlot[selectedSlot.id].expiresAt))}
      </p> */}
      <div className="grid">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map(slot => {
              const occupied = selectedSlot === slot.id;

              return (
                <button
                  key={slot.id}
                  className={`slot ${occupied ? "occupied" : ""}`}
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