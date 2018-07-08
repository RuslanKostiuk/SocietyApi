import {IENV} from "../../environment/ienv";
import {GET, Path, POST} from "typescript-rest";
import {AuthRegistrationController} from "../../controllers/authRegistrationController";
import {IUser} from "../../models/userModel/IUser";
import {ResponseBuider, Response} from "../../shared/response";
import {generateToken} from "../../utils/utils";
import {IUserModel} from "../../models/userModel/UserSchema";

const env: IENV = require("../../environment/dev.json");

@Path("/user")
export class Authentication {
    authRegCtrl: AuthRegistrationController;

    constructor() {
        this.authRegCtrl = new AuthRegistrationController();
    }

    @Path("/login")
    @POST
    public async authenticate(authData: {email: string, password: string}) {
        let responce: Response;
        try {
            const user: IUserModel = await this.authRegCtrl.authenticateUser(authData.email, authData.password);
            responce = ResponseBuider.BuildResponse({
                user: user,
                token: generateToken(user._id)
            });

        } catch (e) {
            responce = ResponseBuider.BuildResponse(e, 404);
        } finally {
            return responce;
        }
    }

    @Path("/logout")
    @GET
    public logout() {

    }
}