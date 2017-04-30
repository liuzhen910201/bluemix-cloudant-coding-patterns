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

## データベース作成
ソースコード: c01_create_database.js
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



