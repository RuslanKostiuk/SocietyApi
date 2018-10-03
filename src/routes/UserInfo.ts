import {Context, GET, Path, ServiceContext} from "typescript-rest";
import {Response, ResponseBuider} from "../shared/response";
import {IUserModel} from "../models/userModel/UserSchema";
import {UserController} from "../controllers/UserController";
import {ErrorHandler} from "../shared/errorHandler";

@Path("/user")
export default class UserInfo {
    @Context
    private context: ServiceContext;
    private userCtrl: UserController = new UserController();

    @GET
    @Path("/info")
    public async getUserInfo(): Promise<Response> {
        try {
            let userId: string = this.context.request.user.id;
            let user: IUserModel = await this.userCtrl.getUserInfo(userId);
            user.password = "";
            return ResponseBuider.BuildResponse({
                user: user
            })
        } catch (e) {
            throw ErrorHandler.BuildError(e.statusCode || 500, e.message || e);
        }
    }
}