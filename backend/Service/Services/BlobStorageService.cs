using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;  
using Microsoft.WindowsAzure.Storage.Blob;  
using System;  
using System.Collections.Generic;  
using System.IO;  
using System.Threading.Tasks;  
using Service.AppConfig;

namespace Service
{
    public class BlobStorageService  
    {  
        string accessKey = string.Empty;  
  
        public BlobStorageService(IConfiguration config)  
        {  
            this.accessKey = config.GetSection("ConnectionStrings")["blobServer"];
        }
  
        public string UploadFileToBlob(string strFileName, byte[] fileData, string fileMimeType)  
        {  
            try  
            {  
  
                var _task = Task.Run(() => this.UploadFileToBlobAsync(strFileName, fileData, fileMimeType));  
                _task.Wait();  
                string fileUrl = _task.Result;  
                return fileUrl;  
            }  
            catch (Exception ex)  
            {  
                throw (ex);  
            }  
        }   
  
        private async Task<string> UploadFileToBlobAsync(string strFileName, byte[] fileData, string fileMimeType)  
        {  
            try  
            {  
                CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(accessKey);  
                CloudBlobClient cloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();  
                string strContainerName = "uploads";  
                CloudBlobContainer cloudBlobContainer = cloudBlobClient.GetContainerReference(strContainerName);  
                string fileName = strFileName;
  
                if (await cloudBlobContainer.CreateIfNotExistsAsync())  
                {  
                    await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });  
                }  
  
                if (fileName != null && fileData != null)  
                {  
                    CloudBlockBlob cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);  
                    cloudBlockBlob.Properties.ContentType = fileMimeType;  
                    await cloudBlockBlob.UploadFromByteArrayAsync(fileData, 0, fileData.Length);  
                    return cloudBlockBlob.Uri.AbsoluteUri;  
                }  
                return "";  
            }  
            catch (Exception ex)  
            {  
                throw (ex);  
            }  
        }  
    } 
    
}