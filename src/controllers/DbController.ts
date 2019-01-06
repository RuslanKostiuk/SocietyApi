import {Model} from "mongoose";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";
import {User} from "../models/userModel/UserSchema";
import {IEventModel} from "../models/eventModel/EventSchema";

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
            data["updatedAt"] = data["createdAt"] = new Date().getTime();
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
            if (!data["refreshToken"]) {
                data["updatedAt"] = new Date().getTime();
            }

            return this.model.findByIdAndUpdate(id, data);
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }

    public async save(entity: T): Promise<T> {
        try {
            entity["updatedAt"] = entity["createdAt"] = new Date().getTime();
            return this.model.create(entity);
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }

    public async getMany(conditions: any, limit?: number, offset?: number): Promise<T[]> {
        try {
            return this.model
                .find(conditions)
                .sort({
                    updatedAt: -1
                })
                .limit(limit)
                .skip(offset)
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }
}