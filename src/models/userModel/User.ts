import * as mongoose from "mongoose";
import {UserSchema} from "./UserSchema";
import {IUserModel} from "./IUserModel";

export = mongoose.model<IUserModel>("User", UserSchema);