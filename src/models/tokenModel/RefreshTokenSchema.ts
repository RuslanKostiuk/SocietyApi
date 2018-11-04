import IRefreshToken from "./IRefreshToken";
import { Document, Schema, Model, model} from "mongoose";
const db = require("../../shared/dbConnection");

export interface IRefreshTokenModel extends IRefreshToken, Document {}

export let RefreshTokenSchema: Schema = db.Schema({
    idUser: String,
    refreshToken: String,
    createdDate: Date
});

export const RefreshToken: Model<IRefreshTokenModel> = model<IRefreshTokenModel>("RefreshToken", RefreshTokenSchema);