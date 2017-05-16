using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LinkAbout;
using System.Data.SqlClient;
using System.Text;
using System.Data;

namespace WeixinMenu.Controllers
{
    public class MenuController : Controller
    {
        // GET: Menu
        public ActionResult Index()
        {
            //先获取连接
            SqlLink sqlLink = new SqlLink();//先实例化连接类
            SqlConnectionStringBuilder Strbud = sqlLink.GetSqlStrbud();
            //建立连接sql
            StringBuilder StrB = new StringBuilder();
            StrB.Append("select * from dbo.WeiXinMenu");
            using (SqlConnection con = new SqlConnection(Strbud.ConnectionString))
            {
                try
                {
                    con.Open();
                    SqlDataAdapter sqladp = new SqlDataAdapter(StrB.ToString(), con);//先桥接器进行数据库连接
                    SqlCommandBuilder sqlcomd = new SqlCommandBuilder(sqladp);// 这个在删除等操作时有用
                    DataSet dt = new DataSet();
                    sqladp.Fill(dt);//把得到的表舔入dataset数据集
                    DataTable table = new DataTable();
                    table = dt.Tables[0];//数据集第一个是这个表
                    ViewBag.table = table;
                    return View();

                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

               
        }
    }
}