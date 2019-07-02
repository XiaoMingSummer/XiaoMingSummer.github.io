window.onload =function(){
    var arr1 = ['请输入微信账号','请输入QQ账号','请输入微博账号','请输入支付宝账号'];
		var arr2 = ['请输入微信密码','请输入QQ密码','请输入微博密码','请输入支付宝密码'];
		var btn1 = document.getElementById('btn1');
		var btn2 = document.getElementById('btn2');
		var message1 = document.getElementById('message1');
		var message2 = document.getElementById('message2');
		var prompts =document.querySelectorAll('.btn');
		// 登入方式切换
		btn1.onclick = function(){
		message1.style.display='none';
		message2.style.display='block';
		}
		btn2.onclick = function(){
			message1.style.display='block';
			message2.style.display='none';
		}
		// 第三方登入提示框
		for(var i =0; i<prompts.length; i++){
			prompts[i].index=i;
			prompts[i].onclick =function(){
				prompt(arr1[this.index]);
				prompt(arr2[this.index]);
			}
		}
}


