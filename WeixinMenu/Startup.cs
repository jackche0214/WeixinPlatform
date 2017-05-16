using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WeixinMenu.Startup))]
namespace WeixinMenu
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
