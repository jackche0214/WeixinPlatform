var xsoftGrid = null;
var gvOptions = {
    TableName: "Menus",
    TitleName: "模块菜单管理",
    Layout: 'Auto',
    Width: $(window).width() - 450,
    Height: $(window).height() - 65,
    ColModel: [
                    {
                        display: '编号',
                        name: 'id',
                        width: 100,
                        sortable: false,
                        align: 'center',
                        hide: true,
                        baseTable: "",
                        columnType: "lable",
                        dataType: "string",
                        renderTo: null
                    },
                    {
                        display: '模块(菜单)名称',
                        name: 'Text',
                        width: 300,
                        sortable: false,
                        align: 'left',
                        hide: false,
                        baseTable: "",
                        columnType: "label",
                        isEdit: true,
                        dataType: "string",
                        dataFormat: '',
                        allowNull: false,
                        renderTo: null
                    },
                    {
                        display: '模块编码',
                        name: 'MenuId',
                        width: 120,
                        sortable: false,
                        align: 'left',
                        hide: false,
                        baseTable: "",
                        isEdit: true,
                        columnType: "label",
                        dataType: "string",
                        allowNull: false,
                        renderTo: null
                    },
                    {
                        display: '模块分类',
                        name: 'url',
                        width: 120,
                        sortable: false,
                        align: 'left',
                        hide: false,
                        baseTable: "",
                        isEdit: true,
                        columnType: "label",
                        dataType: "string",
                        allowNull: false,
                        renderTo: function (value) {
                            return value == "" ? "菜单目录" : "页面";
                        }
                    },
                    {
                        display: '排序',
                        name: 'OrderBy',
                        width: 100,
                        sortable: false,
                        align: 'center',
                        hide: false,
                        baseTable: "",
                        isEdit: true,
                        columnType: "label",
                        dataType: "string",
                        allowNull: false,
                        renderTo: null
                    },
                    {
                        display: '说明',
                        name: 'remark',
                        width: 100,
                        sortable: false,
                        align: 'left',
                        hide: true,
                        baseTable: "",
                        isEdit: true,
                        columnType: "label",
                        dataType: "string",
                        allowNull: false,
                        renderTo: null
                    },
                    {
                        display: '上级菜单',
                        name: 'ParentMenuId',
                        width: 100,
                        sortable: false,
                        align: 'left',
                        hide: true,
                        baseTable: "",
                        isEdit: true,
                        columnType: "label",
                        dataType: "string",
                        allowNull: false,
                        renderTo: null
                    },
                    {
                        display: '属性',
                        name: 'PropertyId',
                        width: 100,
                        sortable: false,
                        align: 'left',
                        hide: true,
                        baseTable: "",
                        isEdit: true,
                        columnType: "label",
                        dataType: "string",
                        allowNull: false,
                        renderTo: null
                    }
    ],
    Buttons: [
                { name: '更新', bclass: 'refresh', onpress: gridRefresh },
                { name: '重置', bclass: 'gridreset', onpress: gridReSet },
                { name: '授权', bclass: 'gridprivilege', onpress: gridGrant }

    ],
    Factor: "",
    QueryFactor: "",
    Sort: "MenuId",
    SortType: "0",
    PrimaryKey: "MenuId",
    IsCheck: true,
    IsSchool: false,
    IsContextMenu: false,
    Loaded: function () {
        loadRoleModule();
        getGrant();
    }
};

function radWindowCallBackFn(arg) {
    xsoftGrid.refreshRecord()
}

function loadModule() {
    xsoftGrid = $("#dataContainerModule").TreeGrid(gvOptions);
}

function gridReSet() {

}

function gridGrant() {
    var treeNode = null;
    var treeObj = $.fn.zTree.getZTreeObj("treeDemoRole");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length == 0) {
        MsgAlertWarning("请选择角色");
        return;
    }

    treeNode = nodes[0];
    if (treeNode.level == 0) {
        MsgAlertWarning("请选择角色");
        return;
    }

    var $menus = $("#dataContainerModule .datagrid table.editTable > tbody > tr > td span.node span.selectChk");

    var ids = new Array();
    $menus.each(function () {
        ids.push($(this).parents("tr").attr("attr-primary"));
    })

    if (ids.length == 0) {
        MsgAlertWarning("请选择菜单模块");
        return;
    }

    $.ajax({
        type: "post",
        url: '/OA/Privilege/SaveRolePrivilege',
        data: { id: treeNode.id, kindId: ids.toString(',') },
        beforeSend: function () {
            showProcess();
        },
        error: function () {
            showMsg("存盘失败!", false);
        },
        success: function (data) {
            showMsg("存盘成功!");
        },
        complete: function () {
            showProcess(false)();
        }
    });
};

function gridRefresh() {
    xsoftGrid.refreshRecord();
    getGrant();
}

function getGrant() {
    var treeNode = null;
    var treeObj = $.fn.zTree.getZTreeObj("treeDemoRole");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length == 0) {
        MsgAlertWarning("请选择角色");
        return;
    }

    treeNode = nodes[0];
    if (treeNode.level == 0) {
        MsgAlertWarning("请选择角色");
        return;
    }

    $.ajax({
        type: "post",
        url: '/OA/Privilege/GetRolePrivilege',
        data: { id: treeNode.id },
        beforeSend: function () {
            showProcess();
        },
        error: function () {
            showMsg("存盘失败!", false);
        },
        success: function (data) {
            $("#dataContainerModule .datagrid table.editTable > tbody > tr").each(function () {
                var pk = $(this).attr("attr-primary");
                var $menu = $(this).find("span.node span.sChk");
                if (data.contain(pk)) {
                    $menu.removeClass("unSelectChk").addClass("selectChk")
                } else {
                    $menu.removeClass("selectChk").addClass("unSelectChk")
                }
            });
        },
        complete: function () {
            showProcess(false);
        }
    });
};