import {
  Model,
  DataTypes,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  Optional
} from "sequelize";
import Todo from "./todo";
import {Enum} from "./enums/organizationUser";

interface OrganizationUserAttributes {
  id: number;
  role: Enum.OrganizationUser.Role;
  organizationId: number;
  userId: number;
}

interface OrganizationUserCreationAttributes extends Optional<OrganizationUserAttributes, "id"> {}

export default class OrganizationUser extends Model<OrganizationUserAttributes, OrganizationUserCreationAttributes> {
  public id!: number
  public organizationId!: number
  public userId!: number
  public role!: Enum.OrganizationUser.Role

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public getTodos!: HasManyGetAssociationsMixin<Todo>;
  public setTodo!: HasManySetAssociationsMixin<Todo, number>;
  public addTodo!: HasManyAddAssociationMixin<Todo, number>;
  public createTodo!: HasManyCreateAssociationMixin<Todo>;
  public removeTodo!: HasManyRemoveAssociationMixin<Todo, number>;
  public removeTodos!: HasManyRemoveAssociationsMixin<Todo, number>;
  public hasTodo!: HasManyHasAssociationMixin<Todo, number>;
  public hasTodos!: HasManyHasAssociationsMixin<Todo, number>;
  public countTodos!: HasManyCountAssociationsMixin;

  public readonly todos?: Todo[];

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        role: {
          type: DataTypes.ENUM(...Object.values(Enum.OrganizationUser.MEMBER_ROLE)),
          allowNull: false,
          defaultValue: Enum.OrganizationUser.MEMBER_ROLE.NORMAL,
          validate: {
            isIn: {
              args: [Object.values(Enum.OrganizationUser.MEMBER_ROLE)],
              msg: '不正なステータスです'
            }
          }
        },
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

    this.hasMany(db.Todo, {
      foreignKey: 'organizationUserId',
      as: 'Todos',
      onDelete: 'CASCADE',
      hooks: true
    })
  }
}
