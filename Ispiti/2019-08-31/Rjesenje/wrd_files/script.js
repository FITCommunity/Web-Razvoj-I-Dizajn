$(function() {

    function ucitajProzivode() {
        $("#proizvodiTabela tbody").html('');

        $.ajax({
            url: 'https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetProizvodiAll',
            success: function(podaci) {

                for(var i=0; i<podaci.length; i++) {
    
                    var red = '<tr>'+
                    '<td class="IDp">'+podaci[i].proizvodID+'</td>'+
                    '<td>'+ podaci[i].naziv + '</td>' +
                    '<td>'+ podaci[i].cijena + '</td>'+
                    '<td>'+ podaci[i].jedinicaMjere + '</td>'+
                    '<td>'+ podaci[i].likeCounter + '</td>'+
                    '<td><button class="likeBtn">Like</button></td>'+
                    '<td><button class="odaberi">Odaberi</button></td>'+
                    +'</tr>';
            
                    $("#proizvodiTabela tbody").append(red);
                }
            }
        });
        
    }

    function ucitajNarudzbe() {
        $("#narudzbe tbody").html('');

        $.ajax({
            url: 'https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/GetNarudzbeAll',
            success: function(podaci) {

                for(var i=0; i<podaci.length; i++) {
    
                    var red = '<tr>'+
                    '<td>'+podaci[i].proizvodID+'</td>'+
                    '<td>'+ podaci[i].naziv + '</td>' +
                    '<td>'+ podaci[i].cijena + '</td>'+
                    '<td>'+ podaci[i].kolicina + '</td>'+
                    '<td class="ime">'+ podaci[i].dostavaIme + '</td>'+
                    '<td>'+ podaci[i].dostavaAdresa + '</td>'+
                    '<td>'+ podaci[i].dostavaTelefon + '</td>' + 
                    '</tr>';
            
                    $("#narudzbe tbody").append(red);
                }
            }
        });
    }

    $("#proizvodiTabela").on("click", ".odaberi", function(){
        var id = $(this).parent().parent().find('.IDp').text();
        
        $("#proizvodID").val(id);
    });

    $("#proizvodiTabela").on("click", ".likeBtn", function(){
        
        var id = $(this).parent().parent().find('.IDp').text();

        var podaci= {
            proizvodID: id
        };
        $.ajax({
            url: 'https://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Like',
            data: podaci,
            success: function(rez)
            {
                if(rez) {
                    ucitajProzivode();
                }
            }
            


        });

    });
    
var forma = $("#forma");


$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Unos nije validan!"
);


forma.validate({
    rules: {
        dostavaIme: {
            required: true,
            regex: /^[A-Z]{1}[A-Za-z]+ [A-Z]{1}[A-Za-z]+$/
        },
        dostavaAdresa: {
            required:true,
        },
        dostavaGrad: {
            required:true,
        },
        proizvodID: {
            regex: /^\d+$/,
            required:true,
        },
        kolicina: {
            regex: /^\d+$/,
            required:true,
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
        dostavaGrad: {
            required: "Morate unijeti grad!"
        },
        proizvodID: {
            regex: "Samo brojevi",
            required: "Morate odabrati proizvod!"
        },
        kolicina: {
            regex: "Samo brojevi",
            required: "Morate odabrati proizvod!"
        },

        dostavaTelefon: {
            required: "Morate unijeti broj telefona!",
            regex: "Telefon mora biti unijet u formatu: +387-11-123-1234"
        }
    }
});

$("#dodaj").on('click', function() {

    event.preventDefault();

    if(forma.valid()) {

        var podaci = {
            dostavaGrad: $('#dostavaGrad').val(), 
            dostavaAdresa: $('#dostavaAdresa').val(), 
            dostavaIme: $('#dostavaIme').val(), 
            dostavaTelefon: $('#dostavaTelefon').val(), 
            proizvodId: $('#proizvodID').val(), 
            kolicina: $('#kolicina').val()
        }

        $.ajax({
            url: 'http://onlineshop.wrd.app.fit.ba/api/ispit20190829/Narudzba/Dodaj',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(podaci),
            success: function(rez) {
                if(rez.poruka){
                    ucitajNarudzbe();
                    $("#forma")[0].reset();
                }
            }
        });
    }

});



$("#filtiranje").on('keyup', function() {
    var trazi = $("#filtiranje").val();
    var elementi = $("#narudzbe .ime");

    $("#narudzbe tbody tr").hide();
  
    $.each(elementi, function(index, value) {
        var ime = $(value).text();

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

// Prvo ucitavanje stranice ucitavamo nove podatke, popunjavamo tabele
ucitajProzivode();
ucitajNarudzbe();

});