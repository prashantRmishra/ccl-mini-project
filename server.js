var app = require('express')();
var http = require('http').Server(app);
var io= require('socket.io')(http);
var fs=require('fs');
// var date_time=require('node-datetime');
// var dt=date_time.create();
// console.log(dt);

 var date = new Date();
// var current_hour = date.getHours();
// console.log(date);
// var a=date.getTime();
// var b=date.getMinutes();
// console.log(b);
var date_time='DATE > '+date.getDate()+'/'+date.getDay()+'/'+date.getFullYear()+', TIME > '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
//console.log(date_time);
var collab_code="\n//////COLLABORATION////// CREATED ON:"+date_time+"\n";
var chat_data="\n//////CHAT/////// CREATED ON:"+date_time+"\n";
app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});
var temp="";

io.on('connection',function(socket){
	
	console.log('a new connection id: '+socket.id);
	io.emit('temp',temp);
	
	//io.emit('new', socket.id);
	socket.on('chat message',function(data){
		console.log(data);
	
	// 	fs.appendFile('Output.txt', chat_data, (err) => { 
      
	// 		// In case of a error throw err. 
	// 		if (err) throw err; 
	// }); 
		fs.appendFile('Output.txt',chat_data+""+data, (err) => { 
      
			// In case of a error throw err. 
			if (err) throw err; 
	}); 
		io.emit('chat message', data);
		});
		socket.on('code',function(code){
			console.log(code);
		
			io.emit('code',code);
			temp=code;
		});
		//////////////////////////////
		socket.on('saveToFile',function(collab){
		
		// 	fs.appendFile('Output.txt', collab_code, (err) => { 
      
		// 		// In case of a error throw err. 
		// 		if (err) throw err; 
		// }); 
			fs.appendFile('Output.txt',collab_code+""+collab, (err) => { 
      
				// In case of a error throw err. 
				if (err) throw err; 
				fs.readFile('output.txt', function(err,data){
					if(err){
						throw err;
					}
					console.log('hi this is'+data);
					socket.emit('file',data);
		
				});
		}); 
	
         
		});
		
	socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000,'0.0.0.0', function(){
  console.log('listening on *:3000');
});