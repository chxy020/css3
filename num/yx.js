/**
 * file:游戏测试
 * author:chenxy
 * date:2015-06-08
*/

var NumGame = function (obj){
	this.init.apply(this,arguments);
};

NumGame.prototype = {
	constructor:NumGame,
	time:1000,
	game:null,
	maxTop:0,
	delay:50,
	isStop:false,
	fn:null,
	fnScope:this,
	init: function(){
	},
	pageLoad:function(){
	},
	start:function(obj){
		this.game = $("#" + obj.id);
		this.maxTop = obj.maxTop || -600;
		this.delay = obj.delay || 50;
		this.scrollTop();
	},
	stop:function(obj){
		if(!this.isStop){
			this.isStop = true;
			obj = obj || {};
			this.fn = obj.callback || null;
			this.fnScope = obj.scope || this;
		}
		else{
			var t = this;
			this.game.animate({"margin-top":this.maxTop + "px"},1000,"ease-out",function(){
				if(typeof t.fn === "function"){
					t.fn.apply(t.fnScope,[]);
				}
			});
		}
	},
	callback:function(){
		 var t = this;
		setTimeout(function(){
			t.scrollTop();
		},this.delay);
	},
	scrollTop:function(){
		var ht = parseInt(this.game.css("margin-top"));
		var top = -((this.time * this.time) / 1000000 * 10) + ht;
		if(top < this.maxTop){
			top = top % this.maxTop;
		}
		else{
			this.time = this.time + 1000;
		}
		this.game.css({"margin-top": top + "px"});
		//$("#machine .a").animate({"margin-top":top+ "px"},100);
		if(!this.isStop){
			this.callback();
		}
		else{
			this.stop();
		}
	}
};

//页面初始化
/*$(function(){
	var game1 = new NumGame({});
	game1.start({
		id:"game1",
		maxTop:-130,
		delay:50
	});

	var game2 = new NumGame({});
	game2.start({
		id:"game2",
		maxTop:-130,
		delay:55
	});

	var game3 = new NumGame({});
	game3.start({
		id:"game3",
		maxTop:-130,
		delay:60
	});

	setTimeout(function(){
		game1.stop();
	},2000);

	setTimeout(function(){
		game2.stop();
	},3000);

	function test(){
		this.a = 1;
		var t = this;
		setTimeout(function(){
			game3.stop({
				callback:t.callback,
				scope:t
			});
		},4000);

		this.callback = function(){
			console.log(this.a);
		}
	}
	test();
});*/



