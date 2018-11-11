import {IPhoto} from "./IPhoto";
import { Document, Schema, Model, model} from "mongoose";
const db = require("../../shared/dbConnection");

export interface IPhotoModel extends IPhoto, Document {}

export let PhotoSchema: Schema = db.Schema({
    path: String,
    creationDate: Date,
    comments: [{
        idUser: String,
        text: String
    }],
    likes: [String],
    isCurrent: Boolean
});

export const Photo: Model<IPhotoModel> = model<IPhotoModel>("Photo", PhotoSchema);