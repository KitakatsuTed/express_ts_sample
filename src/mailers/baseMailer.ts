import nodemailer, {Transporter} from 'nodemailer'
import nodeMailerConfig from '../config/nodemailer'
import Mail from "nodemailer/lib/mailer";

const defaultData = {
  from: process.env.MAIL_FROM,
} as const

export default class BaseMailer {
  public client!: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525 // process.env.MAIL_PORT
    })
  }

  static async sendMail(mailData: Mail.Options) {
    const mailer =  new this()
    await mailer.client.sendMail({ ...defaultData, ...mailData })
  }
}
