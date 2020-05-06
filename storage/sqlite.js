const sqlite = require('sqlite')
var db;
exports.init=async function(){
	var db=await sqlite.open({filename: __dirname+"/../NO_GIT_data/data.sqlite",driver: require("sqlite3").cached.Database})
	exports.db=db	
}

exports.exec=async function(sql)
{
	return db.exec(sql);
}
exports.tryExec=async function(sql){
	try
	{
		return exports.exec(sql)
	}catch(e){
		console.log(e)
	}
	return
}
