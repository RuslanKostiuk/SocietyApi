import {Context, GET, Path, PathParam, POST, QueryParam, ServiceContext} from "typescript-rest";
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
    public async getMyInfo(): Promise<Response> {
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

    @GET
    @Path("/:id")
    public async getUserInfo(@PathParam("id") id : string): Promise<Response> {
        try {
            let user: IUserModel = await this.userCtrl.get(id);
            user.password = "";
            return ResponseBuider.BuildResponse({
                user: user
            })
        } catch (e) {
            throw e;
        }
    }

    @POST
    @Path("/getMany")
    public async getMany(ids: string[]): Promise<Response> {
        try {
            let users: IUserModel[] = await this.userCtrl.getMany(ids);
            return ResponseBuider.BuildResponse(users);
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