using ApplicationCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service
{
    public interface IDocumentStoreService
    {
        Task<IEnumerable<Documents>> GetAllDocuments();
        //Task<DocumentStore> GetDocumentById(int id);
        Task<Documents> AddDocument(Documents document);

        //Task<DocumentStore> AddDocument(string document);

        //Task<DocumentStore> DeleteEntry(int id, int entryId);

        //Task<int> DeleteCollection(int id);
    }
}
