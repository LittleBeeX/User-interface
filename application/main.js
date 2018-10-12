//错误提示简单封装

function tips(txt, type, times, opt) {
    var Time, Time1;
    if (times == 1000) {
        times = 3000
    } else if (times == 0) {
        times = 3600000;
    }
    var set = {
        txt: txt,
        type: type, //弹窗类型，warning=>警告success=>成功error=>失败loading=>加载
        loadingTxt: "LittleBee", //loading加载文字
        aotuHide: times, //自动关闭时间
        cb: function() {} //回调函数

    }

    $.extend(set, opt);
    if (set.type == "loading") {
        var txtwav = ''
        for (var i = 0; i < set.loadingTxt.length; i++) {
            txtwav += "<span>" + set.loadingTxt[i] + "</span> "
        }
        var html = '<div class="tipsbox active">' +
            '			<div class="tips-main">' +
            '				<div class="tips-in ub ub-pac ub-ver">' +
            '					<div class="m-load2">' +
            '						<div class="line">' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '						</div>' +
            '						<div class="circlebg"></div>' +
            '					</div>' +
            '				<div class="txtwav flip fz26 tx-c c-0070ba mt30">' +
            '					' + txtwav +
            '				</div>' +
            '				</div>' +
            '			</div>' +
            '		</div>';
    } else if (set.type == "loading3") {
        var txtwav = ''
        for (var i = 0; i < set.loadingTxt.length; i++) {
            txtwav += "<span>" + set.loadingTxt[i] + "</span> "
        }
        var html = '<div class="tipsbox active">' +
            '			<div class="tips-main">' +
            '				<div class="tips-in ub ub-pac ub-ver">' +
            '					<div class="m-load2">' +
            '						<div class="line">' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '							<div></div>' +
            '						</div>' +
            '						<div class="circlebg"></div>' +
            '					</div>' +
            '				<div class="txtwav flip fz26 tx-c c-0070ba mt30">' +
            '					' + txtwav +
            '				</div>' +
            '				</div>' +
            '			</div>' +
            '		</div>';
    } else if (set.type == "loading1") {

        var txtwav = ''
        for (var i = 0; i < set.loadingTxt.length; i++) {
            txtwav += "<span>" + set.loadingTxt[i] + "</span> "
        }
        var html = '<div class="tipsbox active" style="background: rgba(0, 0, 0, 0.5);">' +
            '			<div class="tips-main w100 plr30">' +
            '				<div class="txtwav flip fz32 fw-b tx-c cff">' + txtwav + '</div>' +
            '			</div>' +
            '		</div>';
    } else if(set.type == 'pie'){
    	var html = '<div class="tipsbox active">' +
            '			<div class="tips-main">' +
            '				<div class="tips-in ub ub-pac ub-ver">' +
            '					<div class="circlebg"></div>' +
			'					<div class="circleChart pie" id="pie"></div>' +
			'		    		<div class="txtwav flip fz26 tx-c c-0070ba mt30">' + set.txt + '</div>' +
			'				</div>' +
            '			</div>' +
            '		</div>';
    } else {
        var html = '<div class="tipsbox">' +
            '			<div class="tips-main">' +
            '				<div class="tips-in">' +
            '					<i class="iconfont icon-' + set.type + ' db"></i>' +
            '					<p>' + set.txt + '</p>' +
            '				</div>' +
            '			</div>' +
            '		</div>';
    }
    $("body").append(html);
    if(set.type == 'pie'){
    	$(".pie#pie").circleChart({
            size: 65,
           	color: "#0070ba",
           	value: 0.01,
           	text:'0'
        });
    }
    clearInterval(Time)
    clearInterval(Time1)

    if (set.type == 'loading') {
        Time = setTimeout(function() {
            $(".tipsbox").addClass("active").find("p").html(set.txt);
            set.cb && set.cb()
        }, 60)
        if (set.aotuHide) {
            Time1 = setTimeout(function() {
                tispAotuHide()
            }, set.aotuHide)
        }
    } else {
        Time = setTimeout(function() {
            $(".tipsbox").addClass("active").find("p").html(set.txt);
        }, 60)

        if (set.aotuHide) {
            Time1 = setTimeout(function() {
                tispAotuHide()
                set.cb && set.cb()
            }, set.aotuHide)
        }
    }
    if (set.type != 'loading' && set.type != 'pie') {
        $("body").unbind('touchstart').on("touchstart", ".tipsbox", function() {
            clearInterval(Time)
            clearInterval(Time1)
            tispAotuHide()
            if (set.type != 'loading' && set.type != 'loading3') {
                set.cb && set.cb()
            }
            return false;
        });
    } else if(set.type != 'loading' && set.type == 'pie'){
    		clearInterval(Time)
            clearInterval(Time1)
            set.cb && set.cb()
            return false;
    } else {
        $("body").unbind('touchstart').on("click", ".circlebg", function() {
            clearInterval(Time)
            clearInterval(Time1)
            tispAotuHide()
            if (set.type != 'loading' && set.type != 'loading3') {
                set.cb && set.cb()
            }
            return false;
        });
    }
    return false;
}

function tispAotuHide() {
    $("body").find(".tipsbox").removeClass("active")
    $(".tipsbox").on("transitionend", function() {
        $(this).remove();
    });
}

//字体输入效果
function txtWriter(set) {
    var Timer, Timer2, Timer3, Timer4;
    var i = -1;
    clearInterval(Timer4)
    $(set.analog).addClass("active")
    Timer4 = setTimeout(function() {
        $(set.analog).removeClass("active")
        Timer = setInterval(function() {
            i++
            $(set.el).html($(set.el).html() + set.msg.charAt(i))
            if (i == set.msg.length) {
                clearInterval(Timer)
                var j = i
                var newtxt = $(set.el).html()
                $(set.analog).addClass("active")
                clearInterval(Timer3)
                Timer3 = setTimeout(function() {
                    $(set.analog).removeClass("active")
                    Timer2 = setInterval(function() {
                        j--
                        $(set.el).html(newtxt.slice(0, j))
                        if (j == 0) {
                            clearInterval(Timer2)
                            $(set.analog).addClass("active")
                            set.cb && set.cb()
                        }
                    }, 150)
                }, 2000)
            }
        }, 150)
    }, 2000)
}

//图片上传
function imgView(file, apendobj) {
    /*if(file.size > 2097152) {
    	alert("上传只支持小于2M的图片")
    	return
    }*/
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = new Image()
        img.src = e.target.result;
        apendobj.html(img)
        apendobj.parents("label").addClass("upload-changed")
    }

    reader.readAsDataURL(file)
}
//URL参数截取
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
//正则规则
var RegRules = {
    nomarl: /^[\w\u4e00-\u9fa5]{1,10}/g,
    email: /^[a-z0-9]+@([a-z0-9]+\.)+[a-z]{1,4}$/i,
    phone: /^1[3,5,6,7,8,9]\d{9}$/,
    password: /^\w{6,16}$/,
    money: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
    number: /^[0-9-.]{1,16}$/,
    wechat: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
    enNomarl: /^[a-zA-Z ]{1,300}$/g,

}
$(function() {
    //滚动头部变化事件
    //var scrollH = $(window).height() / 2
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 10) {
            $(".header").addClass("active");
        } else {
            $(".header").removeClass("active")

        }
    })
    $(".change-nav").on("click", function(ev) {
        ev.stopPropagation();
        $("body").toggleClass("push");
        return false;
    })
    $(".pusher").on("click", function(ev) {
        $("body").removeClass("push");
        $(".menu-box").find("li").removeClass("active")
    })

    //下拉
    $(".select-txt").on("click", function(ev) {
        ev.stopPropagation();
        if ($(this).parents(".selectbox").hasClass('active')) {
            $(".selectbox").removeClass("active");
        } else {
            $(".selectbox").removeClass("active");
            $(this).parents(".selectbox").addClass("active");
        }
    });
    $('.selectbox').on("click", ".select-item", function() {
        var selectText = $(this).parents('.selectbox').find('.select-txt');
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parents(".selectbox").find(".select-txt").attr("data-value", $(this).attr("data-value"));
        $(this).parents('.selectbox').removeClass('active').children('.select-list').hasClass('phone') ? selectText.html($(this).children().eq(1).text()) : selectText.html($(this).html());
    });

    $(".menu-list>li>a[href='javascript:;'],.sub-menu-list>li>a[href='javascript:;']").on("click", function() {
        $(this).parents("li").addClass("active");
        return false;
    });


    $(".sub-menu-tit,.grandson-menu-tit").on("click", function() {
        $(this).closest("li").removeClass("active")
        return false;
    });

    /*提交页面正则判断*/
    $(document).on('focus', '.apply-reg-list input', function() {
        $(this).parents("li").addClass("focus")
    })
    $(document).on('blur', '.apply-reg-list input', function() {
        var _this = $(this)
        if (_this.val().match(RegRules[_this.attr("reg")]) != null) {
            _this.parents("li").addClass("success").removeClass("error").removeClass("focus");
        } else {
            _this.parents("li").addClass("error").removeClass("focus").removeClass("success");
        }
    })
})
