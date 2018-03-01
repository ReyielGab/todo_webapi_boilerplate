using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class NewUserCommand : IRequest<UserDto>
    {
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public int Age { get; set; }
    }

    public class NewUserCommandHandler : IRequestHandler<NewUserCommand, UserDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public NewUserCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(NewUserCommand request)
        {

            var newUser = new User()
            {
                Firstname = request.Firstname,
                Middlename = request.Middlename,
                Lastname = request.Lastname,
                Age = request.Age
            };

            _dbContext.Users.Add(newUser);

            _dbContext.SaveChanges();

            return Mapper.Map<UserDto>(newUser);
        }
    }
}
