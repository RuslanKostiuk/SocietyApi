import {IUserModel, User} from "../models/userModel/UserSchema";
import {decryptPassword} from "../shared/utils";
import DbController from "./DbController";
import IController from "../shared/IController";

export class UserController implements IController {
    private dbController: DbController<IUserModel> = new DbController<IUserModel>(User);

    public async get(userId: string): Promise<IUserModel> {
        return this.dbController.getById(userId);
    }

    public async save(user: IUserModel): Promise<IUserModel> {
        let conditions: any = {email: user.email, verified: false};
        user.password = await decryptPassword(user.password);
        return this.dbController.saveOrUpdate(conditions, user);
    }

    public async update(user: any, id: string): Promise<IUserModel> {
        return this.dbController.update(id, user);
    }


    public async getMany(data: string[]): Promise<IUserModel[]> {
        return this.dbController.getMany({_id: data});
    }
}