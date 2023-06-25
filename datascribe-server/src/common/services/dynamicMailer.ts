import * as nodemailer from 'nodemailer';
import config from '../config';
import ejs from 'ejs';
import path from 'path';
import { Service } from 'typedi';
import { EMAIL_CONSTANTS } from '../utils/Constant';
@Service()
export class dynamicMailer {
    transporter;

    public constructor() {
        // this.transporter = nodemailer.createTransport({
        //     host: config.SMTP_HOST,
        //     port: config.SMTP_PORT,
        //     secure: false,
        //     service: 'gmail',
        //     auth: {
        //         user: config.SMTP_USER,
        //         pass: config.SMTP_PASSWORD,
        //     },
        // });
    }

    public async APIBackendService(data: any) {
        // const mailOptions = {
        //     from: config.SMTP_FROM,
        //     to: data.receivers,
        //     subject: data.subject,
        //     html: data.body,
        // };
        // this.transporter.sendMail(mailOptions, function (error: any, info: any) {
        //     if (error) logger.error(error);
        // });
    }

    // public async verificationMail(data: any) {
    //     const trans = this.transporter;
    //     const year = new Date().getFullYear();
    //     const invitationLink = `${config.EDEXA_PORTAL_FRONT_URL}user-verify/${data['invitationToken']}`;
    //     ejs.renderFile(
    //         path.join(__dirname, '../', 'views/emails', 'verification.ejs'),
    //         {
    //             EMAIL_CONSTANTS,
    //             verify_link: invitationLink,
    //             year: year,
    //             name: data['name']
    //         },
    //         function (err: any, body: any) {
    //             if (err) {
    //                 logger.error(err);
    //             } else {
    //                 const mailOptions = {
    //                     from: config.SMTP_FROM,
    //                     to: data['receiver_email'],
    //                     subject: 'edeXa Account - Verify Email Address',
    //                     html: body,
    //                 };
    //                 trans.sendMail(mailOptions, function (error: any, info: any) {
    //                     if (error) {
    //                         logger.errorAndMail(error);
    //                     } else {
    //                         logger.info('Email sent: ' + info.response);
    //                     }
    //                 });
    //             }
    //         },
    //     );
    // }

    // public async userWelcomeMail(data: any) {
    //     const trans = this.transporter;
    //     const year = new Date().getFullYear();
    //     ejs.renderFile(
    //         path.join(__dirname, '../', 'views/emails', 'welcomeEmail.ejs'),
    //         {
    //             EMAIL_CONSTANTS,
    //             year,
    //             name: data['name']
    //         },
    //         function (err: any, body: any) {
    //             if (err) logger.error(err);
    //             else {
    //                 const mailOptions = {
    //                     from: config.SMTP_FROM,
    //                     to: data['receiver_email'],
    //                     subject: 'Welcome to edeXa',
    //                     html: body,
    //                 };
    //                 trans.sendMail(mailOptions, function (error: any, info: any) {
    //                     if (error) logger.errorAndMail(error);
    //                     else logger.info('Email sent: ' + info.response);
    //                 });
    //             }
    //         },
    //     );
    // }


    // public async setPasswordMail(data: any) {
    //     const trans = this.transporter;
    //     const year = new Date().getFullYear();
    //     const url = data.sentFrom != 'admin' ? config.EDEXA_PORTAL_FRONT_URL : config.EDEXA_PORTAL_ADMIN_URL;
    //     const invitationLink = `${url}set-password/${data['invitationToken']}`;
    //     ejs.renderFile(
    //         path.join(__dirname, '../', 'views/emails', 'setPassword.ejs'),
    //         {
    //             EMAIL_CONSTANTS,
    //             set_pass_link: invitationLink,
    //             year: year,
    //             name: data['name']
    //         },
    //         function (err: any, body: any) {
    //             if (err) logger.error(err);
    //             else {
    //                 const mailOptions = {
    //                     from: config.SMTP_FROM,
    //                     to: data['receiver_email'],
    //                     subject: 'edeXa Admin - Invitation',
    //                     html: body,
    //                 };
    //                 trans.sendMail(mailOptions, function (error: any, info: any) {
    //                     if (error) {
    //                         logger.errorAndMail(error);
    //                     } else {
    //                         logger.info('Email sent: ' + info.response);
    //                     }
    //                 });
    //             }
    //         },
    //     );
    // }

    // public async forgotPasswordMail(data: any) {
    //     const trans = this.transporter;
    //     const year = new Date().getFullYear();
    //     const resetLink = `${config.EDEXA_PORTAL_FRONT_URL}reset-password/${data['resetToken']}`;
    //     ejs.renderFile(
    //         path.join(__dirname, '../', 'views/emails', 'forgotpassword.ejs'),
    //         {
    //             EMAIL_CONSTANTS,
    //             year: year,
    //             name: data['name'],
    //             resetLink: resetLink,
    //         },
    //         function (err: any, body: any) {
    //             if (err) {
    //                 logger.error(err);
    //             } else {
    //                 const mailOptions = {
    //                     from: config.SMTP_FROM,
    //                     to: data['receiver_email'],
    //                     subject: 'edeXa Account - Reset Password',
    //                     html: body,
    //                 };
    //                 trans.sendMail(mailOptions, function (error: any, info: any) {
    //                     if (error) {
    //                         logger.errorAndMail(error);
    //                     } else {
    //                         logger.info('Email sent: ' + info.response);
    //                     }
    //                 });
    //             }
    //         },
    //     );
    // }

    // public async resetAuthenticator(data: any) {
    //     const trans = this.transporter;
    //     const year = new Date().getFullYear();
    //     const resetLink = `${config.EDEXA_PORTAL_FRONT_URL}forgot-google-auth/${data['resetToken']}`;
    //     ejs.renderFile(
    //         path.join(__dirname, '../', 'views/emails', 'forgotAuthenticator.ejs'),
    //         {
    //             EMAIL_CONSTANTS,
    //             year: year,
    //             name: data['name'],
    //             resetLink: resetLink,
    //         },
    //         function (err: any, body: any) {
    //             if (err) {
    //                 logger.error(err);
    //             } else {
    //                 const mailOptions = {
    //                     from: config.SMTP_FROM,
    //                     to: data['receiver_email'],
    //                     subject: 'edeXa Account - Troubleshoot Google Authenticator',
    //                     html: body,
    //                 };
    //                 trans.sendMail(mailOptions, function (error: any, info: any) {
    //                     if (error) {
    //                         logger.errorAndMail(error);
    //                     } else {
    //                         logger.info('Email sent: ' + info.response);
    //                     }
    //                 });
    //             }
    //         },
    //     );
    // }

    // public async adminForgotPasswordMail(data: any) {
    //     const trans = this.transporter;
    //     const year = new Date().getFullYear();
    //     const resetLink = `${config.EDEXA_PORTAL_ADMIN_URL}reset-password/${data['resetToken']}`;
    //     ejs.renderFile(
    //         path.join(__dirname, '../', 'views/emails', 'adminForgotPassword.ejs'),
    //         {
    //             EMAIL_CONSTANTS,
    //             year: year,
    //             name: data['name'],
    //             resetLink: resetLink,
    //         },
    //         function (err: any, body: any) {
    //             if (err) {
    //                 logger.error(err);
    //             } else {
    //                 const mailOptions = {
    //                     from: config.SMTP_FROM,
    //                     to: data['receiver_email'],
    //                     subject: 'edeXa Admin - Reset Password',
    //                     html: body,
    //                 };
    //                 trans.sendMail(mailOptions, function (error: any, info: any) {
    //                     if (error) {
    //                         logger.errorAndMail(error);
    //                     } else {
    //                         logger.info('Email sent: ' + info.response);
    //                     }
    //                 });
    //             }
    //         },
    //     );
    // }

    // public async otpVerification(data: any) {
    //     const trans = this.transporter;
    //     const year = new Date().getFullYear();
    //     const expirationTime = timeConversion(config.OTP_REDIS_EXPIRATION_TIME);
    //     ejs.renderFile(
    //         path.join(__dirname, '../', 'views/emails', 'otp.ejs'),
    //         {
    //             EMAIL_CONSTANTS,
    //             year: year,
    //             expirationTime: expirationTime,
    //             otp: data['otp'],
    //         },
    //         function (err: any, body: any) {
    //             if (err) logger.error(err);
    //             else {
    //                 const mailOptions = {
    //                     from: config.SMTP_FROM,
    //                     to: data['email'],
    //                     subject: 'edeXa Admin - Set Email',
    //                     html: body,
    //                 };
    //                 trans.sendMail(mailOptions, function (error: any, info: any) {
    //                     if (error) {
    //                         logger.errorAndMail(error);
    //                     } else {
    //                         logger.info('Email sent: ' + info.response);
    //                     }
    //                 });
    //             }
    //         },
    //     );
    // }
}