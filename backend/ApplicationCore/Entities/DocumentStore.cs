using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http; 

namespace ApplicationCore
{
    [Table("documents")]
    public class Documents : BaseEntity, IAggregateRoot
    {
         public string fileName { get; set; }

        public string Category { get; set; }
        public DateTime LastReviewedDate { get; set; }

       
        public string ImagePath { get; set; } 

        public string ContentType { get; set; } 

        [NotMapped]
        public IFormFile File {get; set;} 
    }
}
