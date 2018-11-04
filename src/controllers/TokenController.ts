import {IENV} from "../environment/ienv";
import * as jwt from 'jsonwebtoken';
import uuid = require('uuid/v4');
import {RefreshToken, IRefreshTokenModel} from "../models/tokenModel/RefreshTokenSchema";
import IRefreshToken from "../models/tokenModel/IRefreshToken";
import {UnauthorizedError} from "typescript-rest/dist/server-errors";
import {ErrorHandler} from "../shared/errorHandler";
import {ErrorStatuses} from "../shared/enums";
const env: IENV = require("../environment/dev.json");

export default class TokenController {
    public static generateToken(userId: string): string {
        let payload: any = {
            id: userId
        };

        return jwt.sign(payload, env.token.user_secret, {expiresIn: env.token.user_secret_life});
    }

    public static async generateRefreshToken(userId: string): Promise<string> {
        try {
            let token: string = uuid();
            let createdDate: string = new Date().toLocaleString();
            let refreshToken: IRefreshTokenModel = new RefreshToken({
                idUser: userId,
                refreshToken: token,
                createdDate: createdDate
            });
            await refreshToken.save();
            return token;
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }

    public static async renewToken(token): Promise<any> {
        let refreshToken: IRefreshToken = await RefreshToken.findOne({refreshToken: token});
        if (!refreshToken) {
            throw ErrorHandler.BuildError(ErrorStatuses.authError, new UnauthorizedError());
        }

        let createdTime: number = new Date(refreshToken.createdDate).getTime();
        let nowTime: number = new Date().getTime();
        let timeDiff: number = (nowTime - createdTime) / 1000 / 60;
        let lifeTime: number = Number(env.token.refresh_user_secret_life) * 24 * 60;

        if (timeDiff > lifeTime) {
            throw ErrorHandler.BuildError(ErrorStatuses.authError, new UnauthorizedError());
        }

        let oldKey: string = refreshToken.refreshToken;
        refreshToken.refreshToken = uuid();
        refreshToken.createdDate = new Date().toLocaleString();
        try {
            await RefreshToken.findOneAndUpdate({refreshToken: oldKey}, refreshToken);
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
        let accessToken: string = TokenController.generateToken(refreshToken.idUser);

        return {
            token: accessToken,
            refreshToken: refreshToken.refreshToken
        };
    }

    public static async signOut(token: string): Promise<void> {
        try {
            await RefreshToken.deleteOne({refreshToken: token});
        } catch (e) {
            throw ErrorHandler.BuildError(ErrorStatuses.dbError, e);
        }
    }
}