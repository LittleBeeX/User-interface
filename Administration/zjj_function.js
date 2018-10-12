function pub_alert_error(msg,time){
  time = time ? time : 2000;
  msg = msg ? msg : '错误';
  $.gritter.add({ title: '操作提示', text: '<span class="icon-remove btn-danger"></span> '+msg, time: time, class_name: 'gritter-light' });
}

function pub_alert_success(msg,time){
  time = time ? time : 2000;
  msg = msg ? msg : '操作成功';
  $.gritter.add({ title: '操作提示', text: '<span class="icon-ok btn-success"></span> '+msg, time: time, class_name: 'gritter-light' });
}

function lock_screen(url){
  var url = url== undefined? HINDEX_MASTER+'login/lock' : url;
  var data  = $("#form_locked").serialize();
  $.ajax({
    type:'POST',
    url:url,
    data:data,
    dataType:'json',
    success:function(r){
      if(r.state == 1){
        location.reload();
      }else{
        pub_alert_error(r.info);
      }
    }
   });
  if(url != HINDEX_MASTER+'login/lock'){
    return false;
  }
}

function pub_alert_confirm(t,msg,url){
  if(!t || !url) return false;
    msg = msg ? msg : '确定要执行此操作吗？';
    bootbox.animate(true);
    bootbox.confirm(msg, "取消", "确定", function (r) {
        if (r){
           $.ajax({
            type:'GET',
            url:url,
            dataType:'json',
            success:function(r){
              if(r.state == 1){
                pub_alert_success(r.info);
                setTimeout('location.reload()',1000);
              }else{
                pub_alert_error(r.info);
              }
            }
           });
        }
    });
}

function pub_ajax_submit(form){
  if(!form) return false;
  $(form).ajaxSubmit({
    type:'POST',
    dataType:'json',
    success:function(r){
      if(r.state == 1){
        pub_alert_success(r.info);
        $("#alert_o").hide();
        if(r.data == 'back'){
        setTimeout('history.go(-1)',600);
        }else if(r.data == 'current'){
        setTimeout('window.location.reload()',600);
        }
      }else{
        pub_alert_error(r.info);
        $("#alert_o").hide();
      }
    }
  });
}

function pub_submit_ck(){
  for ( instance in CKEDITOR.instances ) {
    CKEDITOR.instances[instance].updateElement();
  }
}

function pub_alert_html(url,isjump,addvar){
  addvar = addvar ? '&' : '?';
  isjump ? location.href=url+addvar+UVAR : '';
  $.ajax({
    type:'GET',
    url:url,
    dataType:'json',
    success:function(r){
      if(r.state == 1){
        $('body').prepend(r.data);
        _pub_alert_bootbox();
      }else{
        pub_alert_error(r.info);
      }
    }
  })
}

function _pub_alert_bootbox(){
  $("#pub_edit_bootbox").on("show",
    function() { 
      $("#pub_edit_bootbox a.btn").on("click",
      function(e) {
        console.log("button pressed"); 
        $("#pub_edit_bootbox").modal('hide');
      });
    });

    $("#pub_edit_bootbox").on("hide",
    function() {
      $("#pub_edit_bootbox a.btn").off("click");
    });
    $("#pub_edit_bootbox").on("hidden",
    function() {
      $("#pub_edit_bootbox").remove();
    });
    $("#pub_edit_bootbox").modal({
      "backdrop": "static",
      "keyboard": true,
      "show": true
    });
}