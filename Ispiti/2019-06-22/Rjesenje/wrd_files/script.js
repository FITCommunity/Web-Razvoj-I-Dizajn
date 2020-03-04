var elementi= document.getElementsByClassName('VilaKolonaOkvir');

for(var i=0; i<elementi.length; i++) {

    elementi[i].onmouseover = hoveruj;
    elementi[i].onmouseout  = iskljuciHover;
}

function hoveruj() {
   this.style.border = '3px solid yellow';
}

function iskljuciHover() {
    this.style.border = 'none';
}

$(function ()  {

    function ucitajNovo() {
        $("tbody").html('');
        $.ajax({
            url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll',
            success: function(rez) {
                rez.reverse();
                for(var i=0; i<rez.length; i++) {
    
                    var datum = new Date(rez[i].datumNarudzbe).toISOString().slice(0, 10);
                    
                    var rastaviDatum = datum.split('-');
                  
                    datum = rastaviDatum[2]+'.'+rastaviDatum[1]+'.'+rastaviDatum[0];
                
    
                    $("tbody").append('<tr><td>'+rez[i].narudzbaId+'</td><td>'+datum+'</td><td class="imet">'+rez[i].dostavaIme+'</td><td>'+rez[i].dostavaAdresa+'</td><td>'+rez[i].dostavaPostanskiBroj+'</td><td>'+rez[i].dostavaTelefon+'</td><td>'+rez[i].napomena+'</td></tr>')
                }
            }
        });
    }

$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Unos nije validan!"
);

var forma = $("#forma");


forma.validate({
    rules: {
        dostavaIme: {
            required: true
        },
        dostavaAdresa: {
            required:true,
        },
        dostavaPostanskiBroj: {
            required:true,
	    regex: /^[0-9]{5}$/,
            minlength:5,
            maxlength:5
        },
        dostavaTelefon: {
            required:true,
            regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
        }
    },
    messages: {
        dostavaIme:{
            required: "Morate unijeti ime kupca!"
        },
        dostavaAdresa: {
            required: "Morate unijeti adresu!"
        },
        dostavaPostanskiBroj: {
            required: "Morate unijeti poštanski broj!",
            regex: "Poštanski broj mora biti brojčana vrijednost od 5 cifara!",
            minlength: "Poštanski broj mora sadržavati 5 cifara!",
            maxlength: "Poštanski broj mora sadržavati 5 cifara!"
        },
        dostavaTelefon: {
            required: "Morate unijeti broj telefona!",
            regex: "Telefon mora biti unijet u formatu: +387-11-123-1234"
        }
    }
});

$("#dodaj").on('click', function() {

    if(forma.valid()) {
        event.preventDefault();
    
        var podaci = {
            dostavaIme: $('#dostavaIme').val(), 
            dostavaAdresa: $('#dostavaAdresa').val(), 
            dostavaPostanskiBroj: $('#dostavaPostanskiBroj').val(), 
            dostavaTelefon: $('#dostavaTelefon').val(), 
            napomena: $('#napomena').val(), 
        }
        $.ajax({
            url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(podaci),
            success: function(rez) {
                if(rez.poruka){
                    ucitajNovo();
                    $("#forma")[0].reset();
                }
            }
        });
    }
});

$("#filtiranje").on('keyup', function() {
    var trazi = $("#filtiranje").val();
    var elementi = $(".imet");

    $("tbody tr").hide();
  
    $.each(elementi, function(index, value) {
        var ime = value.innerHTML;

        ime = ime.toLowerCase();
        trazi = trazi.toLowerCase();
  
        if(ime.search(trazi)>= 0) {
            value.parentElement.style.display ='table-row';
        }

    });

});


$("#IzbornikDugme").on('click', function() {
    $("#Izbornik").toggleClass('vidljivo');
});




ucitajNovo();

});

