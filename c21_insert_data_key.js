#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);

//      KEY       DATA
docs = { 'rabbit': { crazy: false, count: 10, age: 3, desc: "可愛い兎"},
 	 'dog':    { crazy: true,  count: 20, age: 3, desc: "大きな犬"},
	 'mouse':  { crazy: false, count: 30, age: 3, desc: "大きな鼠"},
	 'cat':    { crazy: true,  count: 30, age: 4, desc: "可愛い猫"}}


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
