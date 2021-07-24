import Transaction, {
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
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin, Optional
} from "sequelize";
import OrganizationUser from "./organizationUser";
import User from "./user";
import db from "./index";
import {Enum} from "./enums";

interface OrganizationAttributes {
  id: number;
  name: string;
}

interface OrganizationCreationAttributes extends Optional<OrganizationAttributes, "id"> {}

export default class Organization extends Model<OrganizationAttributes, OrganizationCreationAttributes>
  implements OrganizationAttributes {

  public id!: number
  public name!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  public getOrganizationUsers!: HasManyGetAssociationsMixin<OrganizationUser>; // Note the null assertions!
  public setOrganizationUser!: HasManySetAssociationsMixin<OrganizationUser, number>;
  public addOrganizationUser!: HasManyAddAssociationMixin<OrganizationUser, number>;
  public createOrganizationUser!: HasManyCreateAssociationMixin<OrganizationUser>;
  public removeOrganizationUser!: HasManyRemoveAssociationMixin<OrganizationUser, number>;
  public removeOrganizationUsers!: HasManyRemoveAssociationsMixin<OrganizationUser, number>;
  public hasOrganizationUser!: HasManyHasAssociationMixin<OrganizationUser, number>; //型第2引数は親モデルのPKの型でよさそう
  public hasOrganizationUsers!: HasManyHasAssociationsMixin<OrganizationUser, number>; //型第2引数は親モデルのPKの型でよさそう
  public countOrganizationUsers!: HasManyCountAssociationsMixin;

  public getUsers!: BelongsToManyGetAssociationsMixin<User>
  public setUser!: BelongsToManySetAssociationsMixin<User, number>
  public addUsers!: BelongsToManyAddAssociationsMixin<User, number>
  public addUser!: BelongsToManyAddAssociationMixin<User, number>
  public createUser!: BelongsToManyCreateAssociationMixin<User>
  public removeUser!: BelongsToManyRemoveAssociationMixin<User, number>
  public removeUsers!: BelongsToManyRemoveAssociationsMixin<User, number>
  public hasUser!: BelongsToManyHasAssociationMixin<User, number>
  public hasUsers!: BelongsToManyHasAssociationsMixin<User, number>
  public countUsers!: BelongsToManyCountAssociationsMixin

  public readonly organizationUsers?: OrganizationUser[];
  public readonly users?: User[];


  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
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
      as: 'organizationUsers',
      onDelete: 'CASCADE', // onDeleteとhooksで子テーブルも同時削除
      hooks: true
    })

    this.belongsToMany(db.User, {
      through: 'OrganizationUser',
      foreignKey: 'organizationId',
      otherKey: 'userId',
      as: 'users'
    })
  }

  // tips user.addProject(project, { through: { role: 'manager' }}); throughで中間テーブルの属性値もせっていできるはず、、
  static async createWithUser(attr: OrganizationCreationAttributes, user: User) {
    // @ts-ignore transactionの型定義がnamespaceの方を参照してしまうのでignoreしてみた
    const result: Organization = await db.sequelize.transaction(async (t: Transaction) => {
      const organization: Organization = await this.create(attr)
      await organization.addUser(user, { through: { role: Enum.OrganizationUser.MEMBER_ROLE.MANAGER, status: Enum.OrganizationUser.ACCEPT_STATUS.ACCEPT }})

      return organization
    })

    return result
  }

  async isMember(user: User): Promise<boolean> {
    return await this.countOrganizationUsers({ where: { userId: user.id } }) > 0
  }

  async isManager(user: User): Promise<boolean> {
    return await this.countOrganizationUsers({ where: { userId: user.id, role: Enum.OrganizationUser.MEMBER_ROLE.MANAGER } }) > 0
  }
}
