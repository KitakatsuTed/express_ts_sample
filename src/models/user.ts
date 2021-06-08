import { Model, DataTypes, Sequelize } from "sequelize"

export default class User extends Model {
  public id!: number
  public firstName!: string
  public lastName!: string
  public email!: string

  public readonly created_at!: Date
  public readonly updated_at!: Date

  static initialize(sequelize: Sequelize) {
    this.init({
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'user',
      tableName: 'users',
      // underscored: true,
      // createdAt: 'created_at',
      // updatedAt: 'updated_at',
    })

    return this
  }

  static associate() {}

  fullName() {
    return `${this.lastName} ${this.firstName}`
  }
}

// 元のファイル
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   user.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'user',
//   });
//   return user;
// };