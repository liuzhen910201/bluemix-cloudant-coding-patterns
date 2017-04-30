# bluemix-cloudant-coding-patterns
Bluemix Cloudant コーディング パターン サンプルコード


## 事前準備

node バージョンは、v4.4.7 で開発とテストを実施しています。

本サンプルコードを自己の環境へコピーする

~~~
$ git clone https://github.com/takara9/bluemix-cloudant-coding-patterns
~~~

必要なパッケージをインストールする

~~~
$ cd bluemix-cloudant-coding-patterns
$ npm install
~~~

## 認証パターン

Bluemix Cloudant サービス資格情報を cloudant_credentials.json において、読み込んで認証する。これにより、コードと認証情報を分離する事ができる。

~~~
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);
~~~

以下の認証情報の中で、"credentials"の中身が、Bluemix Cludant にサービス資格情報のコピペです。下記は、cloudant_credentials.json例です。

~~~
{
  "credentials": {
      "username": "c1d4ea7b-****-****-****-1d60f***1898-bluemix",
      "password": "****************************************************************",
      "host": "c1d4ea7b-d310-4dd4-a12d-1d60fc371898-bluemix.cloudant.com",
      "port": 443,
      "url": "https://c1d4ea7b-****-****-****-1d60fc371898-bluemix:****************************************************************@c1d4ea7b-d310-4dd4-a12d-1d60fc371898-bluemix.cloudant.com"
  }
}
~~


データベースの選択

~~~
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);
~~~


## データベース作成
ソースコードは c01_create_database.js です。
データベース新規作成します。

~~~
var dbn = "testdb";
cloudant.db.create(dbn, function(err) {
    if (err) {
	throw err;
    }
});
~~~

## データベース削除



## インデックス

### インデックスのリスト

### JSON形式のインデックスを設定する

### TEXT形式のインデックスを設定する


## データ挿入

### コールバックでネストしながらデータを挿入する



