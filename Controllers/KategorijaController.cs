using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace ProjekatWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KategorijaController : ControllerBase
    {
       
       public RecenzijaContext Context { get; set; }

        public KategorijaController(RecenzijaContext context)
        {
            Context = context;
        }

        
        [Route("DodatiKategorije/{kategorija}")]
        [HttpPost]
        public async Task<ActionResult> DodatiKategorije(string kategorija)
        {
            try
            {
                Kategorija k=new Kategorija();
                k.Naziv=kategorija;

                Context.Kategorije.Add(k);
                await Context.SaveChangesAsync();
                return Ok("Kategorija je uspesno dodata!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

      
        [Route("PreuzmiKategorije")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiKategorije()
        {
            try
            {
                return Ok(await Context.Kategorije.Select(p => new { p.ID, p.Naziv }).ToListAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
    }
}
