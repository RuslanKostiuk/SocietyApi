import {ErrorStatuses} from "./enums";

export class SocietyError extends Error {
    errorStatus: ErrorStatuses;

    constructor(errorStasus: ErrorStatuses, message?: string) {
        super(message);
        this.errorStatus = errorStasus;
    }
}

export class ErrorBuilder {
    public static BuildError(errorStatus: ErrorStatuses, message?: string): SocietyError {
        return new SocietyError(errorStatus, message);
    }
}