const mongoose = require("mongoose");
const User = require('../models/User'); //imports user model
require("dotenv").config({ path: "./config/.env" });
 // This line loads your .env variables

const dbUrl = process.env.ATLAS_DB;

const connectDB = async () => {
    try {
        console.log("DB URL: >>>", dbUrl);

        await mongoose.connect(dbUrl, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
            //The options useNewUrlParser and useUnifiedTopology are there to avoid deprecation warnings and use the latest MongoDB drivers.
        });

        console.log("MongoDB connected successfully!");
    }catch(err){
        console.error("Connection failed :",err.message);
    }
};
connectDB(); //function call

module.exports = connectDB;


