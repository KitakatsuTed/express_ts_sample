import { Sequelize } from "sequelize";
import colors from 'colors/safe'
import User from "./user";
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
// let sequelize: Sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

config.logging = (logStr: string, execTime: number, options: any) => {
  const col = (optionType: string, log: string) => {
    switch (optionType) {
      case 'SELECT':
        return colors.blue(colors.bold(log))
      case 'UPDATE':
        return colors.yellow(colors.bold(log))
      case 'INSERT':
        return colors.green(colors.bold(log))
      case 'DELETE':
        return colors.red(colors.bold(log))
      default:
        return colors.white(colors.bold(log))
    }
  }
  console.log(colors.magenta(colors.bold(`[${execTime} ms]`)), col(options.type, logStr))
}


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

db.Sequelize = Sequelize;

export default db;
// module.exports = db;