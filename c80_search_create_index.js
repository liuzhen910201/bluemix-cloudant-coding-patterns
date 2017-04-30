#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);

var indexer = function(doc) {
    index("type", doc.type);
    index("desc", doc.desc);
}

var ddoc = {
    _id: '_design/index-search',
    indexes: {
	pets: {
	    analyzer: { name: 'standard'},
	    index   : indexer
	}	    
    }
};

cdb.insert(ddoc, function (err, result) {
    if (err) {
	throw err;
    }
    console.log('Created design document with books index', result);
});
