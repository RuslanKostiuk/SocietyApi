import {IUserModel, User} from "../models/userModel/UserSchema";
import {compareDecriptedPassword, decryptPassword} from "../utils/utils";
import {ResponseBuider, Response} from "../shared/response";
import {ErrorHandler, SocietyError} from "../shared/errorHandler";
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
        try {
            const foundUser: IUserModel = await User.findOne({email: email});
            if (!foundUser) {
                throw ErrorHandler.BuildError(ErrorStatuses.userNotFound);
            }

            const isCorrectPassword: boolean = await compareDecriptedPassword(foundUser.password, password);

            if (!isCorrectPassword) {
                throw ErrorHandler.BuildError(ErrorStatuses.passwordNotCorrect);
            }

            return foundUser;

        } catch (e) {
            let error: SocietyError;
            if (e.status !== ErrorStatuses.passwordNotCorrect || e.status !== ErrorStatuses.userNotFound) {
                error = ErrorHandler.BuildError(ErrorStatuses.unknown, e.message);
            } else {
                error = e;
            }

            throw error;
        }

    }
}