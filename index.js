const express = require("express");
require("dotenv").config();
const customerRoutes = require("./src/routes/customer.routes");
const modelRoutes = require("./src/routes/model.routes");
const reservationRoutes = require("./src/routes/reservation.routes");
const vehicleRoutes = require("./src/routes/vehicle.routes");
const loadModels = require("./src/models/index")
const morgan = require("morgan");
const chalk = require("chalk");

const app = express();
app.use(express.json());

(async () => await loadModels())();

// Apply color to the status code
// morgan.token("status", (req, res) => {
//     const status = res.statusCode;
//     const color =
//         status >= 500
//             ? chalk.red
//             : status >= 400
//             ? chalk.yellow
//             : status >= 300
//             ? chalk.cyan
//             : status >= 200
//             ? chalk.green
//             : chalk.white
//     ;
//     return color(status);
// });
//
// // Apply color to the method
// morgan.token("method", (req, res) => {
//     const method = req.method;
//     const color =
//         method === "GET"
//             ? chalk.green
//             : method === "POST"
//             ? chalk.yellow
//             : method === "PUT"
//             ? chalk.cyan
//             : method === "DELETE"
//             ? chalk.red
//             : chalk.white
//     ;
//     console.log(chalk.red("totottttttttttttottttttttot"))
//     return color(method.toString());
// });
//
// app.use(morgan(":method :url - :status"));
app.use(express.json());
app.use("/customers", customerRoutes);
app.use("/models", modelRoutes);
app.use("/reservations", reservationRoutes);
app.use("/vehicles", vehicleRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}/`)
});
