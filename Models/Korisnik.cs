using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Korisnik
    {
        [Key]
        public int ID { get; set; } 

        [Required]
        [MaxLength(20)]
        public string KorisnickoIme { get; set; }

        [Required]
        [MaxLength(20)]
        public string Sifra { get; set; }
        
        public virtual List<Recenzija> Recenzije { get; set; }

    }
}