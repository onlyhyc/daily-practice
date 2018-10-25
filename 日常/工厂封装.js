(function(window){
	function functionName(obj){
		return new functionName.prototype.init(obj);
	}
	functionName.prototype = {
		constructor:functionName,
		init:function(obj){
	}
		functionName.prototype.init.prototype = functionName.prototype;
		window.functionName = functionName;
	}
})(window)
