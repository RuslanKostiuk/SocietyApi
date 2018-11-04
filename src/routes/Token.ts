import { Path, POST} from "typescript-rest";
import TokenController from "../controllers/TokenController";
import {ResponseBuider, Response} from "../shared/response";

@Path("/token")
export default class Token {

    @POST
    @Path("/refresh")
    public async refresh(token: any): Promise<Response> {
        try {
            let tokens: any = await TokenController.renewToken(token.token);
            return ResponseBuider.BuildResponse(tokens);
        } catch (e) {
            throw e;
        }
    }
}