import * as mongoose from "mongoose";
import {IENV} from "../environment/ienv";

const env: IENV = require("../environment/dev.json");
const MONGODB_CONNECTION: string = env.connection;
mongoose.createConnection(MONGODB_CONNECTION);
console.log("Mongoose connected");

module.exports = mongoose;