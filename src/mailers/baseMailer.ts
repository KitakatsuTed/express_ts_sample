import nodemailer, {Transporter} from 'nodemailer'
import Mail from "nodemailer/lib/mailer";
import mailClientConfig from "../config/nodemail";

const defaultData = {
  from: process.env.MAIL_FROM,
} as const

export default class BaseMailer {
  public client!: Transporter

  // https://penpen-dev.com/blog/xserver-nodemailer/
  constructor() {
    console.log(process.env.NODE_ENV)
    // @ts-ignore
    this.client = nodemailer.createTransport(mailClientConfig[process.env.NODE_ENV])
  }
// https://blog.capilano-fw.com/?p=5673
  static async sendMail(mailData: Mail.Options) {
    const mailer =  new this()
    await mailer.client.sendMail({ ...defaultData, ...mailData }, (error: Error | null, info) => {
      if(error) {
        console.log(error); // エラー情報
      } else {
        console.log("html data ======================>\n", mailData.html);
        console.log(info);  // 送信したメールの情報
      }
    })
  }
}
