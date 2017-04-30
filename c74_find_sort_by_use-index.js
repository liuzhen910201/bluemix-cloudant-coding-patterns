#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);

// これは、残念さがら動作しない。
query = {
    "selector": {
	"count": {
	    "$gt" : 0
	}
    },
    "fields": [
	"_id",
	"count",
	"age"
    ],
    "sort": [ { "count:number": "desc"}],
    "limit": 10,
    "use_index": "_design/index-text"
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

