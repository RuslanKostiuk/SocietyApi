import {IUser} from "./IUser";
import * as mongoose from "mongoose";

export interface IUserModel extends IUser, mongoose.Document { }