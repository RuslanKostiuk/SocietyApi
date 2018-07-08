import { Document, Schema, Model, model} from "mongoose";
import {IConversation} from "./IConversation";
const db = require("../../shared/dbConnection");

export interface IConversationModel extends IConversation, Document {}

export let ConversationSchema: Schema = db.Schema({
    name: {type: String},
    messages: [{
        id_sender: {type: String},
        ids_listeners: [{type: String}],
        text: {type: String},
        createdAt: Date,
    }],
    createdAt: Date,
    updatedAt: Date
});

export const Conversation: Model<IConversationModel> = model<IConversationModel>("Conversation", ConversationSchema);

