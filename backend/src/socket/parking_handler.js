import { createParking } from "../controllers/bookingController.js";
import { clearDataParking } from "../services/parkinglotServices.js";

const parkingHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("send-parking", async (data) => {
            const { id } = data;
            let { expiresAt } = data;
            if (expiresAt < 1e12) {
                expiresAt = Date.now() + expiresAt * 60 * 60 * 1000;
            }
            data.expiresAt = expiresAt;
            // lưu DB
            await createParking(data);

            // gửi expiresAt cho FE
            io.emit("parking-timer", {
                id,
                expiresAt,
            });
        });
        socket.on("check-expired", async ({ id, expiresAt }) => {
            if (Date.now() >= expiresAt) {
                await clearDataParking();
                io.emit("parking-expired", {
                    id,
                    message: "Thời gian hết hạn, vui lòng chọn ghế mới",
                });
            }
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    })
}
export default parkingHandler