import { Sequelize } from "sequelize";
import User from "./user";
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];

// let sequelize: Sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
const sequelize = new Sequelize(config.database, config.username, config.password, config);


// 同じディレクトリないのjsファイルからexportされているモデルクラスをオブジェクトオブジェクトのdbにモデル名(Model.name?)をキーに格納
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// モデルクラスつくったらここに追加する
const db: any = {
  User: User.initialize(sequelize) // initializeはRailsと違ってモデルクラスの初期化でインスタンスかではない
}

// モデルごとのアソシエーション定義関数の実行
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.Sequelize = Sequelize;

export default db;
// module.exports = db;
