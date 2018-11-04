import {Path, POST} from 'typescript-rest';
import {IUserModel, User} from "../models/userModel/UserSchema";
import {AuthRegistrationController} from "../controllers/AuthRegistrationController";
import {ResponseBuider, Response} from "../shared/response";
import {SandEmailMessage} from "../shared/utils";
import {IENV} from "../environment/ienv";
import S3Handler from "../shared/s3Handler";
import {UnauthorizedError} from "typescript-rest/dist/server-errors";
import TokenController from "../controllers/TokenController";

const env: IENV = require("../environment/dev.json");

export default class AuthRegistration {
    private authRegCtrl: AuthRegistrationController = new AuthRegistrationController();

    @POST
    @Path("/signUp")
    public async registration(user: IUserModel): Promise<Response> {
        let response: Response;
        try {
            let verificationCode: number = Math.floor(Math.random() * 100000);
            user.verificationCode = verificationCode.toString();
            await this.authRegCtrl.saveUser(user);
            let mailMessage: string = "Thank you for registration in Society Social Network. Your verification code " + verificationCode;
            await SandEmailMessage(user.email, mailMessage, "Society email verification");
            response = ResponseBuider.BuildResponse("SENT");
            return response;
        } catch (e) {
            throw e;
        }
    }

    @POST
    @Path("/verify")
    public async verify({email, code}): Promise<Response> {
        let response: Response;
        let s3: S3Handler = new S3Handler();
        let user: IUserModel;
        try {
            user = await User.findOneAndUpdate(
                {
                    email: email,
                    verificationCode: code
                },
                {verified: true});
        } catch (e) {
            throw e;
        }

        if (!user) {
            throw new Error("Verification codes do not match");
        }

        try {
            await s3.createBucket(user._id);
        } catch (e) {
            throw e;
        }
        response = ResponseBuider.BuildResponse({
            token: TokenController.generateToken(user._id),
            refreshToken: await TokenController.generateRefreshToken(user._id)
        });

        return response;
    }

    @Path("/signIn")
    @POST
    public async authenticate(authData: { email: string, password: string }): Promise<Response> {
        let responce: Response;
        let user: IUserModel;

        try {
            user = await this.authRegCtrl.authenticateUser(authData.email, authData.password);
        } catch (e) {
            throw e;
        }

        if (!user.verified) {
            throw new UnauthorizedError();
        }
        responce = ResponseBuider.BuildResponse({
            token: TokenController.generateToken(user._id),
            refreshToken: await TokenController.generateRefreshToken(user._id)
        });

        return responce;
    }

    @Path("/signOut")
    @POST
    public async signOut(token: any): Promise<Response> {
        await TokenController.signOut(token.token);
        return ResponseBuider.BuildResponse();
    }
}