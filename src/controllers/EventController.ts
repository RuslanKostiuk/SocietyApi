import DbController from "./DbController";
import {IEventModel, Event} from "../models/eventModel/EventSchema";
import {IUserModel} from "../models/userModel/UserSchema";
import IController from "../shared/IController";

export default class EventController implements IController{
    private db: DbController<IEventModel> = new DbController<IEventModel>(Event);

    public save(event: IEventModel): Promise<IEventModel> {
        return this.db.save(event);
    }

    public get(id: string): Promise<IEventModel> {
        return this.db.getById(id);
    }

    public update(event: IEventModel, id: string): Promise<IEventModel> {
        return this.db.update(id, event);
    }

    public getMany(data: any): Promise<IEventModel[]> {
        let offset: number = parseInt(data.offset);
        let limit: number = parseInt(data.limit);
        let conditions: any = data.coditions || {};

        return this.db.getMany(conditions, limit, offset);
    }

    public getManyById(data: any): Promise<IEventModel[]> {
        let offset: number = data.offset;
        let limit: number = data.limit;
        let userId: string = data.userId;

        return this.db.getMany({userId: userId}, limit, offset);
    }
}
