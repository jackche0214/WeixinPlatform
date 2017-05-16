using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Biz.WeiXin;
using System.IO;
using System.Text;

namespace WeixinMenu
{
    /// <summary>
    /// WeixinInterface 的摘要说明
    /// </summary>
    public class WeixinInterface : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string postString = string.Empty;
                context.Response.ContentType = "text/plain";
                if (context.Request.HttpMethod.ToLower()=="post")
                {
                    using (Stream stream = HttpContext.Current.Request.InputStream)
                    {
                        Byte[] postBytes = new Byte[stream.Length];
                        stream.Read(postBytes,0,(Int32)stream.Length);
                        postString = Encoding.UTF8.GetString(postBytes);

                        MessageHelp help = new MessageHelp();
                        string responseContent = help.ReturnMessage(postBytes);

                        HttpContext.Current.Response.ContentEncoding = Encoding.UTF8;
                        HttpContext.Current.Response.Write(responseContent);
                    }
                }
                else
                {
                    //从微信后台过来的请求只有初始配置时是get方式，那么就去配饰配置校验
                    Biz.WeiXin.AccessToken.Auth();
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

       
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}