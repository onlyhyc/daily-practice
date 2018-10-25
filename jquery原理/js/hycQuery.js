(function(window,undefined){
	var hycQuery = function(selector){
		return new hycQuery.prototype.init(selector);
	}
	hycQuery.prototype = {
			constructor:hycQuery,
			init:function(selector){
				selector = hycQuery.trim(selector);
				if(!selector){
					return this;
				}
				else if(hycQuery.isFunction(selector)){
					hycQuery.ready(selector);
				}
				else if(hycQuery.isString(selector)){
					if(hycQuery.isHtml(selector)){
						var temp = document.createElement("div");
						temp.innerHTML = selector;
						[].push.apply(this,temp.children);
//						for(var i = 0 ; i < temp.children.length ; i++){
//							this[i] = temp.children[i];
//						}
//						this.length = temp.children.length;
					}
					else{
						var res = document.querySelectorAll(selector);
						[].push.apply(this,res);
					}
				}
				else if (hycQuery.isArray(selector)) {
						var arr = [].slice.call(selector);
						[].push.apply(this,selector);
				}
				else{
					this[0] = selector;
					this.length = 1;
				}
				return this;
			},
			jquery:"1.0.0",
			selector:"",
			length:0,
			push:[].push,
			sort:[].sort,
			splice:[].splice,
			toArray:function(){
				return [].slice.call(this);
			},
			get:function(num){
				if(arguments.length === 0){
					return this.toArray();
				}else if(num>=0){
					return this[num];
				}else{
					return this[this.length + num];
				}
			},
			eq:function(num){
				if(arguments.length === 0){
					return new hycQuery;
				}else {
					return hycQuery(this.get(num));
				}
			},
			first:function(){
				return this.eq(0);
			},
			last:function(){
				return this.eq(-1);
			},
			each:function(fn){
				 return hycQuery.each(this,fn);
			}
	}
	hycQuery.extend = hycQuery.prototype.extend= function(obj){
		for(var key in obj){
			this[key] = obj[key];
		}
	}
	hycQuery.extend({
	isString : function(str){
		 	return typeof str === "string";
	},
	isHtml : function(str){
		return str.charAt(0)=="<" && str.charAt(str.length-1)==">" && str.length>=3;
	},
	trim : function(str){
		if(!hycQuery.isString(str)){
			return str;
		}
		if(str.trim){
			return str.trim();
		}else{
			return str.replace(/^\s+|\s+$/g, "");
		}
	},
	isObject : function(sele){
		return typeof sele === "object";
	},
	isWindow : function(sele){
		return sele === window;
	},
	isArray : function(sele){
		if (hycQuery.isObject(sele) &&
		!hycQuery.isWindow(sele) && "length" in sele) {
			return true;
		} else{
			return false;
		}
	},
	isFunction : function(sele){
		return typeof sele === "function";
	},
	ready : function(fn){
		if(document.readyState == "complete"){
			fn();
		}else if(document.addEventListener){
			document.addEventListener("DOMContentLoaded",function(){
				fn();
			})
		}else{
			document.attachEvent("onreadystatechange", function () {
                    if(document.readyState == "complete"){
                       fn();
					}
				});
			}
		},
	each:function(obj,fn){
		if(hycQuery.isArray(obj)){
			for(var i=0;i<obj.length;i++){
				var res = fn.call(obj[i],i,obj[i]);
				if(res===true){
					continue;
				}else if(res===false){
					break;
				}
				}
			}
		else if(hycQuery.isObject(obj)){
			for(var key in obj){
				var res = fn.call(obj[key],key,obj[key]);
				if(res===true){
					continue;
				}else if(res===false){
					break;
				}
			}
		}
		return obj;
	},
	map:function(obj,fn){
		var res = [];
		if(hycQuery.isArray(obj)){
			for(i=0;i<obj.length;i++){
				var temp = fn(obj[i],i);
				if(temp){
					res.push(temp);
				}
			}
		}
		else if(hycQuery.isObject(obj)){
			for(var key in obj){
				var temp = fn(obj[key],key);
				if(temp){
					res.push(temp);
				}
			}
		}
		return res;
	}
	});
	hycQuery.prototype.extend({
		empty:function(){
			this.each(function(key,value){
				value.innerHTML = "";
			});
			return this;
		},
		remove: function (sele) {
            if(arguments.length === 0){
                // 1.遍历指定的元素
                this.each(function (key, value) {
                    // 根据遍历到的元素找到对应的父元素
                    var parent = value.parentNode;
                    // 通过父元素删除指定的元素
                    parent.removeChild(value);
                });
            }else{
                var $this = this;
                // 1.根据传入的选择器找到对应的元素
                $(sele).each(function (key, value) {
                    // 2.遍历找到的元素, 获取对应的类型
                    var type = value.tagName;
                    // 3.遍历指定的元素
                    $this.each(function (k, v) {
                        // 4.获取指定元素的类型
                        var t = v.tagName;
                        // 5.判断找到元素的类型和指定元素的类型
                        if(t === type){
                            // 根据遍历到的元素找到对应的父元素
                            var parent = value.parentNode;
                            // 通过父元素删除指定的元素
                            parent.removeChild(value);
                        }
                    });
                })
            }
            return this;
        },
        html:function(content){
        	if(arguments.length === 0){
        		return this[0].innerHTML;
        	}else{
        		this.each(function(key,value){
        			value.innerHTML = content;
        		});
        	}
        },
        text:function(content){
        	if(arguments.length === 0){
        		var res = "";
        		this.each(function(key,value){
					res += value.innerText;        			
        		});
        		return res;
        	}else{
        		this.each(function(key,value){
        			value.innerText = content;
        		});
        	}
        },
        appendTo:function(sele){
        	var $target = $(sele);
        	var $this = this;
        	var res = [];
        	$.each($target,function(key,value){
        		$this.each(function(k,v){
        			if(key === 0){
        				value.appendChild(v);
        				res.push(v);
        			}else{
        			var temp = v.cloneNode(true);
        				value.appendChild(temp);
        				res.push(temp);
        			}
        		});
        	});
        	return $(res);
        },
        prependTo:function(sele){
        	var $target = $(sele);
        	var $this = this;
        	var res = [];
        	$.each($target,function(key,value){
        		$this.each(function(k,v){
        			if(key === 0){
        				value.insertBefore(v,value.firstChild);
        				res.push(v);
        			}else{
        			var temp = v.cloneNode(true);
        				value.insertBefore(temp,value.firstChild);
        				res.push(temp);
        			}
        		});
        	});
        	return $(res);
        },
        append:function(sele){
        	if(hycQuery.isString(sele)){
        		tihs[0].innerHTML += sele;
        	}
        	else{
        		$(sele).appendTo(this);
        	}
        	return this;
        },
        prepend:function(sele){
        	if(hycQuery.isString(sele)){
        		tihs[0].innerHTML = sele + ihs[0].innerHTML ;
        	}
        	else{
        		$(sele).prependTo(this);
        	}
        	return this;
        },
        insertBefore:function(sele){
        	var $target = $(sele);
        	var $this = this;
        	var res = [];
        	$.each($target,function(key,value){
        		var parent = value.parentNode;
        		$this.each(function(k,v){
        			if(key === 0){
        				parent.insertBefore(v,value);
        				res.push(v);
        			}else{
        			var temp = v.cloneNode(true);
        				parent.insertBefore(temp,value);
        				res.push(temp);
        			}
        		});
        	});
        	return $(res);
        }
	})
	//真数组转伪数组
	//[].push.apply(obj, arr);
	//伪数组转换为真数组
	//[].slice.call(obj);
	hycQuery.prototype.init.prototype = hycQuery.prototype;
	window.hycQuery = window.$ = hycQuery;
})(window);
