
	var cwidth=window.innerWidth;
	var cheight=window.innerHeight;
	console.log(cwidth);
	var canvas = document.getElementById('canvas');
	
	var context = canvas.getContext('2d');
	
	canvas.width=cwidth;
	canvas.height=cheight;
	console.log(canvas.width);
	var image = new Image();
	var radius = 50;
	var clipping ={x:-1,y:-1,r:radius};
	var leftmargin = 0;
	var topmargin = 0;
	image.src = 'img/bg.jpg';
	image.onload=function(e){
//		console.log(1);
		//让外框大小等于屏幕大小
		$('#blur').css('width',cwidth+'px');
		$('#blur').css('height',cheight+'px');
		//让生成的图片大小等于图片大小
		$('#blur-image').css('width',image.width+'px');
		$('#blur-image').css('height',image.height+'px');
		//图片大于canvas，改变图片的起始位置  获取图片中间部分
		leftmargin = (image.width-canvas.width)/2;
		topmargin = (image.height-canvas.height)/2;
		
		$('#blur-image').css('left','-'+leftmargin+'px');
		$('#blur-image').css('top','-'+topmargin+'px');
		initCanvas();
	}
	
	function initCanvas(){
		clipping ={x:Math.random()*(canvas.width-2*radius)+radius,y:Math.random()*(canvas.height-2*radius)+radius,r:radius};
		draw(image,clipping);
	}
	function setClippingRegion(clipping){
		context.beginPath();
		context.arc(clipping.x,clipping.y,clipping.r, 0, Math.PI*2, false);
		context.clip();
		
	} 
	function draw(image,clipping){
		context.clearRect(0,0,canvas.width,canvas.height);
		context.save();
		setClippingRegion(clipping);
		//让image的原坐标位置改变到目标坐标参数   canvas的 0 0位置
		context.drawImage(image,leftmargin,topmargin,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
		context.restore();
	}
	
	var reset = document.getElementById('reset-button');
	reset.onclick=function(){
		initCanvas();
		
		
	};
	var show = document.getElementById('show-button');
	
	show.onclick=function(){
//		alert(1);
		
		var timer = setInterval(function(){
			clipping.r+=20;
			if(clipping.r >2*Math.max(canvas.width,canvas.height)){
				clearInterval(timer);
			}
			draw(image,clipping);
			
		},30);
		
		
	};
	
	
	
	
	

	
	
	
	
	
	
	
	

