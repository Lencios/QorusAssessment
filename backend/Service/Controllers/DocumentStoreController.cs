using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Hosting;

namespace Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("localDevelopmentOrigins")]
    public class DocumentStoreController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<DocumentStoreController> _logger;
        private readonly IDocumentStoreService _documentStoreService;

        private readonly IWebHostEnvironment _env;
        public DocumentStoreController(ILogger<DocumentStoreController> logger, IConfiguration config, IDocumentStoreService documentStoreService, IWebHostEnvironment env)
        {
            _logger = logger;
            _config = config;
            _documentStoreService = documentStoreService;
            _env = env;
        }

        [HttpGet]
        [Route("documents")]
        public async Task<IActionResult> GetAllEntries()
        {
            try
            {
                var documents = await _documentStoreService.GetAllDocuments();
                var results = documents.Select(i => new { i.fileName, i.ImagePath, i.ContentType });
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> AddDocumentStoreEntry([FromForm] Documents document)
        {
            var currentDirectory = Directory.GetCurrentDirectory();
              var uploads = Path.Combine(currentDirectory, "uploads");  
                bool exists = Directory.Exists(uploads);  
                if (!exists)  
                    Directory.CreateDirectory(uploads);  
  
                string fileName = Path.GetFileName(document.File.FileName);  
                byte[] fileData;  
                using (var target = new MemoryStream())  
                {  
                    document.File.CopyTo(target);  
                    fileData = target.ToArray();  
                } 
                string mimeType = document.File.ContentType; 
                document.ContentType =  document.File.ContentType;

                 BlobStorageService objBlobService = new BlobStorageService(_config);
                document.ImagePath = objBlobService.UploadFileToBlob(document.File.FileName, fileData, mimeType);  

            try
            {
                var result = await _documentStoreService.AddDocument(document);
                var res = new {
                    fileName = result.fileName,
                    imagePath = result.ImagePath,
                    contentType = result.ContentType
                };
                return Ok(res);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}