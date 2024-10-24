const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log("DB connection established");
    } catch (error) {
        throw new Error("Couldn't connect to MongoDB: " + error.message);
    }
};

module.exports = {
    dbConnection,
};
