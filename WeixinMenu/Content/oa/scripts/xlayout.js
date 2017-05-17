var w = $(window).width();
var h = $(window).height();
//弹出框以及系统消息框
function showMsg(title, msg, isAlert) {
    if (isAlert !== undefined && isAlert) {
        $.messager.alert(title, msg);
    } else {
        $.messager.show({
            title: title,
            msg: msg,
            showType: 'show'
        });
    }
}

//确认框
function showConfirm(title, msg, callback) {
    $.messager.confirm(title, msg, function (r) {
        if (r) {
            if (jQuery.isFunction(callback))
                callback.call();
        }
    });
}

//进度框
function showProcess(isShow, title, msg) {
    if (!isShow) {
        $.messager.progress('close');
        return;
    }
    var win = $.messager.progress({
        title: title,
        msg: msg
    });
}

function getWindowId(url) {
    return url.replace(/\//g, "_");
}

function OpenDialog(url, width, height, title) {
    showWindow(title, url, width, height);
}

function showWindow(title, href, width, height, modal, minimizable, maximizable) {
    var id = getWindowId(href);
    $('body').append('<div id="window' + id
        + '" class="easyui-dialog" data-options="iconCls:\'icon-save\'" closed="true"></div>');
    $('#window' + id).window({
        id: 'window' + id,
        title: title,
        width: width === undefined ? 600 : width,
        height: height === undefined ? 400 : height,
        content: '<iframe scrolling="yes" frameborder="0" id="iframe' + id
            + '"  src="' + href + '" style="width:100%;height:98%;"></iframe>',
        //        href: href === undefined ? null : href,
        modal: modal === undefined ? true : modal,
        minimizable: minimizable === undefined ? false : minimizable,
        maximizable: maximizable === undefined ? false : maximizable,
        shadow: false,
        cache: false,
        closed: false,
        collapsible: false,
        resizable: false,
        loadingMessage: '正在加载数据，请稍等片刻......'
    });
}

$(function () {
});

function CloseWindow(id) {
    id = id.replace("#", "");
    $('#window' + id).window('close');
}