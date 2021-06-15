import { Model, DataTypes, Sequelize } from "sequelize"

export default class User extends Model {
  public id!: number
  public firstName!: string
  public lastName!: string
  public email!: string
  public password!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  // https://sequelize.org/master/manual/validations-and-constraints.html
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: '姓が入力されていません'
            }
          }
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: '姓が入力されていません'
            }
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: 'Eメールのフォーマットはxxx@xxxです'
            }
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            min: {
              args: [6],
              msg: "パスワードは6文字以上です"
            },
            isEmail: {
              msg: 'パスワードが入力されていません'
            },
          }
        }
      },
      {
        sequelize,
        modelName: 'user',
        tableName: 'users',
        // 下記は別に設定しなくてもよさげ
        // underscored: true,
        // createdAt: 'created_at',
        // updatedAt: 'updated_at',
      }
    )

    return this
  }

  static associate() {}

  fullName(): string {
    return `${this.lastName} ${this.firstName}`
  }
}
