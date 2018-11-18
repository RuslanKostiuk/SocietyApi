import {Context, GET, Path, POST, ServiceContext} from "typescript-rest";
import {Response, ResponseBuider} from "../shared/response";
import {IUserModel} from "../models/userModel/UserSchema";
import {UserController} from "../controllers/UserController";

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
            let user: IUserModel = await this.userCtrl.get(userId);
            user.password = "";
            return ResponseBuider.BuildResponse({
                user: user
            })
        } catch (e) {
            throw e;
        }
    }

    @POST
    @Path("/update")
    public async updateUser(data: any): Promise<any> {
        try {
            let userId: string = this.context.request.user.id;
            let user: IUserModel = await this.userCtrl.update(data, userId);
            return ResponseBuider.BuildResponse(user);
        } catch (e) {
          throw e;
        }
    }
};