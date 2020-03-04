
// Dobije se u podsjetniku potrebno staviti prije .validate funkcije, sluzi za regex
$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$("#forma").validate(
    {
        rules: {
            dostavaIme: {
                required: true, // obavezan unos
                regex: /^[A-Z]{1}[A-Za-z]+ [A-Z]{1}[A-Za-z]+$/ // tekstualni podaci, dvije rijeci, prva velika slova u svakoj rijeci
            },
            dostavaAdresa: {
                required:true, // obavezan unos
                regex: /^[A-Z-a-z ]+$/  // samo tekstualni podaci
            },
            dostavaTelefon: {
                required: true, // obavezan unos
                regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
            },
            dostavaGrad: {
                required:true, // obavezan unos
                regex: /^[A-Z-a-z ]+$/  // samo tekstualni podaci
            },
            idProizvoda: {
                required: true,
                regex: /^\d+$/ // Samo brojevi
            },
            kolicina: {
                required: true,
                regex: /^[1-9]+$/ // Samo brojevi
            },
            opcija: {
                required:true
            }

        },

        /* Custom poruke za errore */
        messages: {
            dostavaIme:  {
                required: "Obavezno popuniti",
                regex: "Dvije rijeci, prva velika slova u svakoj rijeci"
            },
            dostavaAdresa:  {
                required: "Obavezno popuniti",
                regex: "Samo tekstualni podaci"
            },
            dostavaTelefon:  {
                required: "Obavezno popuniti",
                regex: "Format: +111-11-111-1111"
            },
            dostavaGrad:  {
                required: "Obavezno popuniti",
                regex: "Samo tekstualni podaci"
            },
            idProizvoda:  {
                required: "Obavezno popuniti",
                regex: "Samo brojevi"
            },
            kolicina:  {
                required: "Obavezno popuniti",
                regex: "Samo brojevi, kolicina mora biti 1 ili veca"
            }
        }
    }
    );


    $("#naruci").on("click", function() {

        /* !!! Da bi validacija radila ispravno na inputima moramo imati name atribute !!! */
        // Pokreni validaciju i provjeri da li je sve ok
        if($("#forma").valid()) {

          /*
            uzmemo iz worda da nam je lakse popuniti request
            "dostavaGrad": "string",
            "dostavaAdresa": "string",
            "dostavaIme": "string",
            "dostavaTelefon": "string",
            "proizvodId": 11,
            "opcijaModel": "string"


            podaci se mogu dodati u objekat na dva nacina

            // prvo definisemo objekat
            var podaci = {};

            podaci.dostavaGrad = $("#dostavaGrad").va();
            podaci.dostavaAdresa = $("#dostavaAdresa").va();
            itd.. 
            ili na nacin ispod odmah sve navesti
          */

          var podaci = {
            dostavaGrad: $("#dostavaGrad").val(),
            dostavaAdresa: $("#dostavaAdresa").val(),
            dostavaIme: $("#dostavaIme").val(),
            dostavaTelefon: $("#dostavaTelefon").val(),
            proizvodId: $("#idProizvoda").val(),
            opcijaModel: $("#opcija").val(),   // input polje u nasem html se zove #opcija, sa lijeve strane ide kako je navedeno u request a sa desne iz naseg html
          }


          // Ovaj kod se koristi iz podsjetnika samo se promjeni mojURL i promjeni sa GET na POST, i doda setRequestHeader
         var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Dodaj';
        
         var zahtjev = new XMLHttpRequest();
        
         zahtjev.onload  = function() { 
                 if (zahtjev.status === 200) {

                    // Ako je vratio neki reponse ucitaj opet tabelu narudzbe i resetuj formu
                    if(zahtjev.responseText) {
                        getNarudzbe();
                        $("#forma")[0].reset();
                    }
                     
                 }
                 else {  
                     alert("Server javlja grešku: " + zahtjev.statusText);  
                 }  
         }
     
         zahtjev.onerror = function() {
             alert("Greška u komunikaciji sa serverom.");  
         };
     
         // !!!!! Za dodanje na server moramo koristiti POST !!!!
         zahtjev.open("POST", mojUrl, true);
         zahtjev.setRequestHeader("Content-Type", "application/json");
         // JSON.stringify() sluzi da prebacimo iz objekta JSON format, jer samo JSON format api server prima podatke 
         zahtjev.send(JSON.stringify(podaci));


        }

    });


    /* Odaberi button */
    /* Elemente ucitane preko ajaxa moramo force pretragu preko body ili nekog parent diva, inace ih ne moze naci */
    $("body").on("click", ".odaberi", function() {
        // Trenutni elemenat je button, trebamo se vratiti u td, pa u tr i traziti proizvodID prema predhodno definisanoj klasi koja sluzi kao identifikator
        // koristi se .text() jer nije input, samo za inpute koristimo .val()
        var id = $(this).parent().parent().find(".id").text();
        var naziv = $(this).parent().parent().find(".naziv").text();

        // Koristimo ajax request kod iz podsjetnika koji se dobija na ispitu
        // Samo se doda url iz worda do proizvodId= i onda poslje apostrofa +id
        var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodOpcije?proizvodId='+id;
        
        var zahtjev = new XMLHttpRequest();
       
        zahtjev.onload  = function() {
                if (zahtjev.status === 200) {
                    // Ako je odaberi zahtjev prosao ok dodajemo u formu podatke i opcije
                    


                    // Dodajemo proizvodId u formu
                    $("#idProizvoda").val(id);

                    // Moramo prebaciti u json format iz texta kako bi mogli proci kroz niz
                    var niz = JSON.parse(zahtjev.responseText);

                    // Brisemo predhodne rezultate iz select inputa
                    $("#opcija").html('');

                    // Dodajemo nove podatke
                    for(var i=0; i<niz.length; i++) {
                        // Option izgleda ovako u html <option value="vrijednost koja se salje kad se submit uradi">Korisnik sto vidi</option>
                        var red = '<option value="'+niz[i]+'">'+niz[i]+'</option>';
                        $("#opcija").append(red);

                    }

                    // Update naziv u formi
                    $("#nazivProizvoda").val(naziv);
                    // Kolicinu stavimo 1
                    $("#kolicina").val(1);
                    
                }
                else {  
                    alert("Server javlja grešku: " + zahtjev.statusText);  
                }  
        }
    
        zahtjev.onerror = function() {
            alert("Greška u komunikaciji sa serverom.");  
        };
    
        zahtjev.open("GET", mojUrl, true);
        zahtjev.send(null);


    });


    /* Like button */
    /* Elemente ucitane preko ajaxa moramo force pretragu preko body ili nekog parent diva, inace ih ne moze naci */
    $("body").on("click", ".like", function() {
        
        // Trenutni elemenat je button, trebamo se vratiti u td, pa u tr i traziti proizvodID prema predhodno definisanoj klasi koja sluzi kao identifikator
        // koristi se .text() jer nije input, samo za inpute koristimo .val()
        var id = $(this).parent().parent().find(".id").text();

        // Koristimo ajax request kod iz podsjetnika koji se dobija na ispitu
        // Samo se doda url iz worda do proizvodId= i onda poslje apostrofa +id
        var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Like?proizvodId='+id;
        
        var zahtjev = new XMLHttpRequest();
       
        zahtjev.onload  = function() {
                if (zahtjev.status === 200) {
                    // Ako je like zahtjev prosao ok radimo reload tabele proizvodi 
                    getProizvodi();
                }
                else {  
                    alert("Server javlja grešku: " + zahtjev.statusText);  
                }  
        }
    
        zahtjev.onerror = function() {
            alert("Greška u komunikaciji sa serverom.");  
        };
    
        zahtjev.open("GET", mojUrl, true);
        zahtjev.send(null);


    });

function getNarudzbe() {

    /*
    Ovako nam izgleda html
        <th>ID</th>
      <th>Naziv</th>
      <th>Cijena</th>
      <th>Kolicina</th>
      <th>Iznos</th>
      <th>Ime</th>
      <th>Adresa</th>
      <th>Datum</th>
      <th>Telefon</th>
      */

    // Učitavanje tekst dok ne ucita
    $("#narudzbe tbody").html("<h1>Učitavanje</h1>");

    var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetNarudzbeAll';
        
    var zahtjev = new XMLHttpRequest();
   
    zahtjev.onload  = function() { 
            if (zahtjev.status === 200) {
                var podaci = JSON.parse(zahtjev.responseText);

                // Koje podatke vraca mozemo provjeriti sa console.log i pogledati u developer konzoli tab "console"
                console.log(podaci);

                    // Prije ucitavanja ocistimo tabelu, da ne bi doslo do duplikata
                    $("#narudzbe tbody").html('');

                for(var i=0; i<podaci.length; i++) {

                    var red = "";


                    // tr je novi red
                    // td je kolona, td moramo imati koliko th u html
                    red += '<tr>';
                    //  ID kolona
                    red += '<td class="id">';
                    red += podaci[i].proizvodID;
                    red += '</td>';
                    // Naziv
                    red += '<td>';
                    red += podaci[i].naziv;
                    red += '</td>';
                    // Cijena
                    red += '<td class="naziv">';
                    red += podaci[i].cijena;
                    red += '</td>';
                    // Kolicina
                    red += '<td>';
                    red += podaci[i].kolicina;
                    red += '</td>';
                    // Iznos
                    red += '<td>';
                    red += podaci[i].iznos;
                    red += '</td>';
                    // Ime
                    red += '<td>';
                    red += podaci[i].dostavaIme;
                    red += '</td>';
                    // Adresa 
                    red += '<td>';
                    red += podaci[i].dostavaAdresa;
                    red += '</td>';
        
                    // Datum 
                    red += '<td>';
                    red += podaci[i].datumNarudzbe;
                    red += '</td>';
            
                    // Telefon 
                    red += '<td>';
                    red += podaci[i].dostavaTelefon;
                    red += '</td>';

                    red += "</tr>";
                    $("#narudzbe tbody").append(red);

        
                }
            }
            else {  
                alert("Server javlja grešku: " + zahtjev.statusText);  
            }  
    }

    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");  
    };

    zahtjev.open("GET", mojUrl, true);
    zahtjev.send(null);




}
function getProizvodi() {

    // Učitavanje tekst dok ne ucita
    $("#proizvodi tbody").html("<h1>Učitavanje</h1>");



    var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll';
        
    var zahtjev = new XMLHttpRequest();
   
    zahtjev.onload  = function() { 
            if (zahtjev.status === 200) {
                var podaci = JSON.parse(zahtjev.responseText);

                // Prije ucitavanja ocistimo tabelu, da ne bi doslo do duplikata
                $("#proizvodi tbody").html("");

                for(var i=0; i<podaci.length; i++) {

                    var red = "";

                    red += '<tr>';
                    // Proizvod ID kolona
                    red += '<td class="id">';
                    red += podaci[i].proizvodID;
                    red += '</td>';
                    // Likes kolona
                    red += '<td>';
                    red += podaci[i].likeCounter;
                    red += '</td>';
                    // Naziv kolona
                    red += '<td class="naziv">';
                    red += podaci[i].naziv;
                    red += '</td>';
                    // Slika kolona
                    red += '<td>';
                    red += '<img src="'+podaci[i].slikaUrl+'">';
                    red += '</td>';
                    // Cijena kolona
                    red += '<td>';
                    red += podaci[i].cijenaPoKvadratu;
                    red += '</td>';
                    // Like kolona
                    red += '<td>';
                    red += '<button class="like">Like</button>';
                    red += '</td>';
                    // Odaberi kolona 
                    red += '<td>';
                    red += '<button class="odaberi">Odaberi</button>';
                    red += '</td>';

                    red += "</tr>";
                    $("#proizvodi tbody").append(red);

        
                }
            }
            else {  
                alert("Server javlja grešku: " + zahtjev.statusText);  
            }  
    }

    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");  
    };

    zahtjev.open("GET", mojUrl, true);
    zahtjev.send(null);

}

getProizvodi();
getNarudzbe();



/* Nije potrebno u ovom zadatku padajuci meni ali evo nacin kako se radi preko jquery najbrze */
// $("#IzbornikDugme").on("click", function() {
//     $("#Izbornik").toggle();
// });
