import {GET, Path, POST, QueryParam} from 'typescript-rest';
import {IUserModel, User} from "../../models/userModel/UserSchema";
import {AuthRegistrationController} from "../../controllers/authRegistrationController";
import {ErrorStatuses, RegistrationTypes} from "../../shared/enums";
import {ErrorHandler} from "../../shared/errorHandler";
import {ResponseBuider, Response} from "../../shared/response";
import {generateToken, SandEmailMessage} from "../../utils/utils";
import {IENV} from "../../environment/ienv";
import S3Handler from "../../utils/s3Handler";

const env: IENV = require("../../environment/dev.json");

@Path("/user")
export class Registration {
    private authRegCtrl: AuthRegistrationController;

    @POST
    @Path("/registration")
    public async registration(user: IUserModel): Promise<Response> {
        let response: Response;
        try {
            this.authRegCtrl = new AuthRegistrationController();
            let savedUser: IUserModel = await this.authRegCtrl.saveUser(user);
            let mailMessage: string = "Дякуємо, що зареєструвалися в Львівській соціальній мережі \"Lviv Society\"." +
                "Ми завжди раді новим людям. Щоб підтвердити реєстрацію будь ласка перейдіть по посиланню " +
                env.host + env.port + env.mail.verification_link + savedUser._id;

            await SandEmailMessage(user.email, mailMessage, "Society email verification");
            let message: string = `Дякуємо за реєстацію. На ваш email ${user.email} відправлено повідомлення. Перейдіть по посиланню щоб підтвердити ваш email`;
            response = ResponseBuider.BuildResponse({message: message});
            return response;
        } catch (e) {
            let error: Error;
            if (e.errorStatus === ErrorStatuses.saveError || e.errorStatus === ErrorStatuses.emailError) {
                error = ErrorHandler.BuildError(ErrorStatuses.registrationError, e.message);
            } else {
                error = ErrorHandler.BuildError(ErrorStatuses.unknown, e.message);
            }
            throw error;
        }
    }

    @GET
    @Path("/verify")
    public async verify(@QueryParam("token") token: string): Promise<Response> {
        let response: Response;
        let s3: S3Handler = new S3Handler();
        try {
            let user: IUserModel = await  User.findByIdAndUpdate(token, { verified: true });
            if (user) {
                response = ResponseBuider.BuildResponse();
                await s3.createBucket(user._id);
                user.password = "";
                response = ResponseBuider.BuildResponse("<h1>Registration complete<h1>");
                return response;
            }
        } catch (e) {
            let error: Error = ErrorHandler.BuildError(ErrorStatuses.unknown, e.message);
            throw error;
        }
    }
}