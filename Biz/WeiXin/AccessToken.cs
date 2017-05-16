using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Configuration;

namespace Biz.WeiXin
{
    public class AccessToken
    {
        /// <summary>
        /// 这个函数是初始化配置服务器地址
        /// </summary>
        public static void Auth()
        {
            string echoStr = HttpContext.Current.Request.QueryString["echoStr"];
            if (CheckSignature()) //校验签名是否正确
            {
                if (!string.IsNullOrEmpty(echoStr))
                {
                    HttpContext.Current.Response.Write(echoStr);
                    HttpContext.Current.Response.End();

                }
            }
        }
        /// <summary>
        /// 校验微信公众平台签名函数
        /// </summary>
        /// <returns></returns>
        public static bool CheckSignature()
        {
            string signature = HttpContext.Current.Request.QueryString["signature"];
            string timestamp = HttpContext.Current.Request.QueryString["timestamp"];
            string nonce = HttpContext.Current.Request.QueryString["nonce"];
            string token = ConfigurationManager.AppSettings["weixin_token"];

            string[] tmpArr = { token , timestamp, nonce };
            Array.Sort(tmpArr);
            string tmpStr = string.Join("", tmpArr);
            tmpStr = WX.Sha1_Hash(tmpStr);

            if (tmpStr == signature)
            {
                return true;
            }
            else
            {
                return
                    false;
            }


        }
    }
}
