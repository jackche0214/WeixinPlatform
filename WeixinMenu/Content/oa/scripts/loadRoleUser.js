var xsoftGridRole = null;
var gvRoleOptions = {
    TableName: "v_role_user",
    TitleName: "角色用户管理",
    Layout: 'Auto',
    Width: $(window).width() - 450,
    Height: $(window).height() - 65,
    ColModel: [
                {
                    display: '编号',
                    name: 'rolePk',
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
                    display: '姓名',
                    name: 'Name',
                    width: 80,
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
                    display: '性别',
                    name: 'SexCode',
                    width: 60,
                    sortable: false,
                    align: 'center',
                    hide: false,
                    baseTable: "dm_sex",
                    isEdit: true,
                    columnType: "select",
                    dataType: "string",
                    allowNull: false,
                    renderTo: null
                },
                {
                    display: '职位',
                    name: 'ProfessionalTitle',
                    width: 100,
                    sortable: false,
                    align: 'left',
                    hide: false,
                    baseTable: "dm_jobkind",
                    isEdit: true,
                    columnType: "select",
                    dataType: "string",
                    allowNull: false,
                    renderTo: null
                },
                {
                    display: '职称',
                    name: 'ProfessionalLevel',
                    width: 100,
                    sortable: false,
                    align: 'left',
                    hide: false,
                    baseTable: "dm_professional",
                    isEdit: true,
                    columnType: "select",
                    dataType: "string",
                    allowNull: false,
                    renderTo: null
                },
                {
                    display: '部门',
                    name: 'DeptId',
                    width: 100,
                    sortable: false,
                    align: 'left',
                    hide: false,
                    baseTable: "companystruct",
                    isEdit: true,
                    columnType: "select",
                    dataType: "string",
                    allowNull: false,
                    renderTo: null
                },
                {
                    display: '有效',
                    name: 'IsEnable',
                    width: 40,
                    sortable: false,
                    align: 'center',
                    hide: false,
                    baseTable: "",
                    isEdit: true,
                    columnType: "label",
                    dataType: "string",
                    allowNull: false,
                    renderTo: function (value) {
                        return "<span style=\"float:none;\" class=\""
                            + (value ? "selectChk" : "unSelectChk") + " sChk\"></span>";
                    }
                }
    ],
    Buttons: [
                { name: '更新', bclass: 'refresh', onpress: gridRefreshRole },
                { name: '添加成员', bclass: 'gridgroupadd', onpress: gridAddUser },
                { name: '删除成员', bclass: 'gridgroupdel', onpress: gridDelUser }

    ],
    Factor: "",
    QueryFactor: "",
    Sort: "name",
    SortType: "0",
    PageIndex: 1,
    PageSize: 15,
    PrimaryKey: "rolePk",
    IsCheck: true,
    IsSchool: false,
    IsContextMenu: false,
    Loaded: null
};


function loadRoleModule() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemoRole");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length == 0) {
        MsgAlertWarning("请选择角色")
        return null;
    }

    treeNode = nodes[0];

    gvRoleOptions.Factor = " rRoleId='" + treeNode.id + "'";
    xsoftGridRole = $("#roleContainer").XsoftGrid(gvRoleOptions);
}

function gridAddUser() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemoRole");
    var nodes = treeObj.getSelectedNodes();
    if (nodes.length == 0) {
        MsgAlertWarning("请选择角色")
        return null;
    }

    treeNode = nodes[0];
    var roleId = treeNode.id;

    treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    nodes = treeObj.getSelectedNodes();
    if (nodes.length == 0) {
        MsgAlertWarning("请选择公司")
        return null;
    }

    treeNode = nodes[0];
    var companyId = treeNode.id;
    if (self.top.OpenDialog) {
        self.top.OpenDialog("/OA/Privilege/RoleDistribute/" + roleId + "/" + companyId, 900, 500, "为角色分配权限");
    }
}

function gridDelUser() {
    var ids = xsoftGridRole.getSelect();
    if (ids.length == 0) return;

    if (!confirm("数据删除后将无法恢复，确认删除吗?")) return;

    showProcess();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/OA/User/DeleteRole",
        data: { id: ids.toString(',') },
        beforeSend: function () {
            showProcess();
        },
        error: function () {
            showMsg("删除失败", false);
        },
        success: function (data) {
            showMsg("删除成功");
            xsoftGridRole.refreshRecord();
        },
        complete: function () {
            showProcess(false)();
        }
    });
}

function gridRefreshRole() {
    xsoftGridRole.refreshRecord();
}