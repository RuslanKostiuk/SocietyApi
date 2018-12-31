import { Document, Schema, Model, model} from "mongoose";
import {IConversation} from "./IConversation";
const db = require("../../shared/dbConnection");

export interface IConversationModel extends IConversation, Document {}

export let ConversationSchema: Schema = db.Schema({

});

export const Conversation: Model<IConversationModel> = model<IConversationModel>("Conversation", ConversationSchema);

