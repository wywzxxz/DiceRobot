var fs=require("fs")
//var sql=require("./storage/sqlite")
var robot=require("./entry/qqrobot")
var peg = require("pegjs");
var parser = peg.generate(""+fs.readFileSync("peg.txt"));
;(async function(){
	//初始化
	//await sql.init()	
	//添加监听
	robot.groupmessage(entry)
	robot.usermessage(entry)

})();
async function entry(meta){
	console.log(meta)
	a=parser.parse(meta.message)
	console.log(">>>",a)
	switch(a.opt)
	{
		default:
		break; case "roll":
			a=await roll(a.a)
			return robot.reply(meta,a)			
	}
}
async function roll(ast){	
	err=""
	function rollast(ast)
	{
		if (err) return {}
		switch (ast.opt)
		{
			default:
				return {str:""+ast,result:ast}
			break;case "+":
				var a=rollast(ast.a);var b=rollast(ast.b)				
				return {str:a.str+"+"+b.str,result:a.result+b.result}
			break;case "-":
				var a=rollast(ast.a);var b=rollast(ast.b)				
				return {str:a.str+"-"+b.str,result:a.result-b.result}
			break;case "*":
				var a=rollast(ast.a);var b=rollast(ast.b)				
				return {str:a.str+"*"+b.str,result:a.result*b.result}
			break;case "brackets":
				a=rollast(ast.a);
				return {str:"("+a.str+")",result:a.result}
			break;case "D":
				var arr=new Array(ast.a).join(",").split(",").map(t=>Math.floor(1+Math.random()*ast.b) )				
				if (arr.length<4)
					s=arr.join("+")
				else
					s=arr[0]+"+"+arr[1]+"+...+"+arr[arr.length-1]
				if (arr.length>1) s="("+s+")"
		return {str:s,result:arr.reduce((tot,t)=>tot+t) }
		}
	}
	var json=rollast(ast)
	if (err) return err
	if (json.str==json.result) return json.str
	return json.str+"="+json.result	
}