const uuid = require('node-uuid');
const logger = require('./lib/log4')
const WebSocket = require('ws');

let WebSocketServer = WebSocket.Server
let wss

try {
  wss = new WebSocketServer({ port: 8282});
  logger.trace('[trace] WebSocket Server System Run.');
} catch (error) {
  logger.error('[error] WebSocket Server error.');
}


let clients = [];

wss.on('connection', function(ws, req){
 
  let client_uid = uuid.v4();//分配用户端uid
  let client_ip = req.connection.remoteAddress;//获取连接用户端的IP

  clients.push({
    id: client_uid, 
    ws: ws, 
    username: '', 
    ip: client_ip
  });

  logger.info(`[info] client id: ${client_uid} . ip: ${client_ip} . connection`)
  // wsSend('user_join', client_uid, client_anonymity, sendMessage);//发送信息

  ws.on('message', function(message){
    let row, data={}
    try {
      row = JSON.parse(message);
      logger.info(`[info] client id: ${client_uid} . ip: ${client_ip} . message success: ${message}`)
    
      //收到改名信息（第一次进房）
      if(row.type === 'client_join'){
        for(let i in clients){
          if(clients[i].id === client_uid){
            clients[i].username = row.username;
          }
        }
      }
      data = {
        id: row.id,
        username: row.username,
        message: row.message,
        type: row.type,
      }
      //广播信息
      wsSend(data);

    } catch (error) {
      logger.error(`[error] client id: ${client_uid} . ip: ${client_ip} . message error: ${error}`)
    }

  });

  //客户端断开socket连接
  ws.on('close', function(){
    let client_name = '';

    for(let i in clients){
      if(clients[i].id === client_uid){
        client_name = clients[i].username;
        clients.splice(i, 1);
      }
    }

    let data = {
      id: client_uid,
      username: client_name,
      message: `${client_name} 退出房间`,
      type: 'client_quite',
    }
    //广播信息
    wsSend(data);
    logger.info(`[info] client id: ${client_uid} . ip: ${client_ip} . connection close`)

  });
  ws.on('error', function(e){
    logger.error(`[error] websocket error: ${e}`)
  })
  
})

//发送函数
function wsSend(data){
  for(let i = 0; i < clients.length; i++)
  {
    let clientSocket = clients[i].ws;
    if(clientSocket.readyState === WebSocket.OPEN){
      clientSocket.send(JSON.stringify({
        ...data,
        time: new Date().format('yyyy-MM-dd hh:mm:ss')
      }));
    }
  }
}

// 日期格式化
Date.prototype.format = function(fmt) {
  var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
  return fmt;
};