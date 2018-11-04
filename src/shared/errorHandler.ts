import {ErrorStatuses} from "./enums";
import {UnauthorizedError} from "typescript-rest/dist/server-errors";

export class ErrorHandler {
    public static BuildError(errorStatus: ErrorStatuses, error?: Error): Error {
        console.log(errorStatus);

        if (error) {
            console.error(error);
        }

        let e: Error;
        switch (errorStatus) {
            case ErrorStatuses.userNotFound:
            case ErrorStatuses.passwordNotCorrect:
            case ErrorStatuses.emailError:
                e = new UnauthorizedError();
                e.message = errorStatus;
                break;
            case ErrorStatuses.saveError:
            case ErrorStatuses.registrationError:
            case ErrorStatuses.s3Error:
            case ErrorStatuses.unknown:
                e = error;
                break;
        }

        Object.assign(e, errorStatus);

        return e || error;
    }
}