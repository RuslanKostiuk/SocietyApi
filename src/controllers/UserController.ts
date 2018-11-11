import {IUserModel, User} from "../models/userModel/UserSchema";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";
import {decryptPassword} from "../shared/utils";

export class UserController {
    public async get(userId): Promise<IUserModel> {
        try {
            let user: IUserModel = await User.findById(userId);
            return user;
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }

    public async save(user: IUserModel): Promise<IUserModel> {
        try {
            user.password = await decryptPassword(user.password);
            return User.findOneAndUpdate({email: user.email, verified: false}, user, {
                upsert: true,
                new: true
            });
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }

    public async update(user: any, userId: string): Promise<IUserModel> {
        try {
            return User.findByIdAndUpdate(userId, user);
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }
}