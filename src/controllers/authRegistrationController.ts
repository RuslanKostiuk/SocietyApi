import {IUser} from "../models/userModel/IUser";
import User = require ("../models/userModel/User");
import {compareDecriptedPassword, decryptPassword} from "../utils/utils";
import {ResponseBuider, Response} from "../shared/response";
import {ErrorBuilder, SocietyError} from "../shared/errorBuilder";
import {ErrorStatuses} from "../shared/enums";

export class AuthRegistrationController {
    private static dbUser: any;

    public static async saveUser(user: IUser): Promise<Response> {
        try {
            const decryptedPassword: string = await decryptPassword(user.password);
            user.password = decryptedPassword;
            this.dbUser = new User(user);
            let savedUser: any = await this.dbUser.save();
            return ResponseBuider.BuildResponse(savedUser);
        } catch (e) {
            throw ErrorBuilder.BuildError(ErrorStatuses.saveError, e.message);
        }
    }

    public static async authenticateUser(email, password): Promise<IUser> {
        try {
            const foundUser: IUser = await User.findOne({email: email});
            if (!foundUser) {
                throw ErrorBuilder.BuildError(ErrorStatuses.userNotFound);
            }

            const isCorrectPassword: boolean = await compareDecriptedPassword(foundUser.password, password);

            if (!isCorrectPassword) {
                throw ErrorBuilder.BuildError(ErrorStatuses.passwordNotCorrect);
            }

            return foundUser;

        } catch (e) {
            let error: SocietyError;
            if (e.status !== ErrorStatuses.passwordNotCorrect || e.status !== ErrorStatuses.userNotFound) {
                error = ErrorBuilder.BuildError(ErrorStatuses.unknown, e.message);
            } else {
                error = e;
            }

            throw error;
        }

    }
}