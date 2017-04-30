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
~~~




## データベース作成パターン
データベース新規作成します。

~~~
var dbn = "testdb";
cloudant.db.create(dbn, function(err) {
    if (err) {
	throw err;
    }
});
~~~

ソースコード:[c01_create_database.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c01_create_database.js)


## データベース削除
データベース名を指定して削除します。

~~~
var dbn = "testdb";
cloudant.db.destroy(dbn, function(err) {
    if (err) {
    throw err;
    }
});
~~~

ソースコード:[c02_drop_database.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c02_drop_database.js)


## データベースの選択パターン

データベース名を変数dbnに入れて、現在のデータベース・オブジェクト変数cdbへ設定する。

~~~
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);
~~~

ソースコード:[c12_create_index_json.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c12_create_index_json.js)


## インデックス
Cloudantで検索結果をソートする場合、インデックスが必要になります。インデックスにはTEXTとJSON形式の２つの方法があります。

### インデックスのリスト
作成済みのインデックスをリストします。

~~~
cdb.index(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(JSON.stringify(result, null, 2));
});
~~~

ソースコード:[c11_list_indexs.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c11_list_indexs.js)


### JSON形式のインデックスを設定する

~~~
// JSON インデックス
var ddoc_name =  "index-json";
var key = "_design/" + ddoc_name;
var index = {
    type: "json", 
    name: "index-1", 
    ddoc: ddoc_name,
    index: {
	fields: ["count","age"]
    }
}

// インデックス作成 (共通)
function create_index(index_name, callback) {
    cdb.index(index, function(err, response) {
	if (err) {
	    throw err;
	}
	console.log('Index creation result: %s', response.result);
	callback(err, response);
    });
}

// インデックスの更新
cdb.get(key, function(err,data) {
    if (err) {
	create_index(index, function(err, response) {});
    } else {
	cdb.destroy(data._id, data._rev, function(err, body, header) {
	    if (err) {
		throw err;
	    }
	    console.log("deleted = ", key);
	    create_index(index, function(er, response) {});
	});
    }
});
~~~

ソースコード:[c12_create_index_json.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c12_create_index_json.js)


### TEXT形式のインデックスを設定する
JSON形式からの違いの部分だけを以下に提示します。

~~~
var ddoc_name =  "index-text";
var key = "_design/" + ddoc_name;
var index = {
    "type": "text", 
    "name": "index-2", 
    "ddoc": ddoc_name,
    "index": {
	"fields": [
	    { "name": "count", "type": "number" },
	    { "name": "age",   "type": "number" }
	]
    }
}
~~~

[c13_create_index_text.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c13_create_index_text.js)


## データ挿入

データを挿入する幾つかのパターンを提示します。

### コールバックでネストしながらデータを挿入する
以下のコードでは type を _id にセットするため、後の検索が高速になります。また、コールバックの中に次の挿入処理が入っているため、処理の順序が保証されます。

~~~
//        DATA
docs = [ { type: "rabbit", crazy: false, count: 10, age: 3, desc: "可愛い兎"},
 	 { type: "dog",    crazy: true,  count: 20, age: 3, desc: "大きな犬"},
	 { type: "mouse",  crazy: false, count: 30, age: 3, desc: "大きな鼠"},
	 { type: "cat",    crazy: true,  count: 30, age: 4, desc: "可愛い猫"} ]

// データのINSERT
cdb.insert( docs[0], docs[0].type, function(err, body, header) {
    if (err) {
	throw err;
    }
    console.log('You have inserted', body);
    cdb.insert( docs[1], docs[1].type, function(err, body, header) {
	if (err) {
	    throw err;
	}
	console.log('You have inserted', body);
	cdb.insert( docs[2], docs[2].type, function(err, body, header) {
	    if (err) {
		throw err;
	    }
	    console.log('You have inserted', body);
	    cdb.insert( docs[3], docs[3].type, function(err, body, header) {
		if (err) {
		    throw err;
		}
		console.log('You have inserted', body);
	    });
	});
    });
});
~~~

ソースコード:[c20_insert_data_nest.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c20_insert_data_nest.js)

##ループでキーを指定してデータを挿入する
コールバックで処理せず、ノンブロッキングで実行します。これは、先行するcdb.insertの終了を待たずに、ループを回して、処理を開始させるためセッション数が膨大に増えるなどリスクがあるので注意が必要になります。

~~~
//        KEY       DATA
docs = { 'rabbit': { crazy: false, count: 10, age: 3, desc: "可愛い兎"},
 	 'dog':    { crazy: true,  count: 20, age: 3, desc: "大きな犬"},
	 'mouse':  { crazy: false, count: 30, age: 3, desc: "大きな鼠"},
	 'cat':    { crazy: true,  count: 30, age: 4, desc: "可愛い猫"}}

// データ挿入ループ
for(var key in docs) {
    console.log("key  = ",key);
    console.log("docs = ",docs[key]);
    cdb.insert(docs[key],key,function(err, body, header) {
	if (err) {
	    console.log("err : ", err);
	    throw err;
	}
	console.log('You have inserted', body);
    });
}
~~~

ソースコード:[c21_insert_data_key.js](https://github.com/takara9/bluemix-cloudant-coding-patterns/blob/master/c21_insert_data_key.js)


