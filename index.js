var login = require("facebook-chat-api");
 
var answeredThreads = {};

// Create simple echo bot
login({email: "mhthang94@gmail.com", password: "taowenrui1993"}, function callback (err, api) {
	
	api.setOptions({
			forceLogin: true
			});
    if(err) {
		console.error(err);
	}
	

    api.listen(function callback(err, message) {
        console.log(message.threadID);
        if(!answeredThreads.hasOwnProperty(message.threadID)){
            answeredThreads[message.threadID] = true;
            api.sendMessage("BOT - Hiện tại mình đang đi ra ngoài, mình sẽ trả lời bạn ngay khi tới nhà,", message.threadID);
        }
    });
});

var express = require("express");
var app = express();
app.listen(3000);
app.set("view engine", "ejs");
app.set("views", "./views");
var request = require("request");
var cheerio = require("cheerio");
app.get("/",function(req,res){
	request("https://www.thegioididong.com",function(error,response,body){
		if(error){
				console.log(error);
		}else{
			$ = cheerio.load(body);
			var ds = $(body).find("ul.homeproduct li a strong");
			res.render("trangchu",{html:ds});
		}
	});
	
});
