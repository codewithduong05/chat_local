import "@/styles/chat/mobile/parking/index.css";
import slots from "@/lib/slice_slot";
import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "@/services/socket.service";
import { getTimeParking } from "@/services/parking.service";

/**
 * ParkingDashboard (React)
 * - Mỗi parking gửi lên server kèm expiresAt (ms timestamp).
 * - FE tự tính thời gian còn lại dựa trên expiresAt (để không phụ thuộc setInterval server).
 * - Hỗ trợ: nhận initial từ API, nhận sự kiện "parking-timer" và "parking-expired" qua socket.
 *
 * Lưu ý: socket service cần đã connect trước khi component mount.
 */

const ParkingDashboard = () => {
  const [messageDate, setMessageDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectTime, setSelectTime] = useState(0); // giờ
  const [currentParking, setCurrentParking] = useState(null);
  const intervalRef = useRef(null);

  const rows = [
    slots.slice(0, 13),
    slots.slice(13, 26),
    slots.slice(26, 43),
    slots.slice(43, 60),
  ];

  const toggleSlot = useCallback((id) => {
    setSelectedSlot((prev) => (id === prev ? null : id));
  }, []);

  // format seconds -> "HH:MM:SS" (nếu >24h vẫn làm việc)
  const formatDuration = (totalSeconds) => {
    const s = Math.max(0, totalSeconds);
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  // start interval that updates remaining every second based on expiresAt timestamp
  const startLocalTimer = (id, expiresAtMs) => {
    // clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const tick = () => {
      const remaining = Math.max(
        Math.floor((expiresAtMs - Date.now()) / 1000),
        0
      );
      setCurrentParking((prev) => ({
        id,
        expiresAt: expiresAtMs,
        remaining,
      }));

      if (remaining <= 0) {
        // expired: emit check to server and clear interval
        socket.emit("check-expired", { id, expiresAt: expiresAtMs });
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // run immediately then every second
    tick();
    intervalRef.current = setInterval(tick, 1000);
  };

  // handle confirm / create parking
  const handler_click_socket = async () => {
    if (!selectTime || selectTime <= 0) {
      alert("Chưa chọn số giờ hợp lệ");
      return;
    }
    if (!selectedSlot) {
      alert("Chưa chọn số ghế");
      return;
    }

    // tạo id duy nhất cho parking (bạn có thể tuỳ chỉnh)
    const id = `parking_${selectedSlot}_${Date.now()}`;
    const expiresAtMs = Date.now() + selectTime * 60 * 60 * 1000; // giờ -> ms

    const data = {
      id,
      seat: selectedSlot,
      status: true,
      expiresAt: expiresAtMs,
    };

    setLoading(true);
    setMessageDate(null);

    // emit tới server (server sẽ lưu DB và broadcast về mọi client)
    socket.emit("send-parking", data);
    // start local timer ngay lập tức để UX mượt
    startLocalTimer(id, expiresAtMs);
  };

  // initial load: lấy parking hiện có (nếu có)
  useEffect(() => {
    let mounted = true;
    const fetchInitial = async () => {
      try {
        const response = await getTimeParking();
        // dựa trên cấu trúc API cũ: response.data là mảng parking hiện tại
        const arr = response?.data;
        if (mounted && Array.isArray(arr) && arr.length > 0) {
          // chọn phần tử đầu (tuỳ app)
          const p = arr[0];
          // ensure expiresAt is ms timestamp; nếu backend trả giờ dạng int hours cần chuyển
          const expiresAtMs = Number(p.expiresAt) > 1e12 ? Number(p.expiresAt) : Date.now() + Number(p.expiresAt) * 60 * 60 * 1000;
          startLocalTimer(p.id || `parking_${p.seat}`, expiresAtMs);
          setSelectedSlot(p.seat || null);
        }
      } catch (err) {
        console.error("getTimeParking error", err);
      }
    };
    fetchInitial();
    return () => {
      mounted = false;
    };
  }, []);

  // socket listeners
  useEffect(() => {
    const onParkingTimer = ({ id, expiresAt }) => {
      // server gửi expiresAt có thể là timestamp ms; nếu là số giờ, chuyển
      const expiresAtMs =
        typeof expiresAt === "number" && expiresAt > 1e12
          ? expiresAt
          : Date.now() + Number(expiresAt) * 60 * 60 * 1000;

      startLocalTimer(id, expiresAtMs);
      setLoading(false);
    };

    const onParkingExpired = (data) => {
      // server broadcast expired
      const { id, message } = data || {};
      // nếu matching current id thì clear UI
      setCurrentParking((prev) => (prev && prev.id === id ? null : prev));
      setSelectedSlot((prev) => (prev && `parking_${prev}` === id ? null : prev));
      setMessageDate(message || "Thời gian đã hết hạn");
      setLoading(false);
      // clear interval if matches
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    socket.on("parking-timer", onParkingTimer);
    socket.on("parking-expired", onParkingExpired);

    return () => {
      socket.off("parking-timer", onParkingTimer);
      socket.off("parking-expired", onParkingExpired);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render remaining display
  const remainingText = currentParking
    ? `${formatDuration(currentParking.remaining)} (sec: ${currentParking.remaining})`
    : null;

  return (
    <div>
      <h1>ParkingDashboard</h1>

      {messageDate ? (
        <span>{messageDate}</span>
      ) : currentParking ? (
        <p>
          Hết hạn sau: <strong>{remainingText}</strong>
          <br />
          (Ghế: {selectedSlot || "-"})
        </p>
      ) : (
        <p>Chưa có parking đang giữ</p>
      )}

      <form>
        <p>Nhập số giờ (ví dụ: 8)</p>
        <input
          type="number"
          value={selectTime}
          onChange={(e) => setSelectTime(Number(e.target.value))}
        />
        <button type="button" onClick={handler_click_socket}>
          Xác nhận
        </button>

        <div className="choice_recomend" style={{ marginTop: 8 }}>
          <span
            className="choice_recomend_button"
            onClick={() => setSelectTime(12)}
            role="button"
          >
            12 h
          </span>
          <span
            className="choice_recomend_button"
            onClick={() => setSelectTime(8)}
            role="button"
          >
            8 h
          </span>
          <span
            className="choice_recomend_button"
            onClick={() => setSelectTime(4)}
            role="button"
          >
            4 h
          </span>
        </div>
      </form>

      <br />

      <div className="grid">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((slot) => {
              const occupied =
                currentParking && currentParking.id?.includes(String(slot.id));
              return (
                <button
                  key={slot.id}
                  className={`slot ${selectedSlot === slot.id ? "occupied" : ""} ${
                    occupied ? "occupied-by-server" : ""
                  }`}
                  onClick={() => toggleSlot(slot.id)}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        Trạng thái:{" "}
        {loading && currentParking ? (
          <span style={{ color: "green", fontFamily: "monospace" }}>
            active (expiresAt: {currentParking.expiresAt})
          </span>
        ) : (
          <span style={{ color: "red", fontFamily: "monospace" }}>false</span>
        )}
      </div>
    </div>
  );
};

export default ParkingDashboard;
