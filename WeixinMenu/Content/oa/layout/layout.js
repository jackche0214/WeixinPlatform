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


function CloseWindow(id) {
    $('#window' + id).window('close');
}

function radWindowCallBackFn() {
    var tab = $('#wu-tabs').tabs('getSelected');
    var cw = tab.find('iframe').get(0).contentWindow;
    if (cw.radWindowCallBackFn) {
        cw.radWindowCallBackFn.apply(cw, arguments)
    }

}

function registerShortMenuEvt() {
    $("#Shortcuts").css({ left: w - 438 });
    $("#ShortcutsHelp").css({ left: w - 345 });
    $("#topnav li a").on("click", function () {
        var idx = $(this).parent().index();

    });

    $("#topnav li a").hover(
      function () {
          var idx = $(this).parent().index();
          if (idx == 1) {
              $("#Shortcuts").show();
          }
          if (idx == 2) {
              $("#ShortcutsHelp").show();
          }
      },
      function () {
          var idx = $(this).parent().index();
          if (idx == 1) {
              $("#Shortcuts").hide();
          }
          if (idx == 2) {
              $("#ShortcutsHelp").hide();
          }
      }
    );
}

function registerStartMenu() {
    $(".main_menu div").on("click", function () {
        $(".main_menu div").removeClass("main_menu").removeClass("leftselected");
        $(this).addClass("leftselected");
    });
}

$(function () {


    registerShortMenuEvt();
    registerStartMenu();

    $('.wu-side-tree a').bind("click", function () {
        var title = $(this).text();
        var url = $(this).attr('data-link');
        var menuId = $(this).attr("data-menuId");
        //var iconCls = $(this).attr('data-icon');
        var iconCls = "icon-save";

        //var iframe = $(this).attr('iframe') == 1 ? true : false;
        var iframe = true;


        addTab(title, url, iconCls, iframe, menuId);
    });


    /**
    * Name 选项卡初始化
    */
    $('#wu-tabs').tabs({
        tools: [
            {
                iconCls: 'icon-reload',
                border: false,
                handler: function () {
                    alert("reload");
                }
            }, {
                iconCls: 'icon-no',
                border: false,
                handler: function () {
                    alert("no");
                }
            }]
    });

})


/**
* Name 添加菜单选项
* Param title 名称
* Param href 链接
* Param iconCls 图标样式
* Param iframe 链接跳转方式（true为iframe，false为href）
*/
function addTab(title, href, iconCls, iframe, menuId) {
    var tabPanel = $('#wu-tabs');
    if (!tabPanel.tabs('exists', title)) {
        var content = '<iframe scrolling="auto" frameborder="0" id="iframe_' + menuId
            + '"  src="' + href + '" style="width:100%;height:99%;"></iframe>';
        if (iframe) {
            tabPanel.tabs('add', {
                title: title,
                content: content,
                iconCls: iconCls,
                fit: true,
                cls: 'pd3',
                closable: true
            });
        }
        else {
            tabPanel.tabs('add', {
                title: title,
                href: href,
                iconCls: iconCls,
                fit: true,
                cls: 'pd3',
                closable: true
            });
        }
    }
    else {
        tabPanel.tabs('select', title);
    }
}
/**
* Name 移除菜单选项
*/
function removeTab() {
    var tabPanel = $('#wu-tabs');
    var tab = tabPanel.tabs('getSelected');
    if (tab) {
        var index = tabPanel.tabs('getTabIndex', tab);
        tabPanel.tabs('close', index);
    }
}

function refreshTab(cfg) {
    var refresh_tab = cfg.tabTitle ? $('#tabs').tabs('getTab', cfg.tabTitle) : $('#tabs').tabs('getSelected');
    if (refresh_tab && refresh_tab.find('iframe').length > 0) {
        var _refresh_ifram = refresh_tab.find('iframe')[0];
        var refresh_url = cfg.url ? cfg.url : _refresh_ifram.src;
        //_refresh_ifram.src = refresh_url;
        _refresh_ifram.contentWindow.location.href = refresh_url;
    }
}