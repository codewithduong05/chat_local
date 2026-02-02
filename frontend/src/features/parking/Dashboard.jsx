import "@/styles/chat/mobile/parking/index.css"
import slots from "@/lib/slice_slot";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/services/socket.service";
import formatTime from "@/utils/format_time";
import { getTimeParking } from "../../services/parking.service";

const ParkingDashboard = () => {
  const [messageDate,setmessageDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectTime, setSelectTime] = useState(0)
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
  }, []);



  const handler_click_socket = async () => {
    if (selectTime == 0 || !selectTime)
      alert("chua chon so gio")
    else if (selectedSlot == null)
      alert("chua cho so ghe")


    const data = {
      seat: selectedSlot,
      status: true,
      expiresAt: selectTime
    }
     setExpiresAt(true)
      setLoading(!loading)
    socket.emit('send-parking', data);

  }
  useEffect(() => {
   const fectch = async () => {
      const response = await getTimeParking()
 
      if (response.message) {
        console.log(response.data);
        setSelectedSlot(response.data[0].seat)
        setExpiresAt(response.data[0].status)
      }
      
   }
   fectch()
  }, [])
  
  useEffect(() => {
    socket.on("parking-timer",(data) => {
      // console.log(data);
      setServerNow(data.timeFormat)
      
    })
    socket.on("parking-expired", (data) => {
      console.log(data);
       setSelectedSlot(null)
       setExpiresAt(null)
       setmessageDate(data.message)
       selectTime(0)
      
    })
    console.log("selectTime =", selectTime);
  }, []);

  
  return (
    <div>
      <h1>ParkingDashboard </h1>
      {messageDate ? <span>{messageDate && messageDate}</span>
      : 
      <p>Het han sau : {serverNow}</p>
      }
      
      
      <form action="" >
        <p>Nhap so gio (vd : 8h)</p>
        <input type="number" value={selectTime}
          onChange={e => setSelectTime(Number(e.target.value))}
          name="" id="" />
        <button
          type="button"
          onClick={handler_click_socket}
        >Xac nhan</button>
        <div className="choice_recomend">
          <span
            className="choice_recomend_button"
            onClick={() => setSelectTime(12)}>12 h</span>
          <span
            className="choice_recomend_button"
            onClick={() => setSelectTime(8)}>8 h</span>
          <span
            className="choice_recomend_button"
            onClick={() => setSelectTime(4)}>4 h</span>
        </div>
      </form>
      <br />
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
      <div> Trang thai:  {loading && expiresAt
      ? 
      <span 
      style={{color: "green",fontFamily:"monospace"}}
      >{expiresAt.toString()}</span>  
      : <span
       style={{color: "red", fontFamily: "monospace"}}
      >false</span>} </div>
    </div>);
}

export default ParkingDashboard;