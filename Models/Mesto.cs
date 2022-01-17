using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Mesto
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Naziv { get; set; }

        [MaxLength(50)]
        public string Adresa { get; set; } 


        [Url]
        public string WebSajt { get; set; } 

       
        public virtual Kategorija KategorijaFk { get; set; } 
        
        [JsonIgnore] 
        public virtual List<Recenzija> Recenzije { get; set; } 

       
    }
}