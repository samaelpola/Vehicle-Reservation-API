const express = require("express");
require("dotenv").config();
const customerRoutes = require("./src/routes/customer.routes");
const modelRoutes = require("./src/routes/model.routes");
const reservationRoutes = require("./src/routes/reservation.routes");
const vehicleRoutes = require("./src/routes/vehicle.routes");
const loadModels = require("./src/models/index")

const app = express();
app.use(express.json());

(async () => await loadModels())();

app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/models", modelRoutes);
app.use("/reservations", reservationRoutes);
app.use("/vehicles", vehicleRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`)
});
