const { App } = require('koishi')

const app = new App({  
  type: 'ws',
  server: 'http://home.wywzxxz.com:15799',//'http://192.168.0.50:5700',
})
exports.app=app
app.start().then(async t=>{
	console.log("coolq server started")	
})
exports.reply=function(meta,msg)
{			
	if (meta.messageType=="private")
		return app.sender.sendPrivateMsg(meta.userId, msg)
	else  if (meta.messageType=="group")
		return app.sender.sendGroupMsg(meta.groupId,msg)
}
exports.usermessage=function (entry,who){
	if (who)
		app.user(who).receiver.on('message',entry)
	else
		app.users.receiver.on('message',entry)
}
exports.groupmessage=function (entry,who){
	if (who)
		app.group(who).receiver.on('message',entry)
	else
		app.groups.receiver.on('message',entry)
}