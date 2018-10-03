import {IUserModel, User} from "../models/userModel/UserSchema";
import {compareDecriptedPassword, decryptPassword} from "../utils/utils";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";

export class AuthRegistrationController {
    private dbUser: IUserModel;

    public async saveUser(user: IUserModel): Promise<IUserModel> {
        try {
            user.password = await decryptPassword(user.password);
            this.dbUser = new User(user);
            return await this.dbUser.save();
        } catch (e) {
            throw e;
        }
    }

    public async authenticateUser(email, password): Promise<IUserModel> {
        let error: Error;
        let foundUser: IUserModel = await User.findOne({email});
        if (!foundUser) {
            error = ErrorHandler.BuildError(ErrorStatuses.userNotFound);
        }

        let isCorrectPassword: boolean = await compareDecriptedPassword(foundUser.password, password);

        if (!isCorrectPassword) {
            error = ErrorHandler.BuildError(ErrorStatuses.passwordNotCorrect);
        }

        if (!error) {
            return foundUser;
        } else {
            throw error;
        }
    }
}