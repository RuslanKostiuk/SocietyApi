import * as mongoose from "mongoose";
import {IENV} from "../environment/ienv";
const q = require("q");

const env: IENV = require("../environment/dev.json");
const MONGODB_CONNECTION: string = env.connection;
try {
    mongoose.connect(MONGODB_CONNECTION);
    console.log("Mongoose connected");
} catch (e) {
    console.log(e.message);
}

module.exports = mongoose;