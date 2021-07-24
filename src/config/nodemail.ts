import dotenv from 'dotenv'
dotenv.config()

// TODO process.env.MAIL_PORTの型定義が合わないので直接 .d.tsで調整する
// 今使ってない
const mailConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
}

export default mailConfig
