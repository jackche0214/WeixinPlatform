
$(function () {
});


function QueryUrlParameter(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null)
        return "";
    else
        return results[1];
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.trimAll = function () {
    return this.replace(/(^\s*)|(\s*)|(\s*$)/g, "");
};

function StringBuilder() {
    this._array = new Array();
}

StringBuilder.prototype.append = function (str) {
    this._array.push(str);
};

StringBuilder.prototype.toString = function (joinGap) {
    return this._array.join(joinGap);
};

String.prototype.getCodeText = function (baseCodeJson, tableName) {
    if (this == "" || this == undefined) return "";
    var text = this;
    $.each(baseCodeJson, function (i, n) {
        if (n.dm_table_name == tableName && n.item_code == text) {
            text = n.item_name;
            return;
        }
    });

    return text;
};

Array.prototype.idxOf = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return i;
        }
    }
    return -1;
};

Array.prototype.contain = function (obj) {
    return this.idxOf(obj) !== -1;
};

jQuery.fn.xTab = function () {
    var $this = this;
    $this.find("div.tabContainer > div:gt(0)").hide();
    $this.find("div.tabs span.tab").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $this.find("div.tabContainer > div").eq($(this).index()).show().siblings().hide();
        return false;
    });
}

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key])
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i])
                }
            }
        }
    }
    return result
};


//时间格式化
Date.prototype.format = function (format) {
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};


function MsgAlertWarning(msg) {
    showMsg(msg, false, "系统提示");
}

//弹出框以及系统消息框
function showMsg(msg, isAlert, title) {
    if (isAlert == null) {
        isAlert = true;
    }

    if (title == undefined) {
        title = "系统提示";
    }

    self.top.showMsg(title, msg, isAlert);
}

//确认框
function showConfirm(msg, callback, title) {
    if (title == undefined) {
        title = "系统提示";
    }
    self.top.showConfirm(title, msg, callback);
}

//进度框
function showProcess(isShow, msg, title) {
    if (isShow == undefined) {
        isShow = true;
    }

    if (msg == undefined) {
        msg = "请在提交您的请求，请稍等......";
    }

    if (title == undefined) {
        title = "系统提示";
    }

    if (typeof isShow === "string") {
        msg = isShow;
        isShow = true;
    }


    self.top.showProcess(isShow, title, msg);
}

//例如在表单提交时，为了防止重复提交，会显示一个进度框。提交完成时，关闭进度框并提示操作信息：
function submitForm(url) {
    $('#ff').form('submit', {
        url: (url === undefined ? "/Ajax/Common.ashx" : url) + "?Type=" + typeCode,
        onSubmit: function () {
            var flag = $(this).form('validate');
            if (flag) {
                showProcess(true, '温馨提示', '正在提交数据...');
            }
            return flag
        },
        success: function (data) {
            showProcess(false);
            if (data == 1) {
                top.showMsg('温馨提示', '提交成功！');
                if (parent !== undefined) {
                    if ($.isFunction(window.reloadParent)) {
                        reloadParent.call();
                    } else {
                        parent.$("#tt").datagrid('reload');
                        parent.closeMyWindow();
                    }
                }
            } else {
                $.messager.alert('温馨提示', data);
            }
        },
        onLoadError: function () {
            showProcess(false);
            $.messager.alert('温馨提示', '由于网络或服务器太忙，提交失败，请重试！');
        }
    });
}

function showWindow(title, href, width, height, modal, minimizable, maximizable) {
    self.top.showWindow(title, href, width, height, modal, minimizable, maximizable);
}


function getWindowId(url) {
    url = url.replace("http://" + window.location.host, "");
    return url.replace(/\//g, "_");
}

function CloseWindow() {
    var id = getWindowId(document.URL);

    var isclose = arguments.length == 1 && arguments[0] == "close";
    if (!isclose) {
        this.top.radWindowCallBackFn.apply(this, arguments);
    }


    self.top.CloseWindow(id);
}


String.prototype.IsICard = function () {
    var regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return regx.test(this);
}
String.prototype.IsEmail = function () {
    var regx = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return regx.test(this);
}
String.prototype.IsPhone = function () {

    var regx = /^13[0-9]{9}|15[0-9][0-9]{8}|18[0-9][0-9]{8}|147[0-9]{8}$/;
    if (this.length != 11) return false;
    return regx.test(this);
}
