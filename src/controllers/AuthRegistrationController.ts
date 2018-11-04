import {IUserModel, User} from "../models/userModel/UserSchema";
import {compareDecriptedPassword, decryptPassword} from "../shared/utils";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";

export class AuthRegistrationController {
    public async saveUser(user: IUserModel): Promise<IUserModel> {
        try {
            user.password = await decryptPassword(user.password);
            return User.findOneAndUpdate({email: user.email, verified: false}, user, {
                    upsert: true,
                    new: true
                });
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.authError, e);
        }
    }

    public async authenticateUser(email, password): Promise<IUserModel> {
        let foundUser: IUserModel = await User.findOne({email});
        if (!foundUser) {
             throw ErrorHandler.BuildError(ErrorStatuses.authError, new Error("Email does not exist"));
        }

        let isCorrectPassword: boolean = await compareDecriptedPassword(foundUser.password, password);

        if (!isCorrectPassword) {
            throw ErrorHandler.BuildError(ErrorStatuses.authError, new Error("Password not correct"));
        }

        if (!foundUser.verified) {
            throw ErrorHandler.BuildError(ErrorStatuses.notVerified, new Error("Email not confirmed"));
        }

        return foundUser;
    }
}