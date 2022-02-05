using System;
using OgarniaczAllegro.DAL;
using OgarniaczAllegro.DAL.Models;
using OgarniaczAllegro.WebAPI.DTO;
using System.Collections.Generic;
using System.Linq;

namespace OgarniaczAllegro.WebAPI.Repositories
{
    public class StatusRepository : IStatusRepository
    {
        private readonly OgarniaczAllegroContext _dbContext;

        public StatusRepository(
            OgarniaczAllegroContext dbContext
            )
        {
            _dbContext = dbContext;
        }

        public IEnumerable<StatusDTO> GetStatuses()
        {
            var query = _dbContext.Statuses.ToList();
            var result = new List<StatusDTO>();
            query.ForEach(status => result.Add(QueryToDTO(status)));

            return result;
        }
















/////////////////////////////////////////////////////////////////////////////////////////
        
        private StatusDTO QueryToDTO(Status status)
        {
            return new StatusDTO() { 
            Id=status.Id,
            Name=status.Name};
        }
    }
}
