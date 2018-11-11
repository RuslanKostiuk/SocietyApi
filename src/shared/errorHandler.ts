import {ErrorStatuses} from "./enums";
import {UnauthorizedError} from "typescript-rest/dist/server-errors";

export class ErrorHandler {
    public static BuildError(errorStatus: ErrorStatuses, error?: Error): Error {
        // if (error) {
        //     error["errorStatus"] = errorStatus;
        // }

        switch (errorStatus) {
            case ErrorStatuses.dbError:
            case ErrorStatuses.s3Error:
            case ErrorStatuses.unknown:
                console.log(error);
                break;
        }

        return error;
    }
}