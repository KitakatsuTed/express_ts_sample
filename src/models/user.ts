import {Model, DataTypes, Sequelize, CreateOptions} from "sequelize"
import bcrypt from 'bcrypt-nodejs'

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
              msg: '名が入力されていません'
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
          unique: { name: 'email', msg: 'Eメールは存在します' },
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
            notEmpty: {
              msg: 'パスワードが入力されていません'
            },
            // min が想定通り動かないのでlenを利用
            len: {
              args: [6, 100],
              msg: "パスワードは6文字以上です"
            }
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
        hooks: {
          beforeCreate: beforeCreate
        }
      }
    )

    return this
  }

  static associate() {}

  fullName(): string {
    return `${this.lastName} ${this.firstName}`
  }

  validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }
}

function cryptPassword(password: string) {
  console.log("cryptPassword" + password);

  return new Promise(function (resolve: (hash: string) => void, reject: (err: Error) => void) {
    bcrypt.genSalt(10, function (err: Error, salt: string) {
      // Encrypt password using bycrpt module
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, function (err: Error, hash: string) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
}

function beforeCreate(user: User, option: CreateOptions) {
  console.log("User.beforeCreate");

  return cryptPassword(user.password)
    .then(success => {
      user.password = success;
    })
    .catch(err => {
      if (err) console.log(err);
    });
}

// callbackの追加はこっちでも行ける
// User.addHook('beforeValidate', (user, options) => {
//   user.mood = 'happy';
// });
