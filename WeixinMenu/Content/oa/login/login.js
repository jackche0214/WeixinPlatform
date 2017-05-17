$(function () {


    $("#btlogin").on("click", function () {
        save();
    });
});


function tip(state, msg) {
    $("div.form-message").html("");
    $("div.form-message").html("<div class=\"form-" + state + "-text\">" + msg + "</div>");
}

function clearTip() {
    $("div.form-message").html("");
}

function save() {
    var loginName = $("#txtaccount").val();
    var password = $("#txtpassword").val();

    if (loginName == "") {
        tip("warning", "登录名不能为空!");
        return;
    }

    if (password == "") {
        tip("warning", "密码不能为空!");
        return;
    }


    tip("succeed", "正在登录中......");
    $.ajax({
        type: "post",
        url: '/OA/Login/Login',
        data: {
            loginName: loginName,
            password: password
        },
        dataType: 'json',
        beforeSend: function () {
        },
        error: function () {
        },
        success: function (data) {
            clearTip();
            if (data.Success) {
                //window.top.location.href = data.Message;
                tip("succeed", "登录中验证成功，正在跳转...");
                window.top.location.href = "/OA/Home/Index";
            } else {
                tip("error", data.Message);
            }
        },
        complete: function () {
        }
    });
}