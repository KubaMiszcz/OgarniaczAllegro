using System;
using OgarniaczAllegro.DAL;
using OgarniaczAllegro.DAL.Models;
using OgarniaczAllegro.WebAPI.DTO;
using System.Collections.Generic;
using System.Linq;

namespace OgarniaczAllegro.WebAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly OgarniaczAllegroContext _dbContext;

        public UserRepository(
            OgarniaczAllegroContext dbContext
            )
        {
            _dbContext = dbContext;
        }

    }
}
