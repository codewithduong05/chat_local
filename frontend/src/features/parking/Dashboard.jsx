import "@/styles/chat/mobile/parking/index.css"
import slots from "@/lib/slice_slot";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/services/socket.service";
import formatTime from "@/utils/format_time";

const ParkingDashboard = () => {
  const [selectedDate] = useState("today");
const [now, setNow] = useState(Date.now());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [serverNow, setServerNow] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);



  const rows = [
    slots.slice(0, 13),
    slots.slice(13, 26),
    slots.slice(26, 43),
    slots.slice(43, 60),
  ];
  const toggleSlot = useCallback((id) => {
    setSelectedSlot(prev => (id === prev ? null : id));
    socket.emit("send-parking", id);

  }, []);

useEffect(() => {
  const handler = (data) => {
    setServerNow(data.serverNow);
    setExpiresAt(data.expiresAt);
  };

  socket.on("parking-update", handler);

  return () => socket.off("parking-update", handler);
}, []);


useEffect(() => {
  if (!serverNow) return;

  const offset = serverNow - Date.now(); 
  // lệch giờ client ↔ server

  const t = setInterval(() => {
    setNow(Date.now() + offset);
    // if (now)
    console.log(now);
    
  }, 1000);

  return () => clearInterval(t);
}, [serverNow]);

const getTimeLeft = () => {
  console.log(formatTime(now));
  
  if (!expiresAt || !now) {
    return 0
    
    
  };
  return Math.max(0, expiresAt - now);
};
  return (
    <div>
      <h1>ParkingDashboard </h1>
      <p className="new_date">
        Hết hạn sau:
        {formatTime(getTimeLeft())}
      </p>
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