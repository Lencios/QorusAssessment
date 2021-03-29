using ApplicationCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure
{
    public partial class DocumentStoreContext: DbContext
    {
        private readonly ILogger<DocumentStoreContext> _logger;

        public DocumentStoreContext(DbContextOptions<DocumentStoreContext> options, ILogger<DocumentStoreContext> logger)
            : base(options)
        {
            _logger = logger;
        }

        public DbSet<Documents> documentStore { get; set; }

       protected override void OnConfiguring(DbContextOptionsBuilder options) 
       => options.UseSqlServer("Server=localhost; Database=documentStore;User=sa; Password=<YourStrong@Passw0rd>", b => b.MigrationsAssembly("Service") );

        //public DbSet<Entry> entries { get; set; }
    }

   /*  public static class Includes
    {
        public static IQueryable<T> QueryableWithIncludes<T>(this DbSet<T> dbSet) where T : class
        {
            switch (dbSet)
            {
                case DbSet<DocumentStore> dbs:
                    return dbSet
                        .Include(nameof(DocumentStore.Entries));

                default: return dbSet.AsQueryable();
            }
        }
    } */
}
