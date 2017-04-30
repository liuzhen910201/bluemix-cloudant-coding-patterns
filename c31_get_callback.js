#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);
var keys = ['rabbit','cat','mouse','dog'];

// コールバック関数に入子にシーケンシャルにコールを行う
cdb.get(keys[0], function(err,data) {
    if (err) {
	throw err
    }
    console.log("data = ", data);
    cdb.get(keys[1], function(err,data) {
	if (err) {
	    throw err
	}
	console.log("data = ", data);
	cdb.get(keys[2], function(err,data) {
	    if (err) {
		throw err
	    }
	    console.log("data = ", data);
	    cdb.get(keys[3], function(err,data) {
		if (err) {
		    throw err
		}
		console.log("data = ", data);
	    });
	});
    });
});	
