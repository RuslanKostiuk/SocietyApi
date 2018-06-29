import {GET, Path, POST, QueryParam} from 'typescript-rest';
import {IUser} from "../../models/userModel/IUser";
import {AuthRegistrationController} from "../../controllers/authRegistrationController";
import {ErrorStatuses, RegistrationTypes} from "../../shared/enums";
import {ErrorBuilder, SocietyError} from "../../shared/errorBuilder";
import {ResponseBuider, Response} from "../../shared/response";
import {SandEmailMessage} from "../../utils/utils";
import {IENV} from "../../environment/ienv";
import {truncateSync} from "fs";

const env: IENV = require("../../environment/dev.json");

@Path("/user")
export class Registration {

    @POST
    @Path("/registration")
    public async registration(params: {user: IUser, authType: RegistrationTypes}): Promise<Response> {
        const user = params.user;
        const authType: RegistrationTypes = params.authType;
        let response: Response;

        console.log(params);

        try {
            let response: Response = await AuthRegistrationController.saveUser(user);
            let savedUser: any = response.body;
            let mailMessage: string = "Дякуємо, що зареєструвалися в Львівській соціальній мережі \"Lviv Society\"." +
                "Ми завжди раді новим людям. Щоб підтвердити реєстрацію будь ласка перейдіть по посиланню " +
                env.host + env.port + env.mail.verification_link + savedUser._id;

            await SandEmailMessage(user.email, mailMessage, "Society email verification");
            let message: string = `Дякуємо за реєстацію. На ваш email ${user.email} відправлено повідомлення. Перейдіть по посиланню щоб підтвердити ваш email`;
            response = ResponseBuider.BuildResponse({message: message});
        } catch(e) {
            let error: SocietyError;
            if (e.errorStatus === ErrorStatuses.saveError || e.errorStatus === ErrorStatuses.emailError) {
                error = ErrorBuilder.BuildError(ErrorStatuses.registrationError, e.message);
                response = ResponseBuider.BuildResponse(error, 403);
            } else {
                response = ResponseBuider.BuildResponse(e, 500);
            }
        } finally {
            return response;
        }
    }

}