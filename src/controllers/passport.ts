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
        const ExtractJwt = passportJWT.ExtractJwt;
        const JwtStrategy = passportJWT.Strategy;

        this.jwtOptions["jwtFromRequest"] = ExtractJwt.fromAuthHeaderAsBearerToken();
        this.jwtOptions["secretOrKey"] = env.user_secret;

        const strategy = new JwtStrategy(this.jwtOptions, async (jwt_payload, next) => {
            const user: IUserModel = await User.findById(jwt_payload.id);
            if (user) {
                next(undefined, user)
            } else {
                next(undefined, false)
            }
        });

        this.passport = passport;
        this.passport.use(strategy);

        this.passport.serializeUser((userModel, done) => done(undefined, userModel.id));
        this.passport.deserializeUser(async (id, done) => {
            const user = await User.findById(id);
            user ? done(undefined, user) : done(user.errors, undefined)
        })
    }

    getJwtOptions(): any {
        return this.jwtOptions
    }

    getPassport(): any {
        return this.passport
    }
}