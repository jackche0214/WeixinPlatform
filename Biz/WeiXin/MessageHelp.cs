using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml;
using System.Configuration;

namespace Biz.WeiXin
{
   public class MessageHelp
    {
       static string platformName = ConfigurationManager.AppSettings["platformName"];
       static string PlatformwxLogo = ConfigurationManager.AppSettings["PlatformwxLogo"];
        static string platformvoiceID = ConfigurationManager.AppSettings["platformvoiceID"];
        static string platformMediaId = ConfigurationManager.AppSettings["platformMediaId"];
        static string platformmusic = ConfigurationManager.AppSettings["platformmusic"];
        static string ExtendApi = ConfigurationManager.AppSettings["ExtendApi"];
        public  string ReturnMessage(Byte[] postBytes)
        {
            string responseContent = "";
            XmlDocument xmldoc = new XmlDocument();
            xmldoc.Load(new MemoryStream(postBytes));
            XmlNode MsgType = xmldoc.SelectSingleNode("/xml/MsgType");
            if (MsgType != null)
            {
                switch (MsgType.InnerText)
                {
                    case "event":
                        responseContent = HandleEvent(xmldoc);//处理事件
                        break;
                    case "text":
                        responseContent = HandleText(xmldoc);//处理文本信息
                        break;
                    default:
                        break;
                }
                 
            }
            return responseContent;
        }

        public  string HandleText(XmlDocument xmldoc)
        {
            string responseContent = "";
            XmlNode ToUserName = xmldoc.SelectSingleNode("/xml/ToUserName");
            XmlNode FromUserName = xmldoc.SelectSingleNode("/xml/FromUserName");
            XmlNode Content = xmldoc.SelectSingleNode("/xml/Content");
            string pattern = @"[a-zA-Z]+://[^\s]*";
            bool flag = Regex.IsMatch(Content.InnerText, pattern);
            //string base64 = SecurityUtil.EncodeBase64(Content.InnerText, Encoding.UTF8);

            if (Content != null)
            {
                if (flag)
                {
                    responseContent = string.Format(ReplyType.Message_Img_Text_Main,
                             FromUserName.InnerText,
                             ToUserName.InnerText,
                             DateTime.Now.Ticks,
                             "1",
                              string.Format(ReplyType.Message_Img_Text_Item, platformName, @"把您最新的想法分享给您的朋友吧",
                            PlatformwxLogo,
                              ExtendApi ));
                }
                else
                {
                    if (Content.InnerText.Equals("voice"))
                    {
                        responseContent = string.Format(ReplyType.Message_voice,
                             FromUserName.InnerText,
                             ToUserName.InnerText,
                             DateTime.Now.Ticks,
                             platformvoiceID);
                    }
                    else if (Content.InnerText.Equals("pic"))
                    {
                        responseContent = string.Format(ReplyType.Message_Pic,
                             FromUserName.InnerText,
                             ToUserName.InnerText,
                             DateTime.Now.Ticks,
                             platformMediaId);
                    }
                    else if (Content.InnerText.Equals("Video"))
                    {
                        responseContent = string.Format(ReplyType.Message_Music,
                             FromUserName.InnerText,
                             ToUserName.InnerText,
                             DateTime.Now.Ticks,
                             "Someone_Like_You",
                             "Adele -Someone_Like_You",
                             "platformmusic",
                             "",
                             ""
                             );
                    }
                    else
                    {
                        responseContent = string.Format(ReplyType.Message_Text,
                      FromUserName.InnerText,
                      ToUserName.InnerText,
                      DateTime.Now.Ticks,
                     platformName + "欢迎您");
                    }
                }
            }
            return responseContent;
        }

        public  string HandleEvent(XmlDocument xmldoc) {
            string responseContent = "";
            XmlNode Event = xmldoc.SelectSingleNode("/xml/Event");
            XmlNode ToUserName = xmldoc.SelectSingleNode("/xml/ToUserName");
            XmlNode FromUserName = xmldoc.SelectSingleNode("/xml/FromUserName");
            XmlNode Content = xmldoc.SelectSingleNode("/xml/Content");
            if (Event != null)
            {
                if (Event.InnerText.Equals("subscribe"))
                {

                    responseContent = string.Format(ReplyType.Message_Text,
                       FromUserName.InnerText,
                      ToUserName.InnerText,
                      DateTime.Now.Ticks,
                     platformName + "欢迎您");
                }
            }
            return responseContent;
        }


    }

    public class ReplyType
    {
        /// <summary>
        /// 普通文本信息
        /// </summary>
        public static string Message_Text
        {
            get{
                return @"
                                <xml>
                             <ToUserName><![CDATA[{0}]]></ToUserName>
                             <FromUserName><![CDATA[{1}]]></FromUserName> 
                             <CreateTime>{2}</CreateTime>
                             <MsgType><![CDATA[text]]></MsgType>
                             <Content><![CDATA[{3}]]></Content>
                             </xml>";
            }
        }
        /// <summary>
        /// 图文信息主体
        /// </summary>
        public static string Message_Img_Text_Main
        {
            get {
                return @"
                        <xml>
                            <ToUserName><![CDATA[{0}]]></ToUserName>
                            <FromUserName><![CDATA[{1}]]></FromUserName>
                            <CreateTime>{2}</CreateTime>
                            <MsgType><![CDATA[news]]></MsgType>
                            <ArticleCount>{3}</ArticleCount>
                            <Articles>
                            {4}
                            </Articles>
                            </xml> 
                    ";
            }
        }
        /// <summary>
        /// 图文信息项
        /// </summary>
        public static string Message_Img_Text_Item
        {
            get {
                return @"
                                <item>
                            <Title><![CDATA[{0}]]></Title> 
                            <Description><![CDATA[{1}]]></Description>
                            <PicUrl><![CDATA[{2}]]></PicUrl>
                            <Url><![CDATA[{3}]]></Url>
                            </item>
                            ";
            }
        }
        /// <summary>
        /// 语音项
        /// </summary>
        public static string Message_voice
        {
            get {
                return @"
                                <xml>
                                <ToUserName><![CDATA[{0}]]></ToUserName>
                                <FromUserName><![CDATA[{1}]]></FromUserName>
                                <CreateTime>{2}</CreateTime>
                                <MsgType><![CDATA[voice]]></MsgType>
                                <Voice>
                                <MediaId><![CDATA[{3}]]></MediaId>
                                </Voice>
                                </xml>
                                    ";
            }
        }
        /// <summary>
        /// 图片项
        /// </summary>
        public static string Message_Pic {
            get {
                return @"<xml>
                                <ToUserName><![CDATA[{0}]]></ToUserName>
                                <FromUserName><![CDATA[{1}]]></FromUserName>
                                <CreateTime>{2}</CreateTime>
                                <MsgType><![CDATA[image]]></MsgType>
                                <Image>
                                <MediaId><![CDATA[{3}]]></MediaId>
                                </Image>
                                </xml>";
            }
        }

        public static string Message_Music
        {
            get {
                return @"<xml>
                                <ToUserName><![CDATA[{0}]]></ToUserName>
                                <FromUserName><![CDATA[{1}]]></FromUserName>
                                <CreateTime>{2}</CreateTime>
                                <MsgType><![CDATA[music]]></MsgType>
                                <Music>
                                <Title><![CDATA[{3}]]></Title>
                                <Description><![CDATA[{4}]]></Description>
                                <MusicUrl><![CDATA[{5}]]></MusicUrl>
                                <HQMusicUrl><![CDATA[{6}]]></HQMusicUrl>
                                <ThumbMediaId><![CDATA[{7}]]></ThumbMediaId>
                                </Music>
                                </xml>";
            }
        }
    }
}
