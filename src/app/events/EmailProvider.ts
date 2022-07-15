import {EmailInterface} from "../interfaces";
import path from "path";
import nodemailer from 'nodemailer';
import hbs, {NodemailerExpressHandlebarsOptions} from "nodemailer-express-handlebars";
import {smtpConfig} from "../constant";

let transporter = nodemailer.createTransport(smtpConfig);

export default class EmailProvider implements EmailInterface{

    public send(to: string, subject: string, template: string, data: any): Promise<any> {

        return new Promise((resolve, reject) => {
            try {

                const FROM_MAIL = process.env.APPNAME;

                transporter.use('compile', hbs(EmailProvider.getOptions()));

                let mailOptions = { from: FROM_MAIL, to: to, subject: subject, template: template, context: data };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        return reject({message: 'Message not sent'});
                        // console.log('error', error);
                        // return reject({message: error})
                    }
                    else
                    {
                        console.log('Message sent: ' + info.response);
                        return resolve('Message sent');
                    }
                });
            }
            catch (e) {
                console.log('error', e);
                return reject({message: 'Something went wrong'})
            }
        });
    }

    private static getOptions () {
        const handlebarOptions: NodemailerExpressHandlebarsOptions = {
            viewEngine: {
                extname: '.handlebars',
                partialsDir: path.resolve('./views'),
                defaultLayout: false
            },
            viewPath: path.resolve('./views'),
            extName: ".handlebars",
        }
        return handlebarOptions;
    }

}