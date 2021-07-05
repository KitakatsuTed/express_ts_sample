import {Model, DataTypes, Sequelize} from "sequelize";

export default class Organization extends Model {
  public id!: number
  public name!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: '組織名が入力されていません'
            }
          }
        }
      },
      {
        sequelize,
        modelName: 'Organization',
        hooks: {
        }
      }
    )

    return this
  }

  static associate(db: any) {
    this.hasMany(db.OrganizationUser, {
      foreignKey: 'organizationId',
      as: 'organizationUsers'
    })

    this.belongsToMany(db.User, {
      through: 'OrganizationUser',
      foreignKey: 'organizationId',
      otherKey: 'userId',
      as: 'users'
    })
  }
}
