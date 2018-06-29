import {IENV} from "../../environment/ienv";
import {GET, Path, POST} from "typescript-rest";
import {AuthRegistrationController} from "../../controllers/authRegistrationController";
import {IUser} from "../../models/userModel/IUser";
import {ResponseBuider, Response} from "../../shared/response";

const env: IENV = require("../../environment/dev.json");

@Path("/user")
export class Authentication {

    @Path("/authenticate")
    @POST
    public async authenticate(authData: {email: string, password: string}) {
        let responce: Response;
        try {
            const user: IUser = await AuthRegistrationController.authenticateUser(authData.email, authData.password);
            responce = ResponseBuider.BuildResponse(user);

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