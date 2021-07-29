import {Options, Sequelize} from "sequelize";
import colors from 'colors/safe'
import User from "./user";
import Organization from "./organization";
import OrganizationUser from "./organizationUser";
import Todo from "./todo";
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

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
  console.log("execTime")
  console.log(execTime)
  console.log("options")
  console.log(options)

  if (options) {
    console.log(colors.magenta(colors.bold(`[${execTime} ms]`)), col(options.type, logStr))
  } else {
    console.log(colors.magenta(colors.bold(`[${execTime} ms]`)), col('', logStr))
  }
}

// とりあえずでかいてる

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config as Options);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

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
  // initializeはRailsと違ってモデルクラスの初期化でインスタンスかではない
  User: User.initialize(sequelize),
  Organization: Organization.initialize(sequelize),
  OrganizationUser: OrganizationUser.initialize(sequelize),
  Todo: Todo.initialize(sequelize),
}

// モデルごとのアソシエーション定義関数の実行
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
// module.exports = db;
