import { Korisnik } from "./Korisnik.js";
import { Kategorija } from "./Kategorija.js";
import { Tabela } from "./Tabela.js";

export class Forma
{
    nacrtajFormuZaUnos(ime, sifra,grad) 
    {
        //ovde crtam formu za unos recenzije
    

        let glavniDiv=document.createElement("div");
        glavniDiv.className="glavniDiv";
        glavniDiv.id="glavniDiv"+grad;
        document.body.appendChild(glavniDiv);

        let divZaUnos=document.createElement("div");
        divZaUnos.className="divZaUnos";
        divZaUnos.id="divZaUnos"+grad;
        glavniDiv.appendChild(divZaUnos);

        let divZaPrikaz=document.createElement("div");
        divZaPrikaz.className="divZaPrikaz";
        divZaPrikaz.id="divZaPrikaz"+grad;
        glavniDiv.appendChild(divZaPrikaz);

        
        let naslov = document.createElement("h3"); //glavni naslov stranice
        naslov.className="naslovStraniceDrugi";
        if(grad=="Pirot") 
        {
            naslov.innerHTML="Dobrodošli, " + ime + "." + "Ovde možete da iznesete vaše mišljenje o različitim uslugama koje se nude u našem gradu";
        }
        else if(grad=="Dimitrovgrad")
        {
            naslov.innerHTML="Dobrodošli, " + ime + "." + "Ovde možete da iznesete vaše mišljenje o različitim uslugama koje se nude u našoj opštini";
        }
       
        divZaPrikaz.appendChild(naslov);
        

        var tabelaBody=this.crtajTabelu(divZaPrikaz,grad); //nacrta tabelu samo, okvirno

        this.prikaziRecenzijeLogovanogKorisnika(tabelaBody,ime,sifra,grad);

        let divPrvi=document.createElement("div");
        divPrvi.className="divPrvi";
        divPrvi.id="divPrvi"+grad;
        divZaUnos.appendChild(divPrvi);

        let divDrugi=document.createElement("div");
        divDrugi.className="divDrugi";
        divDrugi.id="divDrugi"+grad;
        divZaUnos.appendChild(divDrugi);

        let divCetvrti=document.createElement("div");
        divCetvrti.className="divCetvrti";
        divCetvrti.id="divCetvrti"+grad;
        divZaUnos.appendChild(divCetvrti);

        let divPeti=document.createElement("div");
        divPeti.className="divPeti";
        divPeti.id="divPeti"+grad;
        divZaUnos.appendChild(divPeti);

        let divSesti=document.createElement("div");
        divSesti.className="divSesti";
        divSesti.id="divSesti"+grad;
        divZaUnos.appendChild(divSesti);

        let divSedmi=document.createElement("div");
        divSedmi.className="divSedmi";
        divSedmi.id="divSedmi"+grad;
        divZaUnos.appendChild(divSedmi);

        let divIzmedju=document.createElement("div");
        divIzmedju.className="divIzmedju";
        divIzmedju.id="divIzmedju"+grad;
        divZaUnos.appendChild(divIzmedju);

        let divOsmi=document.createElement("div");
        divOsmi.className="divOsmi";
        divOsmi.id="divOsmi"+grad;
        divZaUnos.appendChild(divOsmi);


        //kategorija

        let labKategorija=document.createElement("label");
        labKategorija.innerHTML="Kategorija *";
        labKategorija.className="labKategorija";
        divPrvi.appendChild(labKategorija);
        

        let comboKategorija=document.createElement("select");
        comboKategorija.className="comboKategorija";
        comboKategorija.id="selectKategorijaID"+grad;
        divPrvi.appendChild(comboKategorija);

        //naziv

        let labNaziv=document.createElement("label");
        labNaziv.innerHTML="Naziv *";
        labNaziv.className="labNaziv";
        divDrugi.appendChild(labNaziv);

        let unosNaziv=document.createElement("input");
        unosNaziv.className="unosNaziv";
        unosNaziv.id="unosNazivID"+grad;
        divDrugi.appendChild(unosNaziv);

        //web sajt - opciono

        let labWebSajt=document.createElement("label");
        labWebSajt.innerHTML="Web sajt";
        labWebSajt.className="labWebSajt";
        divCetvrti.appendChild(labWebSajt);

        let unosWebSajt=document.createElement("textarea");
        unosWebSajt.className="unosWebSajt";
        unosWebSajt.id="unosWebSajtID"+grad;
        divCetvrti.appendChild(unosWebSajt);

        //dobre strane

        let labDobreStrane=document.createElement("label");
        labDobreStrane.innerHTML="Dobre strane";
        labDobreStrane.className="labDobreStrane";
        divPeti.appendChild(labDobreStrane);

        let unosDobreStrane=document.createElement("textarea");
        unosDobreStrane.className="unosDobreStrane";
        unosDobreStrane.id="unosDobreStraneID"+grad;
        divPeti.appendChild(unosDobreStrane);

         //lose strane

         let labLoseStrane=document.createElement("label");
         labLoseStrane.innerHTML="Loše strane";
         labLoseStrane.className="labLoseStrane";
         divSesti.appendChild(labLoseStrane);
 
         let unosLoseStrane=document.createElement("textarea");
         unosLoseStrane.className="unosLoseStrane";
         unosLoseStrane.id="unosLoseStraneID"+grad;
         divSesti.appendChild(unosLoseStrane);

         //ocena

         let labOcena=document.createElement("label");
         labOcena.innerHTML="Ocena *";
         labOcena.className="labOcena";
         divSedmi.appendChild(labOcena);

         let labZaOcene=document.createElement("label");
         labZaOcene.innerHTML="1*   "+"2*  "+"3*  "+"4*  "+"5*  ";
         labZaOcene.className="labZaOcene";
         divIzmedju.appendChild(labZaOcene);

         //radio buttons - kao zvezdice

        let divZaRB=document.createElement("div");
        divZaRB.className="divZaRB";
        divSedmi.appendChild(divZaRB);
      

         let j=1;
         let rbsOcene=[1,2,3,4,5];
         rbsOcene.forEach(p=>
            {
                let rbOcena=document.createElement("input");
                rbOcena.type="radio";
                rbOcena.id="radio"+grad+j++;
                rbOcena.className="radioDugmici";
                rbOcena.value=p; 
                rbOcena.name="dugmici"; //da moze samo 1 da se cekira
          
               
                divSedmi.appendChild(rbOcena);
            })   

        //datum i vreme

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let labDatumVreme=document.createElement("label");
        labDatumVreme.className="labDatumVreme";
        labDatumVreme.innerHTML=date;
        divOsmi.appendChild(labDatumVreme);

         //dugme - Dodaj

         let btnDodajRecenziju=document.createElement("button");
         btnDodajRecenziju.className="btnDodajRecenziju";
         btnDodajRecenziju.id="btnDodajRecenziju"+grad;
         btnDodajRecenziju.innerHTML="Dodaj novu recenziju";
         btnDodajRecenziju.onclick=(ev)=>this.dodajNovuRecenziju(tabelaBody,divPrvi,ime,sifra,grad,unosNaziv,unosWebSajt,unosDobreStrane,unosLoseStrane,date);
         divOsmi.appendChild(btnDodajRecenziju);

         //upis kategorija u comboBox, iz baze ih ucitava

        var listaKategorija =[]; //tu listu dodati kao stavke u comboBox

        fetch("https://localhost:5001/Kategorija/PreuzmiKategorije")
        .then(p=>{
            p.json().then(kategorije=>{
                kategorije.forEach(kategorija => {

                    var k = new Kategorija(kategorija.id, kategorija.naziv);
                    listaKategorija.push(k);

                })  
                this.napuniCombo(listaKategorija,comboKategorija); 
            })
        });

        
    }

    
    napuniCombo(lista,combo)
    { 
        lista.forEach(p=>
            {
                let opcija=document.createElement("option");
                opcija.id=p.id;
                opcija.innerHTML=p.naziv;
                opcija.className="opcijeCombo";
                opcija.value=p.naziv; 
                combo.appendChild(opcija);
            })
    }

    prikaziRecenzijeLogovanogKorisnika(telo,ime,sifra,grad) //preuzimam sve recenzije logovanog korisnika
    {
        fetch("https://localhost:5001/Recenzija/PreuzmiSveRecenzijeKorisnika/"+ime+"/"+sifra+"/"+grad,
        {
            method:"GET"
        }).then(response=>{
            if(response.ok)
            {
                response.json().then(podatak=>{        
                    podatak.forEach(p=>
                        {
                            let noviRed=new Tabela(p.kategorija,p.nazivMesta,p.webSajt,p.dobreStrane,p.loseStrane,p.ocena,p.id);
                            noviRed.crtajRedove(telo,grad);
                        })
                })
            }
        })
    }

    crtajTabelu(host,grad)
    {
            //TABELA
            var tabela = document.createElement("table");
            tabela.className="tabela";
            tabela.id="tabelaID"+grad;
            host.appendChild(tabela);
    
            var tabelahead= document.createElement("thead");
            tabela.appendChild(tabelahead);

            var tr = document.createElement("tr");
            tabelahead.appendChild(tr);

            let th;
            let i=1;
            var zag=["Kategorija", "Naziv", "Web sajt", "Dobre strane", "Lose strane", " Ocena"," "];
            zag.forEach(el=>{
            
                th = document.createElement("th");
                th.innerHTML=el;
                th.id=el;
                th.className="zag"+i;
                i++;
                console.log("zaglavlje",th.className);
                tr.appendChild(th);
              
            })

            var tabelaBody = document.createElement("tbody");
            tabelaBody.className="TabelaPodaci";
            tabela.appendChild(tabelaBody);

        return tabelaBody;
    }

    dodajNovuRecenziju(teloTabele,host,ime,sifra,grad,unosNaziva,unosWebSajt,unosDobreStrane,unosLoseStrane,date)
    {
        let selKategorija=host.querySelector('option:checked').value;
        let valNaziv=unosNaziva.value;
        let valWebSajt=unosWebSajt.value.toString();
        let valDobreStrane=unosDobreStrane.value;
        let valLoseStrane=unosLoseStrane.value
        let selOcena = document.querySelector("input[type='radio']:checked")?.value;

        if( valWebSajt===null || valWebSajt===undefined || valWebSajt==="")
        {
            valWebSajt=" ";
          
        }
        if(valDobreStrane===null || valDobreStrane===undefined || valDobreStrane==="")
        {
            valDobreStrane="-";
        }
        if(valLoseStrane===null || valLoseStrane===undefined || valLoseStrane==="")
        {
            valLoseStrane="-";
        }


        if(valNaziv=="" || selOcena==null || selOcena==undefined) //kad nije selektovao nista, ne reaguje..
        {
            alert("Morate popuniti sva obavezna polja!");
            return; 
        }
        else
        {
            fetch("https://localhost:5001/Recenzija/DodajNovuRecenziju/"+ime+"/"+sifra+"/"+selKategorija+"/"+valNaziv+"/"+grad+"/"+valWebSajt+"/"+valDobreStrane+"/"+valLoseStrane+"/"+date+"/"+selOcena,
            {
                method:"POST"
            }).then(response=>{
                if(response.ok)
                {
                    response.json().then(podatak=>{
                        var novaR=new Tabela(podatak.kategorija,podatak.nazivMesta,podatak.webSajt,podatak.dobreStrane,podatak.loseStrane,podatak.ocena,podatak.idRecenzije);
                        novaR.crtajRedove(teloTabele,grad);
                        alert("Dodata je recenzija");
                    })
                    document.getElementById("selectKategorijaID"+grad).value="kafic"; //inicijalno prva opcija
                    document.getElementById("unosNazivID"+grad).value="";
                    document.getElementById("unosWebSajtID"+grad).value="";
                    document.getElementById("unosDobreStraneID"+grad).value="";
                    document.getElementById("unosLoseStraneID"+grad).value="";
                }
                else if(response.status==400){
                        alert("Neipravni podaci! Proverite da li ste vec uneli recenziju za datu uslugu.");
                }
                else if(response.status==404){
                    alert("Recenzija nije dodata.");
            }

            });
           
          
        }

    }

    

}