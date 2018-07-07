import { Document, Schema, Model, model} from "mongoose";
import {IUser} from "./IUser";
const db = require("../../shared/dbConnection");

export interface IUserModel extends IUser, Document {}

export let UserSchema: Schema = db.Schema({
    email: {
        type: String,
        required: [true, "loginRequired"],
        unique: true,
        maxlength: [32, "login must have max 32 symbols"],
    },
    password: {
        type: String
    },
    firstName: {
        type: String,
        required: [true, "user name required"]
    },
    lastName: {
        type: String,
        required: [true, "user surnamename required"]
    },
    birthday: { type: Date },
    relationship: {
        idParthner: String,
        relationshipStatus: String
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    isFirstTime: {
        type: Boolean,
        default: true
    },
    address: {
        city: {type: String},
        street: { type: String },
        houseNumber: { type: String }
    },
    friends: [{
        id_friend: { type: String },
        friendInviteStatus: { type: Number }
    }],
    conversations: [{
        name: { type: String },
        messages: [{
            id_sender: { type: String },
            ids_listeners: [{ type: String }],
            text: { type: String }
        }]
    }],
    albums: [{
        name: String,
        creationDate: Date,
        lastUpdateDate: Date,
        photos: [{
            path: String,
            creationDate: Date,
            idAlbum: String,
            idsComments: [String],
            likes: [String],
            isCurrent: Boolean
        }]
    }],
    videos: [{ type: String }],
    gender: { type: String },
    wall: [{ type: Object }],
    verified: { type: Boolean, default: false },
    createdAt: Date,
    updatedAt: Date
});

// UserSchema.pre("save", function(next) {
//     let now = new Date();
//     if (!this.createdAt) {
//         this.createdAt = now;
//     }
//     next();
// });

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

