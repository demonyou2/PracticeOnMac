(function (){
	var log = console.log.bind(console);
var $ = function(selector,node){
	return (node || document).querySelector(selector);
}
//
var moveN = null;
var startX = 0;
var startY = 0;
var ismove = null;
var count = 0;
//
function Note(options){
	this.ndiv = document.createElement('div');
	this.ndiv.className = "m-note";
	var content = `
		<img src="deleteBnt.png" alt="close" class="g-close">
		<div class="g-write" contenteditable="true"></div>
		<div class="g-footer"><span class="time">2017-9-6 11:02</span></div>
	`;
	this.ndiv.innerHTML = content;
	this.ndiv.style.left = options.x + 'px';
	this.ndiv.style.top = options.y + 'px';
	this.ndiv.style.zIndex = options.index;
	//时间函数；
	var date = new Date();
	function padd (num){
		return num < 10 ? '0' + num : num;
	}
	function formate (date){
		return date.getFullYear() + '-' + padd(date.getMonth() + 1) + '-' + padd(date.getDate()) + ' ' + padd(date.getHours()) + ':' + padd(date.getMinutes()) + ':' + padd(date.getSeconds());
	}
	//
	this.Time = $('.time',this.ndiv);
	this.Time.innerHTML = formate(date);
	// this.ndiv = ndiv;
	document.body.appendChild(this.ndiv);
	this.addEvent();
}

// Note.prototype ={
// 	construct : Note,
// 	moused : function(){
// 		document.querySelector('.g-close').addEventListener('click',function(event){
// 			log("close");
// 		})
// 	}
// }

// Note.prototype.close = function(event){
// 		document.querySelector('.g-close').addEventListener('click',function(event){
// 			log("close");
// 		})
// }

Note.prototype.close = function(event){
	document.body.removeChild(this.ndiv);
}

Note.prototype.mouseDown = function(event){
	moveN = this.ndiv;
	startX = event.clientX - parseInt(moveN.style.left);
	startY = event.clientY - parseInt(moveN.style.top);
	ismove = true;
	moveN.style.zIndex = ++count;
}

Note.prototype.mouseUp = function(event){
	 ismove = false;
}

Note.prototype.addEvent = function(){
	//this.close.bind()
	$('.g-close',this.ndiv).addEventListener('click',this.close.bind(this));
	//
	this.ndiv.addEventListener('mousedown',this.mouseDown.bind(this));
	// this.ndiv.addEventListener('mousedown',function(event){
	// 	moveN = this;
	// 	startX = event.clientX - parseInt(moveN.style.left);
	// 	startY = event.clientY - parseInt(moveN.style.top);
	// 	ismove = true;
	// 	moveN.style.zIndex = ++count;
	// });
	this.ndiv.addEventListener('mouseup',this.mouseUp);
}


document.addEventListener('DOMContentLoaded',function(event){
	$('.m-bnt').addEventListener('click',function(event){
		new Note({
			x : Math.round(Math.random() * 100),
			y : Math.round(Math.random() * 100),
			index : count++
		});
	});

	//之前写成了mouseover！！！所以有卡顿！！
	document.addEventListener('mousemove',function(event){
		if(moveN && ismove){
		moveN.style.left = event.clientX - startX + 'px';
		moveN.style.top	= event.clientY - startY + 'px';
		}
	});
})


})()

