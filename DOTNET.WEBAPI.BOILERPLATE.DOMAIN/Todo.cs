using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DOMAIN
{
    public class Todo : BaseEntity
    {
        public int UserId { get; set; }
        public string Todos { get; set; }
        public bool Done { get; set; }
        public DateTime? TodoDate { get; set; }
    }
}
