import dotenv from 'dotenv'
import mg from "nodemailer-mailgun-transport";
dotenv.config()

// TODO process.env.MAIL_PORTの型定義が合わないので直接 .d.tsで調整する
// 今使ってない
// const mailConfig = {
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: process.env.MAIL_SECURE,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS
//   }
// }

const mailClientConfig = {
  "development": {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    tls: {
      rejectUnauthorized: false,
    }
  },
  "production": mg({
    auth: {
      api_key: process.env.MAILGUN_API_KEY as string,
      domain: process.env.MAILGUN_DOMAIN
    }
  })
}

export default mailClientConfig
