import {IUserModel, User} from "../models/userModel/UserSchema";
import {compareDecriptedPassword, decryptPassword} from "../shared/utils";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";
import {IENV} from "../environment/ienv";
const env: IENV = require("../environment/dev.json");

export class AuthRegistrationController {
    public async saveUser(user: IUserModel): Promise<IUserModel> {
        try {
            user.password = await decryptPassword(user.password);
            return User.findOneAndUpdate({email: user.email, verified: false}, user, {
                    upsert: true,
                    new: true
                });
        } catch (e) {
            throw e;
        }
    }

    public async authenticateUser(email, password): Promise<IUserModel> {
        let foundUser: IUserModel = await User.findOne({email});
        if (!foundUser) {
             throw ErrorHandler.BuildError(ErrorStatuses.userNotFound);
        }

        let isCorrectPassword: boolean = await compareDecriptedPassword(foundUser.password, password);

        if (!isCorrectPassword) {
            throw ErrorHandler.BuildError(ErrorStatuses.passwordNotCorrect);
        }

        if (!foundUser.verified) {
            throw ErrorHandler.BuildError(ErrorStatuses.notVerified);
        }

        return foundUser;
    }
}