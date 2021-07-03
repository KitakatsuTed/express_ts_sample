import { Model, BuildOptions } from 'sequelize';

/* モデル(table)のスキーマ情報(ここはRailsライクにschema.tsとかにまとめても良い? */
interface UserModel extends Model {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  readonly created_at: Date;
  readonly updated_at: Date;
}

// & はintersection型で複数の型に当てはまることを意味する
type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
}
/* --------------- */

interface DBModel {
  user: UserModelStatic;
}

declare const db: DBModel;
export = db;