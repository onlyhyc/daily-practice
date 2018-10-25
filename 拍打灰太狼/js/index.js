$(function(){
	$('.rules').click(function(){
		$('.rule').stop().fadeIn(100);
	});
	$('.close').click(function(){
		$('.rule').stop().fadeOut(100);
	});
	
	$('.start').click(function(){
		$(this).stop().fadeOut(100);
		progressHandler();
		StartwolfAnimation();
	});
	$('.reStart').click(function(){
		$('.mask').stop().fadeOut(100);
		progressHandler();
		StartwolfAnimation();
	});
	
	function progressHandler(){
		$('.progress').css({
			width:180
		})
		var timer = setInterval(function(){
			var progressWidth = $('.progress').width();
			progressWidth-=1;
			$('.progress').css({
				width:progressWidth
			})
			if(progressWidth <= 0){
				clearInterval(timer);
				$('.mask').stop().fadeIn(100);
				stopWolfAnimation();
			}
		},100);
	}
	
	var wolfTimer;
	function StartwolfAnimation(){
		var wolf_1 = ['./img/h0.png','./img/h1.png','./img/h2.png',
					  './img/h3.png','./img/h4.png','./img/h5.png','./img/h6.png',
					  './img/h7.png','./img/h8.png','./img/h9.png']
		var wolf_2 = ['./img/x0.png','./img/x1.png','./img/x2.png',
					  './img/x3.png','./img/x4.png','./img/x5.png','./img/x6.png',
					  './img/x7.png','./img/x8.png','./img/x9.png']
		var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        			 ];
        var $wolfImage = $("<img src=''class='wolfImage'>");
        var posIndex = Math.round(Math.random()*8);
        	 $wolfImage.css({
        		position:'absolute',
	        	left:arrPos[posIndex].left,
	        	top:arrPos[posIndex].top
       		});
        var wolfType = Math.round(Math.random())== 0 ? wolf_1 : wolf_2;
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function(){
        	if(wolfIndex > wolfIndexEnd){
        		$wolfImage.remove();
        		clearInterval(wolfTimer);
        		StartwolfAnimation();
        	}
        	$wolfImage.attr('src',wolfType[wolfIndex]);
        	wolfIndex++;
        },200);
        $('.container').append($wolfImage);
        
        gameRules($wolfImage);
	}
		
	function gameRules($wolfImage) {
        $wolfImage.one("click",function () {
        	
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            var $src = $(this).attr("src");
            var flag = $src.indexOf("h") >= 0;
            if(flag){
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }
	
	function stopWolfAnimation(){
		$('.wolfImage').remove();
		clearInterval(wolfTimer);
	}
});