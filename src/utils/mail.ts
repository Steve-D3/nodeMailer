import nodemailer from "nodemailer";
import { SMTP_HOST, SMTP_USER, SMTP_PASS } from "./envs"
import { mailData } from "../types/mailTypes";

let testAccount = await nodemailer.createTestAccount();
const testHost = "smtp.ethereal.email";

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

export const sendEmail = async (data: mailData) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "steven.duquefranco3@gmail.com",
            subject: "Nieuwe Formulier Inzending",
            html: `
      <h2>Nieuwe Formulier Inzending</h2>
      <p><strong>Naam:</strong> ${data.naam} ${data.voornaam}</p>
      <p><strong>Geboortedatum:</strong> ${data.geboortedatum}</p>
      <p><strong>Haarkleur:</strong> <span style="color:${data.haarkleur}">${data.haarkleur}</span></p>
      <p><strong>Lengte:</strong> ${data.lengte} cm</p>
      <p><strong>Geslacht:</strong> ${data.geslacht}</p>
      <p><strong>Opmerking:</strong> ${data.opmerking}</p>
    `,
        });
        
        console.log(info);
        console.log("Mail verstuurd");
        console.log(nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
};