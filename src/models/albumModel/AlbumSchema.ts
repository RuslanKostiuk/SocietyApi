import { Document, Schema, Model, model} from "mongoose";
import {Photo} from "../photoModel/PhotoSchema";
import {IAlbum} from "./IAlbum";
const db = require("../../shared/dbConnection");

export interface IAlbumModel extends IAlbum, Document {}

export let AlbomSchema: Schema = db.Schema({
    name: String,
    photos: [Photo],
    createdAt: Date,
    updatedAt: Date
});

export const Album: Model<IAlbumModel> = model<IAlbumModel>("Album", AlbomSchema);