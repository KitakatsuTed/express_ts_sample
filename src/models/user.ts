import {
  Model,
  DataTypes,
  Sequelize,
  CreateOptions,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin, BelongsToManyCountAssociationsMixin
} from "sequelize"
import bcrypt from 'bcrypt-nodejs'
import OrganizationUser from "./organization_user";
import Organization from "./organization";

export default class User extends Model {
  public id!: number
  public firstName!: string
  public lastName!: string
  public email!: string
  public password!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  // https://github.com/ahmerb/typescript-sequelize-example
  // @See https://sequelize.org/master/manual/typescript.html
  // とりあえずhasMany系のMixinは全部出しといた
  public getOrganizationUsers!: HasManyGetAssociationsMixin<OrganizationUser>; // Note the null assertions!
  public setOrganizationUser!: HasManySetAssociationsMixin<OrganizationUser, number>;
  public addOrganizationUser!: HasManyAddAssociationMixin<OrganizationUser, number>;
  public createOrganizationUser!: HasManyCreateAssociationMixin<OrganizationUser>;
  public removeOrganizationUser!: HasManyRemoveAssociationMixin<OrganizationUser, number>;
  public removeOrganizationUsers!: HasManyRemoveAssociationsMixin<OrganizationUser, number>;
  public hasOrganizationUser!: HasManyHasAssociationMixin<OrganizationUser, number>; //型第2引数は親モデルのPKの型でよさそう
  public hasOrganizationUsers!: HasManyHasAssociationsMixin<OrganizationUser, number>; //型第2引数は親モデルのPKの型でよさそう
  public countOrganizationUsers!: HasManyCountAssociationsMixin;

  public getOrganizations!: BelongsToManyGetAssociationsMixin<Organization>
  public setOrganization!: BelongsToManySetAssociationsMixin<Organization, number>
  public addOrganizations!: BelongsToManyAddAssociationsMixin<Organization, number>
  public addOrganization!: BelongsToManyAddAssociationMixin<Organization, number>
  public createOrganization!: BelongsToManyCreateAssociationMixin<Organization>
  public removeOrganization!: BelongsToManyRemoveAssociationMixin<Organization, number>
  public removeOrganizations!: BelongsToManyRemoveAssociationsMixin<Organization, number>
  public hasOrganization!: BelongsToManyHasAssociationMixin<Organization, number>
  public hasOrganizations!: BelongsToManyHasAssociationsMixin<Organization, number>
  public countOrganizations!: BelongsToManyCountAssociationsMixin

  // 必要なら定義でよい
  public readonly organizationUsers?: OrganizationUser[];
  public readonly organizations?: Organization[];

  // https://sequelize.org/master/manual/validations-and-constraints.html
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
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
        modelName: 'User',
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

  public static associations: {
    organizationUsers: Association<User, OrganizationUser>;
  };

  static associate(db: any) {
    this.hasMany(OrganizationUser, {
      foreignKey: 'userId',
      as: 'organizationUsers' // this determines the name in `associations`!
    })

    this.belongsToMany(Organization, {
      through: OrganizationUser,
      foreignKey: 'userId',
      otherKey: 'organizationId',
      as: 'organizations'
    })
  }

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
