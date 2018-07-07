import {ErrorStatuses} from "./enums";

export class SocietyError extends Error {
    errorStatus: ErrorStatuses;

    constructor(errorStasus: ErrorStatuses, message?: string) {
        super(message);
        this.errorStatus = errorStasus;
    }
}

export class ErrorHandler {
    public static BuildError(errorStatus: ErrorStatuses, message?: string): SocietyError {
        console.log(errorStatus);
        if (message) {
            console.log(message);
        }
        return new SocietyError(errorStatus, message);
    }
}