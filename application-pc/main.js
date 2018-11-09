$(document).ready(function(){
	
	$('.additional li.item input').focus(function(){
		if(!$(this).hasClass('focus')){
			$(this).parent('li').addClass('focus');
		}
	})
	$('.additional li.item input').blur(function(){
		if($(this).val() == ""){
			$(this).parent('li').addClass('error');
		}else{
		    if ($(this).val().match(RegRules[$(this).attr("reg")]) != null) {
	            $(this).parent('li').removeClass('error');
	        } else {
	            $(this).parent('li').addClass('error');
	        }
			
		}
	})
	$('.dropdown').click(function(e){
		$(this).find('ul.dropdown-menu').show();
		e.stopPropagation();
		$(document).click(function(){
			$(this).find('ul.dropdown-menu').hide();
		})
	})
	$('.country .file').click(function(e){
		$('.country .list').show();
		e.stopPropagation();
		$(document).click(function(){
			$('.country .list').hide();
		})
	})
	
	$('.country .list p').click(function(){
		$('.country input[type="hidden"]').val($(this).find('.float-left').attr('value'));
		$('.country input[type="text"]').val($(this).find('.float-left').text());
		$('.country b').text($(this).find('.float-right').text());
	})
 	
 	//正则规则
	var RegRules = {
	    nomarl: /^[\w\u4e00-\u9fa5]{1,10}/g,
	    email: /^[a-z0-9]+@([a-z0-9]+\.)+[a-z]{1,4}$/i,
	    code: /^[1-9]{1}[0-9]{4}$/,
	    phone: /^1[3,5,6,7,8,9]\d{9}$/,
	    password: /^\w{6,16}$/,
	    money: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
	    number: /^[0-9-.]{1,16}$/,
	    wechat: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
	    enNomarl: /^[a-zA-Z ]{1,300}$/g,
	
	}
	
	function tooltip(content){
		if(content == ''){
			return false;
		}
		var str='<div class="tooltip"><img src="images/danger.png"/><span>'+content+'</span></div>';
		$('body').append(str);
		
		setTimeout(function(){
			$('.tooltip').remove();
		},4000)
	}

})
