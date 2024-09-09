const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");

const { dbConnection } = require("./db/config");
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// PUBLIC DIRECTORY
app.use(express.static("public"));

app.use(express.json());

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);

app.listen(process.env.PORT, () => {
    console.log(`SERVER LISTENING ON PORT: ${process.env.PORT}`);
});
