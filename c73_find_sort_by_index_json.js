#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);

// このコードが動作するためには、c12_create_index_json.js が実行されている必要がある
// 
// もし、selector の中身をコメントにすると、ソートが効かなくなる
// コメントにした場合_id にインデックスが利用されるため_id の昇順ソートになる
// selector に、インデックスの項目を設定する事で、インデックスを指定する事ができる。
//
query = {
    "selector": {
	"count": { "$gt": 0 }
    },
    "fields": [
	"_id",
	"count",
	"age"
    ],
    "sort": [ { "count": "desc"}, 
	      { "age": "desc"}],
    "limit": 10
}


// 検索実行
cdb.find(query,function(err, body) {
    if (err) {
	throw err;
    }
    console.log("Hits:",body.docs.length);
    for (var i = 0; i < body.docs.length; i++) {
	console.log(body.docs[i]);
    }
});
