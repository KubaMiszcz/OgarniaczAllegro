using OgarniaczAllegro.WebAPI.DTO;
using System.Collections.Generic;

namespace OgarniaczAllegro.WebAPI.Repositories
{
    public interface IStatusRepository
    {
        IEnumerable<StatusDTO> GetStatuses();
    }
}
