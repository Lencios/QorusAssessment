using ApplicationCore;
using Infrastructure;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Service
{
    public class DocumentStoreService: IDocumentStoreService
    {
        private readonly ILogger<DocumentStoreService> _logger;
        private readonly IAsyncRepository<Documents> _documentStoreRepository;

        public DocumentStoreService(ILogger<DocumentStoreService> logger, IAsyncRepository<Documents> documents)
        {
            _documentStoreRepository = documents;
            _logger = logger;
        }
        public async Task<IEnumerable<Documents>> GetAllDocuments()
        {
            return await _documentStoreRepository.ListAllAsync();
        }

        public async Task<Documents> GetDocumentById(int id)
        {
            return await _documentStoreRepository.GetAsyncById(id);
        }

        public async Task<Documents> AddDocument(Documents document)
        {

            var result = _documentStoreRepository.AddAsync(document).Result;
            return await _documentStoreRepository.GetAsyncById(document.Id.Value);
        }

    }
}
