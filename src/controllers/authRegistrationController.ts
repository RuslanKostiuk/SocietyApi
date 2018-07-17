import {IUserModel, User} from "../models/userModel/UserSchema";
import {compareDecriptedPassword, decryptPassword} from "../utils/utils";
import {ResponseBuider, Response} from "../shared/response";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";

export class AuthRegistrationController {
    private dbUser: IUserModel;

    public async saveUser(user: IUserModel): Promise<IUserModel> {
        try {
            const decryptedPassword: string = await decryptPassword(user.password);
            user.password = decryptedPassword;
            this.dbUser = new User(user);
            let savedUser: IUserModel = await this.dbUser.save();
            return savedUser;
        } catch (e) {
            console.log(e.message);
            throw ErrorHandler.BuildError(ErrorStatuses.saveError, e.message);
        }
    }

    public async authenticateUser(email, password): Promise<IUserModel> {
        let error: Error;
        const foundUser: IUserModel = await User.findOne({email});
        if (!foundUser) {
            error = ErrorHandler.BuildError(ErrorStatuses.userNotFound);
        }

        const isCorrectPassword: boolean = await compareDecriptedPassword(foundUser.password, password);

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