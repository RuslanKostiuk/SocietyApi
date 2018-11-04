import {Singleton} from 'typescript-ioc';
import {IUserModel, User} from "../models/userModel/UserSchema";
import {IENV} from "../environment/ienv";
import passportJWT = require("passport-jwt");
import passport = require("passport");
const env: IENV = require("../environment/dev.json");

@Singleton
export default class JWTPassport {
    private passport;
    private jwtOptions: any = {};

    constructor() {
        let ExtractJwt = passportJWT.ExtractJwt;
        let JwtStrategy = passportJWT.Strategy;

        this.jwtOptions["jwtFromRequest"] = ExtractJwt.fromAuthHeaderAsBearerToken();
        this.jwtOptions["secretOrKey"] = env.token.user_secret;

        let strategy = new JwtStrategy(this.jwtOptions, async (jwtPayload, next) => {
            try {
                let user: IUserModel = await User.findById(jwtPayload.id);
                if (user) {
                    next(null, user)
                } else {
                    next(null, false)
                }
            } catch (e) {
                next(e, false);
            }
        });

        this.passport = passport;
        this.passport.use(strategy);
    }

    public getJwtOptions(): any {
        return this.jwtOptions
    }

    public getPassport() {
        return this.passport
    }
}