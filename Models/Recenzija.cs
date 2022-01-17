using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Recenzija
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(300)]
        public string DobreStrane { get; set; } 

        [MaxLength(300)]
        public string LoseStrane { get; set; } 

        [Required]
        public DateTime DatumUnosa { get; set; } 

        
        [Required] 
        [Range(1,5)] 
        public int  Ocena { get; set; }  

        public virtual Mesto MestoFk { get; set; } 

        [JsonIgnore] 
        public virtual Korisnik KorisnikFk { get; set; } 

    }
}