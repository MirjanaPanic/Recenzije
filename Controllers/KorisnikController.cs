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
    public class KorisnikController : ControllerBase
    {
       
       public RecenzijaContext Context { get; set; }

        public KorisnikController(RecenzijaContext context)
        {
            Context = context;
        }
        

        [Route("DaLiPostojiKorisnik/{ime}/{sifra}")]
        [HttpGet]
        public async Task<Korisnik> Login(string ime, string sifra)
        {
            var k= await Context.Korisnici.Where(p=> p.KorisnickoIme==ime&&p.Sifra==sifra).FirstOrDefaultAsync();

            if(k!=null)
            {
                return k; //vraca korisnika, ako on postoji u bazi
            }
            else
            {
                Korisnik nePostoji = new Korisnik();
                nePostoji.KorisnickoIme="ne postoji";
                return nePostoji; //vraca korisnika ali ima ovo korisnicko ime kao atribut
            }

        }


        //ne koristim je
        [Route("DodajKorisnika")]
        [HttpPost]
        public async Task<ActionResult> DodajKorisnika([FromBody] Korisnik korisnik)
        {

            if(string.IsNullOrWhiteSpace(korisnik.KorisnickoIme) || korisnik.KorisnickoIme.Length>20)
            {
                return BadRequest("Neispravno korisnicko ime!");
            }

            if(string.IsNullOrWhiteSpace(korisnik.Sifra) || korisnik.Sifra.Length>20)
            {
                return BadRequest("Neispravna sifra!");
            }

            try
            {
                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Korisnik je dodat! ID je: {korisnik.ID}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }

         //ne koristim je
        [Route("IzmeniKorisnickoIme/{sifra}/{ime}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniKorisnickoIme(string sifra,string ime)
        {
             if(string.IsNullOrWhiteSpace(sifra) || sifra.Length>20)
            {
                return BadRequest("Neispravna sifra!");
            }
            try
            {
                var korisnik = Context.Korisnici.Where(p=>p.Sifra==sifra).FirstOrDefault(); //vraca prvog ili null ako ne postoji
                
                if(korisnik!=null)
                {
                    korisnik.KorisnickoIme=ime;

                    await Context.SaveChangesAsync();
                    return Ok("Uspesno promenjeno korisnicko ime!");
                }
                else
                {
                    return BadRequest("Korisnik nije pronadjen.");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

         //ne koristim je
        [Route("IzmeniSifru/{ime}/{sifra}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniSifru(string ime, string sifra)
        {
             if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Neispravno korisnicko ime!");
            }
            try
            {
                var korisnik = Context.Korisnici.Where(p=>p.KorisnickoIme==ime).FirstOrDefault(); //vraca prvog ili null ako ne postoji
                
                if(korisnik!=null)
                {
                    korisnik.Sifra=sifra;
                    

                    await Context.SaveChangesAsync();
                    return Ok("Uspesno promenjena sifra!");
                }
                else
                {
                    return BadRequest("Korisnik nije pronadjen.");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
       
         //ne koristim je
        [Route("IzbrisatiKorisnika/{ime}/{sifra}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiKorisnika(string ime, string sifra)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Neispravno korisnicko ime!");
            }

            if(string.IsNullOrWhiteSpace(sifra) || sifra.Length>20)
            {
                return BadRequest("Neispravna sifra!");
            }

            try
            {
                var korisnik = Context.Korisnici.Where(p=>p.KorisnickoIme==ime && p.Sifra==sifra).FirstOrDefault(); //vraca prvog ili null ako ne postoji
                
                if(korisnik!=null)
                {
                    Context.Korisnici.Remove(korisnik);

                    await Context.SaveChangesAsync();
                    return Ok("Uspesno izbrisan korisnik!");
                }
                else
                {
                    return BadRequest("Korisnik nije pronadjen.");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }


        }


        
    }
}
