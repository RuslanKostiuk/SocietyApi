import {IUserModel, User} from "../models/userModel/UserSchema";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";
import {decryptPassword} from "../shared/utils";
import DbController from "./DbController";

export class UserController {
    private dbController: DbController<IUserModel> = new DbController<IUserModel>(User);

    public async get(userId): Promise<IUserModel> {
        return this.dbController.getById(userId);
    }

    public async save(user: IUserModel): Promise<IUserModel> {
        let conditions: any = {email: user.email, verified: false};
        user.password = await decryptPassword(user.password);
        return this.dbController.saveOrUpdate(conditions, user);
    }

    public async update(user: any, userId: string): Promise<IUserModel> {
        return this.dbController.update(userId, user);
    }

}