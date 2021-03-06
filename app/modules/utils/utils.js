/*
* 公共组件
* @param ajaxURLArray { Object }   ### 接口请求记录  
* @param Cookies { function }   ### cookie 存取
* @param DateFormat { function } ### 日期格式化
* @param longTime { function } ### 日期距今天的时间
* @param Utils { Function } ### 请求格式
* @param compare { function } ### 对id进行排序
* @Author Hollis 2017-11-18 
**/
(function(win){
	var ajaxURLArray = {};    // ajax接口请求记录
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	// 异常
	function error () {
		layer.msg('系统繁忙，请稍后重试！');
	}

	// 清除缓存重新登录
	function jumpLogin () {
		localStorage.clear();
		location.reload();
	}


	var Cookies = {
		set: function(name, value) {
			var argv = arguments;
			var argc = arguments.length;
			var expires = (argc > 2) ? argv[2] : null;
			var path = (argc > 3) ? argv[3] : '/';
			var domain = (argc > 4) ? argv[4] : null;
			var secure = (argc > 5) ? argv[5] : false;
			document.cookie = name + "=" + escape(value) +
				((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
				((path == null) ? "" : ("; path=" + path)) +
				((domain == null) ? "" : ("; domain=" + domain)) +
				((secure == true) ? "; secure" : "");
		},
		get: function(name) {
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			var j = 0;
			while (i < clen) {
				j = i + alen;
				if (document.cookie.substring(i, j) == arg)
					return Cookies.getCookieVal(j);
				i = document.cookie.indexOf(" ", i) + 1;
				if (i == 0)
					break;
			}
			return null;
		},
		clear: function(name) {
			if (Cookies.get(name)) {
				document.cookie = name + "=" +
					"; expires=Thu, 01-Jan-70 00:00:01 GMT";
			}
		},
		getCookieVal: function(offset) {
			var endstr = document.cookie.indexOf(";", offset);
			if (endstr == -1) {
				endstr = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, endstr));
		}
	};

	var longTime = {
		howLong(num) {
			// 秒  分 ， 时 ， 天 ， 月 ， 年 
			return num < 60 ? (num + "秒前") : 
			num < 3600 ? (parseInt(num/60) + "分钟前") : 
			num < 86400 ? (parseInt(num/3600) + "小时前") : 
			num < 2592000 ? (parseInt(num/86400) + "天前") :
			num < 31104000 ? (parseInt(num/2592000) + "个月前") :
			num >= 31104000 ? (parseInt(num/31104000) + "年前") :
			"";
		},

		getThisTime(date){
			var today = Date.parse(new Date())/1000;
			var time = Date.parse(new Date(date))/1000;
			var long = this.howLong(today - time);
			return long;
		}
	}

	var DateFormat = {
		formatTen(num) {
			return num > 9 ? (num + "") : ("0" + num);
		},

		formatDate(date) {
			if(date){
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var second = date.getSeconds();
				return year + "-" + this.formatTen(month) + "-" + this.formatTen(day)+" "+this.formatTen(hour)+":"+this.formatTen(minute)+":"+this.formatTen(second);
			}else {
				return null;
			}
		},

		formatTime(format, value) {
			var o = {
				"M+": value.getMonth() + 1,
				"d+": value.getDate(),
				"h+": value.getHours(),
				"m+": value.getMinutes(),
				"s+": value.getSeconds(),
				"q+": Math.floor((value.getMonth() + 3) / 3),
				"S": value.getMilliseconds()
			}
			if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1,
						RegExp.$1.length == 1 ? o[k] :
						("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format;
		}
	};


	var Utils = {
		trims(data) {
			for(var item in data){
				data[item] = data[item].replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
			}
	    	return data;
		},
		transfer(arry) {
			arry.forEach(function(element) {
				element["label"] = element["text"];
				delete element.text;
				element["value"] = element["id"];
				element["key"] = element["id"];
				delete element.id;
				if (element.children) {
					this.transfer(element.children)
				}
			}, this);
		},
		number:function(num){
           var num = String(num).replace(/\$|\,/g,'');
             if(isNaN(num))
            num = "0";
            var sign = (num == (num = Math.abs(num)));
            num = Math.floor(num*100+0.50000000001);
            var cents = num%100;
		    num = Math.floor(num/100).toString();
		    if(cents<10)
		    cents = "0" + cents;
		    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		    num = num.substring(0,num.length-(4*i+3))+','+
		    num.substring(num.length-(4*i+3));
		    return (((sign)?'':'-') + num + '.' + cents);
		},
		formatDate: function(value) {
			if (!value) {
				return '';
			}
			let date = new Date(value);
			let year = date.getFullYear();
			let month = (date.getMonth() + 1 > 9) ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
			let day = (date.getDate() > 9) ? (date.getDate()) : '0' + (date.getDate());
			return year + "-" + month + "-" + day;

		},
        
		getData: function(obj) {
			$.ajax({
				url: obj.url,
				contentType: 'application/json;charset=UTF-8',
				method: 'get',
				data: obj.data,
				headers: {
					Token: localStorage.Token || null
				},
				type: 'json',
				success: function(result) {
					if (result.code == 200 || result.code == 400) {
						obj.callback(result);
					} else {
						Modal.error({
							title: result.msg,
							onOk: () => {
								if (result.code == "800") {
									jumpLogin();
								}
							}
						});
					}

				},
				error: function(result) {
					error();
				}
			});
		},
		sendForm: function(obj) {
			$.ajax({
				url: obj.url,
				method: obj.method || 'post',
				data: obj.data,
				headers: {
					Token: localStorage.Token || null
				},
				processData: false,
				contentType: false,
				success: function(result) {
					if (result.code == 200 || result.code == 400) {
						obj.callback(result);
					} else {
						Modal.error({
							title: result.msg,
							onOk: () => {
								if (result.code == "800") {
									jumpLogin();
								}
							}
						});
					}
				},
				error: function(err) {
					error();
				}
			});
		},
		//发送请求
		sendAjax: function(obj) {
			$.ajax({
				url: obj.url,
				contentType: obj.contentType || 'application/json;charset=UTF-8',
				method: obj.method || 'post',
				data: obj.data,
				type: 'json',
				success: function(result) {
					if (result.code == 200 || result.code == 400) {
						obj.callback(result);
					} else {
						Modal.error({
							title: result.msg,
							onOk: () => {
								if (result.code == "800") {
									jumpLogin();
								}
							}
						});
					}

				},
				error: function(err) {
					error();
				}
			});
		},
		LogOut: function(obj) {
			$.ajax({
				url: obj.url,
				contentType: obj.contentType || 'application/json;charset=UTF-8',
				method: obj.method || 'post',
				data: obj.data,
				type: 'json',
				success: function(result) {
					jumpLogin();
				},
				error: function(err) {
					jumpLogin();
					error();
				}
			});
		},
		ajaxData: function(obj) {

			if(!ajaxURLArray[obj.url]){
				$.ajax({
				headers: obj.headers,	
				url: obj.url,
				method: obj.method || 'post',
				data: this.trims(obj.data),
				dataType: obj.dataType || '',
				beforeSend: function() {
					document.getElementById("loading-box").style.display= 'block';
					ajaxURLArray[obj.url] = 1;
				},
				complete: function() {
					document.getElementById("loading-box").style.display= 'none';
					ajaxURLArray[obj.url] = 0;
				},
				success: function(result) {
					if (typeof result == 'string' && /<!DOCTYPE html>/.test(result)) {
							layer.msg(result.msg,2000);
							jumpLogin();
					}
					else if (result.code == 200 || result.code == 400 || result) {
						obj.callback(result);
					} else {

						console.log(123);
					}

				},
				error: function(err) {
					error();
				}
				});
			}

			
		},
		//本地存储 key,val
		localSaveJsonStorage: function(key, val) {
			var data = {
				val: val
			};
			var str = JSON.stringify(data);
			localStorage.setItem(key, str);
		},

		//提取本地存储数据
		localLoadJsonStorage: function(key) {
			var str = localStorage.getItem(key);
			var data = JSON.parse(str);
			return data.val;
		},
		// 封装弹框函数
		openNotification: function(option) {
			Notification[option.type]({
				message: option.message,
				btn: option.btn,
				duration: option.duration || 2,
				description: option.description,
			});
		}

	};

    // id排序
    var compare = function(obj1, obj2) {
        var val1 = obj1.id;
        var val2 = obj2.id;
	    if (val1 > val2) {
	        return -1;
	    } else if (val1 < val2) {
	        return 1;
	    } else {
	        return 0;
	    } 
    }

    // 数组去重
    
	win.compare = compare;
	win.Utils = Utils;
	win.Cookies = Cookies;
	win.baseURL = baseURL;
	win.ajaxURLArray = ajaxURLArray;
	win.DateFormat = DateFormat;
	win.longTime = longTime;




})(window);

