import {Model, DataTypes, Sequelize} from "sequelize";

export default class OrganizationUser extends Model {
  public id!: number
  public organizationId!: number
  public userId!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        organizationId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: '組織が紐づいていません'
            }
          }
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'ユーザーが紐づいていません'
            }
          }
        },
      },
      {
        indexes: [{unique: true, fields: ['userId', 'organizationId']}],
        sequelize,
        modelName: 'OrganizationUser',
        hooks: {
        }
      }
    )

    return this
  }

  static associate(db: any) {
    this.belongsTo(db.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    this.belongsTo(db.Organization, {
      foreignKey: 'organizationId',
      as: 'organization'
    })
  }
}