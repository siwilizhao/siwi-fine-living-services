const nodemailer = require('nodemailer');
const utils = require('../../utils')
const {ACCOUNT, SMTP_HOST, PORT } = require('../config')
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: PORT,
    secure: true,
    auth: {
        user: ACCOUNT.user,
        pass: ACCOUNT.pass
    }
});
class Email {
    constructor() {

    }
    async send() {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.ym.163.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'notification@siwi.me',
                    pass: 'siwi2018'
                }
            });
        
            let mailOptions = {
                from: '"Fred Foo 👻" <notification@siwi.me>', // sender address
                to: 'siwi@siwi.me, register@siwi.me', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });
       
    }

    /**
     * 发送html
     * @param {*} task 
     */
    async sendHtml(task) {
        const to = task['to']
        const html = await this._getTaskNotifyHtml(task.data)
        const mailOptions = {
            from: '"思微通知邮件👻" <notification@siwi.me>',
            to: to,
            subject: '【任务执行通知】',
            html: html
        };
        const res = await transporter.sendMail(mailOptions)
        console.log(res)
    }

    async _getTaskNotifyHtml(data) {
        const date = await utils.getDate()
        let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>任务执行邮件通知</title>
        </head>
        <body>
            <h1>${data['title']}</h1>
            <div>${data['content']}</div>
            <div>${date}</div>
        </body>
        </html>`
        return html
    }
}

module.exports = new Email()
