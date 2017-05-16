using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace LinkAbout
{
    public class SqlLink
    {
        public SqlConnectionStringBuilder GetSqlStrbud()
        {
            SqlConnectionStringBuilder consbr = new SqlConnectionStringBuilder();
            consbr.ConnectionString = ConfigurationManager.ConnectionStrings["localconnection"].ConnectionString.ToString();
            consbr.ConnectTimeout = 60;
            consbr.MaxPoolSize = 50;
            consbr.MinPoolSize = 10;
            consbr.AsynchronousProcessing = true;
            return consbr;
        }
    }
}
