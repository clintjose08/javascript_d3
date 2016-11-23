var fs = require('fs');

function ReadAppend(file, appendFile){
	fs.readFile(appendFile, function (err, data){
		if (err) throw err;
		console.log('file read');

	fs.appendFile(file, data, function(err){
		if (err) throw err;
		console.log("appended");
	});
	});
}

file='includes/csv/final.csv';
appendFile='includes/csv/India2011.csv';

ReadAppend(file, appendFile)

appendFile='includes/csv/IndiaSC2011.csv';
ReadAppend(file, appendFile)

appendFile='includes/csv/IndiaST2011.csv';
ReadAppend(file, appendFile)