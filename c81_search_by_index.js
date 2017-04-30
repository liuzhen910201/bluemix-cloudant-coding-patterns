#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);

// SEARCH
ddoc_name = 'index-search';
index_name = 'pets';
query = {
    q:'desc:可愛い'
};

cdb.search(ddoc_name, index_name, query, function(err, result) {
    if (err) {
	throw err;
    }
    console.log("Hits:",result.rows.length);
    for (var i = 0; i < result.rows.length; i++) {
	// GET
	cdb.get(result.rows[i].id, function(err,data) {
	    console.log("data = ", data);
	});
    }
});
