import {IUserModel, User} from "../models/userModel/UserSchema";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";

export class UserController {
    public async getUserInfo(userId): Promise<IUserModel> {
        try {
            let user: IUserModel = await User.findById(userId);
            return user;
        } catch (e) {
            throw e;
        }
    }
}