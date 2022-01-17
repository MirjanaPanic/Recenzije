import { Forma } from "./Forma.js";

export class Korisnik
{
    constructor(korisnickoIme,sifra)
    {
        this.korisnickoIme=korisnickoIme;
        this.sifra=sifra;
    }

    crtajLogIn(host)
    {
        let naslov = document.createElement("h1"); //glavni naslov stranice
        naslov.className="naslovStranicePrvi";
        naslov.innerHTML="Pre unosa recenzije, neophodno je da se prijavite";
        document.body.appendChild(naslov);

        let divLogIn=document.createElement("div"); //glavni div za LogIn
        divLogIn.className="divLogIn";
        host.appendChild(divLogIn);

        let div1=document.createElement("div"); //div1 za labelu Korisnicko ime
        div1.className="div1";
        divLogIn.appendChild(div1);

        let div2=document.createElement("div");  //div2 za textBox za unos imena
        div2.className="div2";
        divLogIn.appendChild(div2);

        let div3=document.createElement("div"); //div3 za labelu Sifra
        div3.className="div3";
        divLogIn.appendChild(div3);

        let div4=document.createElement("div");  //div2 za textBox za unos sifre
        div4.className="div4";
        divLogIn.appendChild(div4);

        //korisnicko ime

        let labIme=document.createElement("label");
        labIme.className="labIme";
        labIme.innerHTML="Korisničko ime:";
        div1.appendChild(labIme);

        
        let unosIme=document.createElement("input");
        unosIme.className="unosIme";
        unosIme.id="unosImeId";
        div2.appendChild(unosIme);

        //sifra

        let labSifra=document.createElement("label");
        labSifra.className="labSifra";
        labSifra.innerHTML="Šifra:";
        div3.appendChild(labSifra);

        
        let unosSifra=document.createElement("input");
        unosSifra.className="unosSifra";
        unosSifra.type="password";
        unosSifra.id="unosSifraId";
        div4.appendChild(unosSifra);

        //Prijavi se - dugme

        let btnPrijava=document.createElement("button");
        btnPrijava.className="btnPrijava";
        btnPrijava.innerHTML="Prijavi se";
        btnPrijava.onclick=(ev)=>this.provera(divLogIn,naslov);
        divLogIn.appendChild(btnPrijava);
    }

     provera(divLogin,naslov)
    {
        let kime= document.getElementById("unosImeId").value;
        let ksifra=document.getElementById("unosSifraId").value;


        if(kime=="" || ksifra=="")
        {
            alert("Niste uneli podatke za prijavljivanje!");
        }

       
        fetch("https://localhost:5001/Korisnik/DaLiPostojiKorisnik/"+kime+"/"+ksifra)
        .then (p=> {
                p.json().then(data=>{
                    if(data.korisnickoIme!="ne postoji")
                    {
                        let k=new Korisnik(data.korisnickoIme,data.sifra); //ako postoji korisnik u bazi, vratiti ga za dalji rad s njim
                        alert("Uneli ste korisnicko ime: " + k.korisnickoIme + " i sifru: " + k.sifra); 

                        document.body.removeChild(divLogin);
                        document.body.removeChild(naslov);
                      
                        //korisnik se ulogovao, sada treba da se pojavi forma za unos recenzije

                        let pirot="Pirot";
                        let dimitrovgrad="Dimitrovgrad";

                       
                        let labPirot=document.createElement("h2");
                        labPirot.innerHTML="Recenzije za grad Pirot";
                        labPirot.classList.add("naslovPD");
                        document.body.appendChild(labPirot);
                     
                        let forma1=new Forma();                 
                        forma1.nacrtajFormuZaUnos(k.korisnickoIme,k.sifra,pirot);   
                        
                        let labDimitrovgrad=document.createElement("h2");
                        labDimitrovgrad.className="labDimitrovgrad";
                        labDimitrovgrad.classList.add("naslovPD");
                        labDimitrovgrad.classList.add("dmgLab");
                        labDimitrovgrad.innerHTML="Recenzije za opštinu Dimitrovgrad";
                        document.body.appendChild(labDimitrovgrad);

                        let forma2=new Forma();                 
                        forma2.nacrtajFormuZaUnos(k.korisnickoIme,k.sifra,dimitrovgrad); 
                    }
                    else
                    {
                        alert("Pogresni podaci! Pokusajte ponovo.");
                    }
                })
            })
    }

    

    
}