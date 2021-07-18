## 環境構築

```shell script
npm install
npm run dev
npm run client
```

### 環境変数

```shell script
cp .env.sample .env
```

### DBセットアップ

Dockerを利用する場合(＊しない場合はpostgresをインストール)
```shell script
docker-compose build
docker-compose up
```

DB削除
```shell script
./src/bin/db/drop
```
DB作成
```shell script
./src/bin/db/create
```
マイグレーション
```shell script
./src/bin/db/migrate
```
DBリセット
```shell script
./src/bin/db/reset
```

### サーバー立ち上げ
```shell script
npm run client # クライアント側サーバー(webpack)起動 :8080
npm run dev # バックエンド側サーバー起動 :3000
```

### メールサーバー立ち上げ
```shell script
maildev # 1080ポートでメール確認 1025ポートsmtpサーバー起動
```

### ルーティング出力
```shell script
./src/bin/routes
```

localhost:8080で開発進めるすすめる

## 開発
### モデル作成
models/ migrations/ 以下にそれぞれファイルが作られる
```shell script
npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string
npx sequelize-cli migration:create --name name_of_your_migration
```

### 参考
- https://snowsystem.net/javascript/typescript/express-typescript-rest-api/
- https://qiita.com/jumperson/items/e546137f6305ea98a673
- https://blog.mamansoft.net/2019/08/12/develop-express-with-typescript-cool-environment/#%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E4%BD%9C%E6%88%90

React参照
- https://qiita.com/ohs30359-nobuhara/items/bdc06b2db1bef7af2439

DBセットアップ sequlize postgreSQL
- https://qiita.com/KoKeCross/items/144949ba03e5138fc6d5
sequlize-cli specific conf
- https://sequelize.org/master/manual/migrations.html#the--code--sequelizerc--code--file
- https://qiita.com/pokotyan/items/776613d869eca99f6b7b
- https://karuta-kayituka.hatenablog.com/entry/2019/07/21/132814
- https://qiita.com/cobot00/items/0bc0da1095e09bcd0d5f

型定義
- https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a

