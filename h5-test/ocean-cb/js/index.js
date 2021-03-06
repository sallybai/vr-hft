// javascript document







// javascript document
var sensor = {};

//重力感应
sensor.gravity = (function() {
	//灵敏度：私有，默认原始档
 	var _s_array = {
 		prim:1,
 		high:2,
 		mid:5,
 		low:10
 	};
 	var _s = _s_array.prim;

 	//检测手机绕x y z旋转距离原始位置的范围：私有，默认45°
 	var _range = 180;

 	//实时旋转角度
 	var _X = 0,_Y = 0,_Z = 0;
 	var _listerFunc;
 	var _isOpen = false;

 	//开启监听重力感
 	var startgravity = function(changeFunc){
 		/*var isInit = false;
 		var sourceX = 0 ,sourceY = 0, sourceZ = 0;*/
 		if (window.DeviceOrientationEvent) {//判断是否支持重力感应事件
 			if(!_isOpen){
 				_isOpen = true;
	 			window.addEventListener('deviceorientation', _listerFunc = function(event) {
	 				//记录初始值
	 				/*if(!isInit){
	 					sourceX = event.beta;
	 					sourceY = event.gamma;
	 					sourceZ = event.alpha;
	 					isInit = true;
	 				}*/
	 				if(Math.abs(event.beta)<_range){
	 					_X = Math.round(event.beta);
	 				}
	 				if(Math.abs(event.gamma)<_range){
	 					_Y = Math.round(event.gamma);
	 				}
					// if(Math.abs(event.alpha)<_range){
	 				// 	_Z = Math.round(event.alpha);
	 				// }
	 				
	 				// 处理成右旋转正值，左旋转负值
	 				var tempZ = (event.alpha > 180)?(event.alpha -360):event.alpha;
	 				if(Math.abs(tempZ) <_range){
	       				_Z = Math.round(tempZ);
	 				}
	 				changeFunc(_X,_Y,_Z,_range);
	 			});
 			}
 		}
 		else{
 			return false;
 		}
 	}

 	//关闭监听重力感
 	var stopgravity = function(){
 		if(_isOpen){
	 		window.removeEventListener('deviceorientation',_listerFunc);
	 	}
 	}
	return {
		startgravity:startgravity,
		stopgravity:stopgravity
	};
})();


	function $id(name){
		return document.getElementById(name);
	}
	

	//重力感应
	var makeupMove = function (){
		var transR_max = 2000,transH_max = 250;
		var transX_max = 0,transY_max = 0,transZ_max = 0,transX_min = 0,transY_min = 0,transZ_min = 0;
		sensor.gravity.startgravity(function (x,y,z,range) {
			if (y < 0){
				positionX= (z - 180) * (transR_max / range);
				positionY= - ( y + 90 ) * (transH_max / range);
			}
			else {
				positionX= z * (transR_max / range);
				positionY= - ( y - 90 ) * (transH_max / range);
			}
			positionXR= positionX - 0;
		//$id("bg-l").style.cssText = "background-position:" + Math.round(positionX) + "px " + "0;" + "margin-top:" + Math.round(positionY) + "px";
		//$id("bg-r").style.cssText = "background-position:" + Math.round(positionXR) + "px " + "0;" + "margin-top:" + Math.round(positionY) + "px";
		$id("bg-l").style.cssText = "background-position:" + Math.round(positionX) + "px " + "0;" + "margin-top:" + Math.round(positionY) + "px";
		$id("bg-r").style.cssText = "background-position:" + Math.round(positionXR) + "px " + "0;" + "margin-top:" + Math.round(positionY) + "px";
			});
	}

	makeupMove();