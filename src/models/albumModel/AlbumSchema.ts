import {Document, Schema, Model, model} from "mongoose";
import {PhotoSchema} from "../photoModel/PhotoSchema";
import {IAlbum} from "./IAlbum";
const db = require("../../shared/dbConnection");

export interface IAlbumModel extends IAlbum, Document {}

export let AlbumSchema: Schema = db.Schema({
    name: String,
    photos: [PhotoSchema],
    createdAt: Date,
    updatedAt: Date
});

export const Album: Model<IAlbumModel> = model<IAlbumModel>("Album", AlbumSchema);