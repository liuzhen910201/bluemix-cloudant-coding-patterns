#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";

// 削除
cloudant.db.destroy(dbn, function(err) {
    if (err) {
	throw err;
    }
});

