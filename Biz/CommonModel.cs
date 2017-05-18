using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Biz
{
    class CommonModel
    {
    }

    public class TreeModel
    {
        public string Id { get; set; }
        public string MenuId { get; set; }
        public string Text { get; set; }
        public string Url { get; set; }
        public string Ico { get; set; }
        public string ParentMenuId { get; set; }
        public string IsEnable { get; set; }
        public string OrderBy { get; set; }
        public string Target { get; set; }
        public string IsStretch { get; set; }
        public string IsEdit { get; set; }
        public string IsDelete { get; set; }
        public string Remark { get; set; }
        public string state { get; set; }
        public string iconCls { get; set; }
        public List<TreeModel> children { get; set; }
    }
}
