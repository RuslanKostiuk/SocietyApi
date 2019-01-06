import {IEvent} from "./IEvent";
import { Document, Schema, Model, model} from "mongoose";
import {IPhoto} from "../photoModel/IPhoto";
import {PhotoSchema} from "../photoModel/PhotoSchema";
const db = require("../../shared/dbConnection");

export interface IEventModel extends IEvent, Document {}

export let EventSchema: Schema = db.Schema({
    title: String,
    description: String,
    photos: [PhotoSchema],
    theme: String,
    likes: [String],
    holdingDate: String,
    comments: [{
        idUser: String,
        text: String
    }],
    location: String,
    createdAt: Date,
    updatedAt: Date,
    userId: String,
    creatorAvatar: String,
    creatorName: String
});

export const Event: Model<IEventModel> = model<IEventModel>("Event", EventSchema);