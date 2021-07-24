import {Model, DataTypes, Sequelize, Optional} from "sequelize";
import {Enum} from "./enums";

interface TodoAttributes {
  id: number;
  title: string;
  description: string;
  organizationUserId: number;
  status: number;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id"> {}

export default class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
  public id!: number
  public title!: string
  public description!: string
  public status!: Enum.Todo.StatusLevel
  public organizationUserId!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        organizationUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: '組織メンバーが紐づいていません'
            }
          }
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'タイトルが入力されていません'
            }
          }
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: '詳細が入力されていません'
            }
          }
        },
        status: {
          type: DataTypes.ENUM(...Object.values(Enum.Todo.STATUS_LEVEL)),
          allowNull: false,
          defaultValue: Enum.Todo.STATUS_LEVEL.UNDONE,
          validate: {
            isIn: {
              args: [Object.values(Enum.Todo.STATUS_LEVEL)],
              msg: '不正なステータスです'
            }
          }
        }
      },
      {
        indexes: [{ fields: ['organizationUserId'] }],
        sequelize,
        modelName: 'Todo',
        hooks: {
        }
      }
    )

    return this
  }

  static associate(db: any) {
    this.belongsTo(db.OrganizationUser, {
      foreignKey: 'organizationUserId',
      as: 'user'
    })
  }

  // enum系のメソッドはentityに直接定義よりenum側(多分type?)に定義する方法があるとよさげ
  statusDone(): boolean { return this.status == Enum.Todo.STATUS_LEVEL.DONE }
  statusUndone(): boolean { return this.status == Enum.Todo.STATUS_LEVEL.UNDONE }
  statusCanceled(): boolean { return this.status == Enum.Todo.STATUS_LEVEL.CANCELED }

}
