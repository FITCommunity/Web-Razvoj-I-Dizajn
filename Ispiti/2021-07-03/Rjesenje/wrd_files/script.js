$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Provjeri unos!<br>"
);
$("#forma").validate({
    rules: {
        naslov: {
            required: true,
            regex: /^[A-Z][a-zA-Z ]+[a-zA-Z]$/,
        },
        telefon: {
            required: true,
            regex: /^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/,
        },
    },
    messages: {
        naslov: {
            required: "Obavezno polje!",
            regex: "Minimalno dvije riječi. Prva riječ počinje velikim slovom.",
        },
        telefon: {
            required: "Obavezno polje!",
            regex: "Format +111-11-111-1111",
        },
        poruka: {
            required: "Obavezno polje!",
        },
    },
});

const getPodatke = (url, callback) => {
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Server javlja grešku: " + zahtjev.statusText);
            }
        })
        .then((response) => {
            callback(response);
        })
        .catch((error) => {
            alert(error);
        });
};

let baseUrl = "https://restapiexample.wrd.app.fit.ba/Ispit20210702";

const kreirajRadnika = (obj) => {
    return `<img src="${obj.slikaPutanja}"/>
        <div class="tekstRadnika">
            <h3>${obj.imePrezime}</h3>
            <p>${obj.opis}</p>
            <button>Piši poruku</button>
        </div>`;
};

const postaviRadnike = (obj) => {
    var containers = document.querySelectorAll("[id^=radnik]");

    for (var i = 0; i < obj.length; i++) {
        containers[i].innerHTML = kreirajRadnika(obj[i]);
    }
};

const postaviPrimaoca = (primaoc) => {
    let input = document.querySelector("#forma input#primaoc");
    input.value = primaoc;
};

$(document).on("click", "[id^=radnik] button", (e) => {
    let primaoc = e.target
        .closest(".tekstRadnika")
        .querySelector("h3").innerHTML;

    postaviPrimaoca(primaoc);
});

const posaljiPoruku = (url, data) => {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            alert(response.status);
            if (response.status !== 200) {
                alert("Doslo je do greske na serveru: " + response.status);
                return;
            } else {
                response.json().then((response) => {
                    console.log(response);
                });
            }
        })
        .catch((error) => {
            alert("Doslo je do nepoznate greske " + error);
        });
};

getPodatke(baseUrl + "/Get4Studenta", postaviRadnike);

const sendMessage = () => {
    let message = {
        imePrezime: document.getElementById("primaoc").value,
        naslov: document.getElementById("naslov").value,
        telefon: document.getElementById("telefon").value,
        poruka: document.getElementById("poruka").value,
        datumVrijeme: new Date().toISOString(),
    };

    posaljiPoruku(baseUrl + "/Add", message);
};

$("#IzbornikDugme").on("click", function () {
    //padajuci meni za telefon
    $("#Izbornik").toggle();
});
