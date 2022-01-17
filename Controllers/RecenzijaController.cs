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
    public class RecenzijaController : ControllerBase
    {
       
       public RecenzijaContext Context { get; set; }

        public RecenzijaController(RecenzijaContext context)
        {
            Context = context;
        }

       [Route("DodajNovuRecenziju/{kIme}/{kSifra}/{kategorija}/{mesto}/{adresa}/{websajt}/{dobrestr}/{losestr}/{datum}/{ocena}")]
       [HttpPost]
        public async Task<ActionResult> DodajNovuRecenziju(string kIme,string kSifra,string kategorija,string mesto,string adresa,string websajt,string dobrestr,string losestr,DateTime datum, int ocena)
        {
            try
            {
               var korisnik=await Context.Korisnici.Where(p=>p.KorisnickoIme==kIme && p.Sifra==kSifra).FirstOrDefaultAsync();
               var kat=await Context.Kategorije.Where(p=>p.Naziv==kategorija).FirstOrDefaultAsync();
               int idKat=kat.ID;
               var mestoDalIPostoji= await Context.Mesta.Where(p=>p.Naziv==mesto).FirstOrDefaultAsync();
               var daLiPostojiRecenzija=await Context.Recenzije.Where(p=>p.KorisnikFk==korisnik && p.MestoFk==mestoDalIPostoji && p.MestoFk.KategorijaFk==kat).FirstOrDefaultAsync();
                
                if(daLiPostojiRecenzija!=null) 
                {
                    //taj korisnik je vec uneo recenziju za to mesto
                    string poruka="Vec ste uneli recenziju! Mozete da izmenite postojecu.";
                    return BadRequest(poruka);
                }
                else
                {
                    if(string.IsNullOrWhiteSpace(mesto) || mesto.Length>50)
                    {
                        return BadRequest("Neispravan naziv!");
                    }
                  
                     if(dobrestr.Length>300)
                    {
                        return BadRequest("Neispravan unos dobrih strana!");
                    }
                      if(losestr.Length>300)
                    {
                        return BadRequest("Neispravan unos losih strana!");
                    }
                     if(string.IsNullOrWhiteSpace(adresa) || adresa.Length>50)
                    {
                        return BadRequest("Neispravna adresa!");
                    }
                     if(ocena>5 || ocena<1)
                    {
                        return BadRequest("Neispravna ocena!");
                    }
                    
                     Mesto m=new Mesto{
                     Naziv=mesto,
                     Adresa=adresa,
                     WebSajt=websajt,
                     KategorijaFk=kat 
                     };
                     Context.Mesta.Add(m);
                     await Context.SaveChangesAsync();

                        Recenzija r=new Recenzija{
                        DobreStrane=dobrestr,
                        LoseStrane=losestr,
                        DatumUnosa=datum,
                        Ocena=ocena,
                        MestoFk=m,
                        KorisnikFk=korisnik
                        };
                     Context.Recenzije.Add(r);
                     await Context.SaveChangesAsync();
                     return Ok(
                        new{
                        Kategorija=kat.Naziv,
                        NazivMesta=m.Naziv,
                        WebSajt=m.WebSajt,
                        DobreStrane=r.DobreStrane,
                        LoseStrane=r.LoseStrane,
                        Ocena=r.Ocena,
                        IdRecenzije=r.ID
                     }
                    );

                    }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
      


    [Route("PreuzmiSveRecenzijeKorisnika/{kime}/{ksifra}/{grad}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveRecenzijeKorisnika(string kime, string ksifra,string grad)
    {
       var recenzije=Context.Recenzije.Where(p=>p.MestoFk.Adresa==grad)
            .Include(p=>p.MestoFk)
           .ThenInclude(p=>p.KategorijaFk)
           .Include(p=>p.KorisnikFk).Where(p=>p.KorisnikFk.KorisnickoIme==kime&&p.KorisnikFk.Sifra==ksifra);


            var recenzija=await recenzije.ToListAsync();

            return Ok( 
               
                recenzija.Select(p=>
                new{
                    Kategorija=p.MestoFk.KategorijaFk.Naziv, 
                    NazivMesta=p.MestoFk.Naziv,
                    WebSajt=p.MestoFk.WebSajt,
                    DobreStrane=p.DobreStrane,
                    LoseStrane=p.LoseStrane,
                    Ocena=p.Ocena,
                    ID=p.ID 
                })
                );



        }

    [Route("IzmeniPostojecuRecenziju/{idRecenzije}/{websajt}/{dobrestr}/{losestr}/{ocena}/{datum}")]
    [HttpPut]

     public async Task<ActionResult> IzmeniPostojecuRecenziju(int idRecenzije,string websajt,string dobrestr,string losestr,int ocena,DateTime datum)
     {
        var recenzija=Context.Recenzije.Where(p=>p.ID==idRecenzije)
            .Include(p=>p.MestoFk)
            .ThenInclude(p=>p.KategorijaFk)
           .Include(p=>p.KorisnikFk)
           .FirstOrDefault();

                if(recenzija!=null)
                {                   
                     if(dobrestr.Length>300)
                    {
                        return BadRequest("Neispravan unos dobrih strana!");
                    }
                      if(losestr.Length>300)
                    {
                        return BadRequest("Neispravan unos losih strana!");
                    }
                    
                     if(ocena>5 || ocena<1)
                    {
                        return BadRequest("Neispravna ocena!");
                    }

                    recenzija.DobreStrane=dobrestr;
                    recenzija.LoseStrane=losestr;
                    recenzija.Ocena=ocena;
                    recenzija.MestoFk.WebSajt=websajt;   
                    recenzija.DatumUnosa=datum;


                    await Context.SaveChangesAsync();
                    return Ok(    
                     new{
                         recenzija.DobreStrane,     
                        recenzija.LoseStrane,
                        recenzija.Ocena,
                        recenzija.MestoFk.WebSajt,  
                        recenzija.DatumUnosa
                     }
                    );

                }
                else
                {
                    return BadRequest("Recenzija ne postoji.");
                }
         }

         [Route("ObrisiPostojecuRecenziju/{idRecenzije}")]
         [HttpDelete]
          public async Task<ActionResult> ObrisiPostojecuRecenziju(int idRecenzije)
          {
                
               var recenzija=Context.Recenzije.Where(p=>p.ID==idRecenzije) //trazi recenziju sa zadatim ID-jem
                .Include(p=>p.MestoFk)
                .ThenInclude(p=>p.KategorijaFk)
                .Include(p=>p.KorisnikFk)
                .FirstOrDefault();

                var mestoRecenzije=recenzija.MestoFk;

                if(recenzija!=null)
                {
                    Context.Recenzije.Remove(recenzija); //brise u bazu 
                    await Context.SaveChangesAsync();

                    Context.Mesta.Remove(mestoRecenzije);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno obrisana recenzija!");
                }
                else
                {
                    return BadRequest("Recenzija ne postoji.");
                }


          }




    }
}
   


