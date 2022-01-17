export class Tabela
{
    constructor(kategorija,nazivMesta,webSajt,dobreStrane,loseStrane,ocena,idRecenzije)
    {
        this.kategorija=kategorija;
        this.nazivMesta=nazivMesta;
        this.webSajt=webSajt;
        this.dobreStrane=dobreStrane;
        this.loseStrane=loseStrane;
        this.ocena=ocena;
        this.idRecenzije=idRecenzije;
    }

    crtajRedove(teloTabele,grad)
    {
        var trr=document.createElement("tr");
        trr.className="redTabele";
        teloTabele.appendChild(trr);

        var el0=document.createElement("td");
        el0.innerHTML=this.idRecenzije;
        el0.className="idRecenzijeTD";
        trr.appendChild(el0);

        var el1=document.createElement("td");
        el1.innerHTML=this.kategorija;
        el1.classList.add("kategorijaTD");
        trr.appendChild(el1);

        var el2=document.createElement("td");
        el2.innerHTML=this.nazivMesta;
        el2.className="nazivMestaTD";
        trr.appendChild(el2);

    //     var a = document.createElement('a'); 
    //     var el4=document.createElement("td");
    //     var link = document.createTextNode(this.webSajt);
    //     a.appendChild(link); 
    //    // a.title = this.webSajt; 
    //     //a.innerHTML=this.webSajt;       
    //     a.href = this.webSajt; 
    //     el4.appendChild(a); 
    //     el4.classList.add("websajtTD");
    //     trr.appendChild(el4);

        var el4=document.createElement("td");
        el4.innerHTML=this.webSajt;
        el4.classList.add("websajtTD");
        trr.appendChild(el4);

        var el5=document.createElement("td");
        el5.innerHTML=this.dobreStrane;
        el5.classList.add("dobrestrTD");
        trr.appendChild(el5);

        var el6=document.createElement("td");
        el6.innerHTML=this.loseStrane;
        el6.classList.add("losestrTD");
        trr.appendChild(el6);

        var el7=document.createElement("td");
        el7.innerHTML=this.ocena;
        el7.classList.add("ocenaTD");
        trr.appendChild(el7);

        let btnIzmena=document.createElement("button");
        btnIzmena.innerHTML="Izmeni";
        btnIzmena.className="btnIO";
        btnIzmena.onclick=(ev)=>this.Izmeni(grad,trr);

        let btnObrisi=document.createElement("button");
        btnObrisi.innerHTML="Obrisi";
        btnObrisi.className="btnIO";
        btnObrisi.onclick=(ev)=>this.Obrisi(grad,trr);

        var divIzmedju=document.createElement("div");
        divIzmedju.className="divI";

        var el8=document.createElement("td"); 
        el8.appendChild(btnIzmena);
        el8.appendChild(divIzmedju);
        el8.appendChild(btnObrisi);
        el8.classList.add("dugmiciTD");
        trr.appendChild(el8);
        trr.appendChild(el8);
    }

   Izmeni(grad,tr)
   {
      
            var table=document.getElementById("tabelaID"+grad); 
            var rIndeks=document.getElementById("tabelaID"+grad); 

            rIndeks=tr.rowIndex;  
           
                
                var recenzijaID=tr.cells[0].innerHTML; //id recenzije iz baze 
                var izabranaKategorija=document.getElementById("selectKategorijaID"+grad).value=tr.cells[1].innerHTML;
                var unosNaziva=document.getElementById("unosNazivID"+grad).value=tr.cells[2].innerHTML;
               
               //var link= tr.cells[3].getElementByTagName('a');
               //var celData=link.getAttribute('href');
               //console.log("LINK JE",celData);
             
                var unosWS=document.getElementById("unosWebSajtID"+grad).value=tr.cells[3].innerHTML; 
                var unosDobrihStr= document.getElementById("unosDobreStraneID"+grad).value=tr.cells[4].innerHTML;
                var unosLosihStr=document.getElementById("unosLoseStraneID"+grad).value=tr.cells[5].innerHTML;
                var uzmiOcenu=tr.cells[6].innerHTML;
                document.getElementById("radio"+grad+uzmiOcenu).checked=true;

               
                var divUzmi=document.getElementById("divOsmi"+grad);
        
                var dugmeUzmi=document.getElementById("btnDodajRecenziju"+grad);
            
                divUzmi.removeChild(dugmeUzmi);

                var dugmeSave=document.createElement("button");
                dugmeSave.className="btnDodajRecenziju";
                dugmeSave.id="btnSacuvajIzmene"+grad;
                dugmeSave.innerHTML="Sacuvaj izmene";
                divUzmi.appendChild(dugmeSave);

                var dugmeOdustani=document.createElement("button");
                dugmeOdustani.className="btnDodajRecenziju";
                dugmeOdustani.classList.add("btnOdustani");
                dugmeOdustani.id="btnOdustani"+grad;
                dugmeOdustani.innerHTML="Odustani";
                divUzmi.appendChild(dugmeOdustani);

                dugmeOdustani.onclick=(ev)=>
                {
                    divUzmi.removeChild(dugmeSave);
                    divUzmi.removeChild(dugmeOdustani);
                    divUzmi.appendChild(dugmeUzmi);
                    document.getElementById("selectKategorijaID"+grad).value="kafic"; //inicijalno prva opcija
                    document.getElementById("unosNazivID"+grad).value="";
                    document.getElementById("unosWebSajtID"+grad).value="";
                    document.getElementById("unosDobreStraneID"+grad).value="";
                    document.getElementById("unosLoseStraneID"+grad).value="";
                }

                dugmeSave.onclick=(ev)=>
                {
                    var noviNaziv=document.getElementById("unosNazivID"+grad).value;
                    var novaKategorija=document.getElementById("selectKategorijaID"+grad).value;
                    var noviWS=document.getElementById("unosWebSajtID"+grad).value;
                    var noveDobreStr= document.getElementById("unosDobreStraneID"+grad).value;
                    var noveLoseStr=document.getElementById("unosLoseStraneID"+grad).value;
                    var novaOcena=document.querySelector("input[type='radio']:checked").value;

                    if( noviWS===null || noviWS===undefined || noviWS==="")
                    {
                        noviWS=" ";
                      
                    }
                    if(noveDobreStr===null || noveDobreStr===undefined || noveDobreStr==="")
                    {
                        noveDobreStr="-";
                    }
                    if(noveLoseStr===null || noveLoseStr===undefined || noveLoseStr==="")
                    {
                        noveLoseStr="-";
                    }
            
            
                    if(noviNaziv=="" || novaOcena==null || novaOcena==undefined) //kad nije selektovao nista, ne reaguje..
                    {
                        alert("Morate popuniti sva obavezna polja!");
                        return; 
                    }
            
            
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;
            
            
                    fetch("https://localhost:5001/Recenzija/IzmeniPostojecuRecenziju/"+recenzijaID+"/"+noviWS+"/"+noveDobreStr+"/"+noveLoseStr+"/"+novaOcena+"/"+date,
                    {
                        method:"PUT"
                    }).then(response=>{
                        if(response.ok)
                        {
                            response.json().then(podatak=>{
                        
                                tr.cells[3].innerHTML=podatak.webSajt;
                                tr.cells[4].innerHTML=podatak.dobreStrane;
                                tr.cells[5].innerHTML=podatak.loseStrane;
                                tr.cells[6].innerHTML=podatak.ocena;
                            
                                document.getElementById("selectKategorijaID"+grad).value="kafic"; //inicijalno prva opcija
                                document.getElementById("unosNazivID"+grad).value="";
                                document.getElementById("unosWebSajtID"+grad).value="";
                                document.getElementById("unosDobreStraneID"+grad).value="";
                                document.getElementById("unosLoseStraneID"+grad).value="";
                            })
                        }
                        else if(response.status==404){
                                alert("Recenzija nije uspesno izmenjena.");
                        }
                    });
            
                    divUzmi.removeChild(dugmeSave);
                    divUzmi.removeChild(dugmeOdustani);
                    divUzmi.appendChild(dugmeUzmi);
                }
               
                
    }

 


    Obrisi(grad,tr)
   {
       var table=document.getElementById("tabelaID"+grad); 
       var rIndeks=document.getElementById("tabelaID"+grad); 
       rIndeks=tr.rowIndex;
       console.log("dugme obrisi kliknuto, uzeo red",rIndeks);

       var recenzijaID=tr.cells[0].innerHTML; //id recenzije iz baze
               
                fetch("https://localhost:5001/Recenzija/ObrisiPostojecuRecenziju/"+recenzijaID,
                {
                    method:"DELETE"
                }).then(response=>{
                    if(response.ok)
                    {
                        //obrisao je u bazi, sad mogu da obrisem i u tabelu taj red.
                        table.deleteRow(rIndeks);
                    }
                    else if(response.status==404){
                            alert("Recenzija nije uspesno obrisana.");
                    }
            })
       
     }
    




}


   