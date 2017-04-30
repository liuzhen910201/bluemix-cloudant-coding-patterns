#!/usr/bin/env node

// Cloudantへの接続
var cred = require('./cloudant_credentials.json');
var Cloudant = require('cloudant')
var cloudant = Cloudant(cred.credentials.url);

// データベース
var dbn = "testdb";
var cdb = cloudant.db.use(dbn);

// CSVファイルの読み取り と データベースへの書き込み
var inputFile = "data1.csv"
var csv = require("fast-csv");
var csvstream = csv.fromPath(inputFile, { headers: true })
    .on("data", function (row) {
	//console.log("row ", row);
	row.count = Number(row.count);
	row.age = Number(row.age);
	row.crazy = (row.crazy == "true");

	// INSERT
	cdb.insert(row,row.type,function(err, body, header) {
	    if (err) {
		throw err;
	    }
	    console.log('You have inserted', body)
	});

    })
    .on("end", function () {
        console.log("終了")
    })
    .on("error", function (error) {
        console.log("error : ",error)
    });

