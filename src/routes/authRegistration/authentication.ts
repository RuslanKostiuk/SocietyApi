import {IENV} from "../../environment/ienv";
import {GET, Path, POST} from "typescript-rest";
import {AuthRegistrationController} from "../../controllers/authRegistrationController";
import {IUser} from "../../models/userModel/IUser";
import {ResponseBuider, Response} from "../../shared/response";
import {generateToken} from "../../utils/utils";
import {IUserModel} from "../../models/userModel/UserSchema";
import {ErrorHandler} from "../../shared/errorHandler";
import {ErrorStatuses} from "../../shared/enums";

const env: IENV = require("../../environment/dev.json");

@Path("/user")
export class Authentication {
    authRegCtrl: AuthRegistrationController;

    constructor() {
        this.authRegCtrl = new AuthRegistrationController();
    }

    @Path("/signIn")
    @POST
    public async authenticate(authData: {email: string, password: string}) {
        try {
            let responce: Response;
            const user: IUserModel = await this.authRegCtrl.authenticateUser(authData.email, authData.password);
            responce = ResponseBuider.BuildResponse({
                token: generateToken(user._id)
            });

            return responce;
        } catch (e) {
            throw e;
        }
    }

    @Path("/logout")
    @GET
    public logout() {

    }
}