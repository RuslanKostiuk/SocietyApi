import {Model} from "mongoose";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";
import {User} from "../models/userModel/UserSchema";

export default class DbController<T> {
    private model: Model<any>;

    constructor(model: Model<any>) {
        this.model = model;
    }

    public async getById(id: string): Promise<T> {
        try {
            return this.model.findById(id);
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }

    public async saveOrUpdate(conditions: any, data: T): Promise<T> {
        try {
            return await this.model.findOneAndUpdate(conditions, data, {
                upsert: true,
                new: true
            });
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }

    public async update(id: string, data: T): Promise<T> {
        try {
            return this.model.findByIdAndUpdate(id, data);
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }
}