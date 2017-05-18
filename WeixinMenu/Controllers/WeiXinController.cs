using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Biz;

namespace WeixinMenu.Controllers
{
    public class WeiXinController : Controller
    {
        // GET: WeiXin
        public ActionResult Index()
        {
            return View();
        }
        #region"微信菜单管理"
        public ActionResult Menu()
        {
            return View();
        }
        public ActionResult MenuGridView()
        {
            return Content(GetMenuGridTree());
        }

        public string GetMenuGridTree()
        {
            List<TreeModel> result = new List<TreeModel>();

            List<TreeModel> children = new List<TreeModel>();

            IEnumerable<OrmLib.WeiXinMenu> kinds = SessionHolder.Current.Query<OrmLib.WeiXinMenu>();

            if (kinds.Count() == 0)
            {
                OrmLib.WeiXinMenu menu = new OrmLib.WeiXinMenu();
                menu.MenuId = "10000";
                menu.MenuName = "微信公众平台菜单";
                menu.MenuType = string.Empty;
                menu.MenuKey = string.Empty;
                menu.MenuUrl = string.Empty;
                menu.MediaId = string.Empty;
                menu.ParentId = "-1";
                menu.OrderBy = 1;
                menu.IsEnable = "1";
                menu.UserNum = SecurityHolder.CurrentUser.UserNum;
                menu.UserName = SecurityHolder.CurrentUser.UserNum;
                menu.CreateTime = DateTime.Now;
                SessionHolder.CreateTemplate<OrmLib.WeiXinMenu>().SaveOrUpdate(menu);

                kinds = SessionHolder.Current.Query<OrmLib.WeiXinMenu>();
            }


            OrmLib.WeiXinMenu root = kinds.FirstOrDefault(c => c.ParentId == "-1");

            GetMenuGridTree(kinds, children, "10000");

            result.Add(new TreeModel
            {
                Id = root.Id.ToString(),
                MenuId = root.MenuId,
                Text = root.MenuName,
                Url = root.MenuUrl,
                ParentMenuId = root.ParentId.ToString(),
                IsEnable = root.IsEnable,
                OrderBy = root.OrderBy.ToString(),
                Target = root.MenuType,
                Ico = root.MenuKey,
                children = children
            });

            return JsonConvert.SerializeObject(result);
        }

        private void GetMenuGridTree(IEnumerable<OrmLib.WeiXinMenu> kinds, List<TreeModel> children, string pId)
        {
            foreach (OrmLib.WeiXinMenu p in kinds.Where(c => c.ParentId == pId).OrderBy(c => c.OrderBy))
            {
                TreeModel gt = new TreeModel();
                gt.Id = p.Id.ToString();
                gt.MenuId = p.MenuId;
                gt.Text = p.MenuName;
                gt.Url = p.MenuUrl;
                gt.ParentMenuId = p.ParentId;
                gt.IsEnable = p.IsEnable;
                gt.OrderBy = p.OrderBy.ToString();
                gt.Target = p.MenuType;
                gt.Ico = p.MenuKey;

                List<TreeModel> childrenTmp = new List<TreeModel>();

                GetMenuGridTree(kinds, childrenTmp, p.MenuId);

                /*
                if (childrenTmp.Count > 0)
                {
                    gt.state = "closed";
                }
                */

                gt.children = childrenTmp;

                children.Add(gt);
            }
        }

        #endregion
    }
}