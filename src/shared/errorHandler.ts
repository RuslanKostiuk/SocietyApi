import {ErrorStatuses} from "./enums";
import {UnauthorizedError} from "typescript-rest/dist/server-errors";

// export class SocietyError extends Error {
//     errorStatus: ErrorStatuses;
//
//     constructor(errorStasus: ErrorStatuses, message?: string) {
//         if (message) {
//             super(message);
//         } else {
//             super(errorStasus);
//         }
//         this.errorStatus = errorStasus;
//     }
// }

export class ErrorHandler {
    public static BuildError(errorStatus: ErrorStatuses, error?: Error): Error {
        console.error(errorStatus);
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

        return e || error;
    }
}