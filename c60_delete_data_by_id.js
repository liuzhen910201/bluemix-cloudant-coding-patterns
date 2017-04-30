#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);

// DELETE 
var key = 'rabbit'
cdb.get(key, function(err,data) {
    console.log("data = ", data);
    cdb.destroy(key, data._rev, function(err, body, header) {
	if (err) {
	    throw err;
	}
	console.log("deleted = ", key);
    });
});


