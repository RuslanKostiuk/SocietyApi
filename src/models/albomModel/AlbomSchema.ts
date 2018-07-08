import {IAlbom} from "./IAlbom";
import { Document, Schema, Model, model} from "mongoose";
const db = require("../../shared/dbConnection");

export interface IAlbomModel extends IAlbom, Document {}

export let AlbomSchema: Schema = db.Schema({
    name: String,
    createdAt: Date,
    updatedAt: Date,
    isUser: String
});

export const Albom: Model<IAlbomModel> = model<IAlbomModel>("Albom", AlbomSchema);