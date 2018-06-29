import * as express from "express";
import { Server } from "typescript-rest";
import * as http from "http";
import * as path from "path";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import authRegisration from "./routes/authRegistration";
import {IENV} from "./environment/ienv";

const env: IENV = require("./environment/dev.json");

export class ApiServer {

    private app: express.Application;
    private server: http.Server = null;
    public PORT: number = env.port;

    constructor() {
        this.app = express();
        this.config();

        Server.useIoC();
        Server.buildServices(this.app, ...authRegisration);

        // TODO: enable for Swagger generation error
        // Server.loadServices(this.app, 'routes/*', __dirname);
        // Server.swagger(this.app, './dist/swagger.json', '/api-docs', 'localhost:3000', ['http']);
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        this.app.use( bodyParser.urlencoded( { extended: false } ) );
        this.app.use( bodyParser.json( { limit: '1mb' } ) );
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(cors());
    }

    /**
     * Start the server
     * @returns {Promise<any>}
     */
    public async start(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }
                // tslint:disable-next-line:no-console
                console.log(`Listening on port: ${this.PORT}`);
                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public async stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }
}