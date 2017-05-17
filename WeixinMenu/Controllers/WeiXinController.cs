using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
        #endregion
    }
}