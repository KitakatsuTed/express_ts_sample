import nodemailer, {Transporter} from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

const defaultData = {
  from: process.env.MAIL_FROM,
} as const

export default class BaseMailer {
  public client!: Transporter

  // https://penpen-dev.com/blog/xserver-nodemailer/
  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 1025, // process.env.MAIL_PORT
      tls: {
        rejectUnauthorized: process.env.NODE_ENV == 'production',
      },
    })
  }
// https://blog.capilano-fw.com/?p=5673
  static async sendMail(mailData: Mail.Options) {
    const mailer =  new this()
    await mailer.client.sendMail({ ...defaultData, ...mailData }, (error: Error | null, info) => {
      if(error) {
        console.log(error); // エラー情報
      } else {
        console.log(info);  // 送信したメールの情報
      }
    })
  }
}
