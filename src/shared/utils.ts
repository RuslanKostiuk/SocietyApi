import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import {ErrorHandler} from "./errorHandler";
import {ErrorStatuses} from "./enums";
import {IENV} from "../environment/ienv";
const env: IENV = require("../environment/dev.json");
const saltRounds: number = 10;

export async function decryptPassword(password: string): Promise<string> {
    try {
        return await bcrypt.hash(password, saltRounds)
    } catch(err) {
        throw err;
    }
}

export async function compareDecriptedPassword(decrypted: string, encrypted: string): Promise<boolean> {
    try {
        return await bcrypt.compare(encrypted, decrypted);
    } catch (e) {
        throw e;
    }
}

export async function SandEmailMessage(recipientEmail: string, message: string, subject: string): Promise<any> {
    let SmtpOptions: any = env.mail.smtp;
    const smtp = nodemailer.createTransport(SmtpOptions);
    const mailOptions = {
        from: env.mail.sender,
        to: recipientEmail,
        subject: "Society Email Verification",
        text: message
    };
    try {
        await smtp.sendMail(mailOptions);
    } catch (e) {
        throw ErrorHandler.BuildError(ErrorStatuses.emailError, e.message);
    }
}