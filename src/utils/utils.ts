import * as bcrypt from "bcrypt";
import * as nodemailer from "nodemailer";
import {ErrorBuilder} from "../shared/errorBuilder";
import {ErrorStatuses} from "../shared/enums";
import {IENV} from "../environment/ienv";
import * as jwt from 'jsonwebtoken';

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
    return await bcrypt.compare(decrypted, encrypted);
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
        throw ErrorBuilder.BuildError(ErrorStatuses.emailError, e.message);
    }
}

export function generateToken(userId: string): string {
    let payload: any = {
        id: userId
    };

    return jwt.sign(payload, env.user_secret);
}