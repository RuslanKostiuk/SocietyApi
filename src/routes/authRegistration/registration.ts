import {Path, POST} from 'typescript-rest';
import {IUserModel} from "../../models/userModel/UserSchema";
import {AuthRegistrationController} from "../../controllers/authRegistrationController";
import {ErrorStatuses, RegistrationTypes} from "../../shared/enums";
import {ErrorHandler, SocietyError} from "../../shared/errorHandler";
import {ResponseBuider, Response} from "../../shared/response";
import {SandEmailMessage} from "../../utils/utils";
import {IENV} from "../../environment/ienv";

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
        } catch(e) {
            let error: SocietyError;
            if (e.errorStatus === ErrorStatuses.saveError || e.errorStatus === ErrorStatuses.emailError) {
                error = ErrorHandler.BuildError(ErrorStatuses.registrationError, e.message);
                response = ResponseBuider.BuildResponse(error, 403);
            } else {
                response = ResponseBuider.BuildResponse(e, 500);
            }
        } finally {
            return response;
        }
    }

}