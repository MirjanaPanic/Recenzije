using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class RecenzijaContext:DbContext
    {
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Mesto> Mesta { get; set; }
        public DbSet<Recenzija> Recenzije { get; set; }
        public DbSet<Kategorija> Kategorije { get; set; }

        public RecenzijaContext(DbContextOptions options) : base(options)
        {

        }

        
    }
}