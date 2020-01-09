# WRD - Praktični ispit - Parcijalno i integralno

Zadatak preuzeti s ftp servera. Za izradu zadatka koristiti bilo editor po želji. U rješenju posebno razdvojiti css, html i js fileove. Folder koji sadrži sve potrebne file-ove imenovati brojem indexa sa naznakom "integralno" ili "parcijalno", zapakovati u ZIP format i postaviti na ftp u odgovarajuci folder (primjer imena file-a IB-111111-integralno.zip ili IB-222222-parcijalno.zip). Obratiti pozornost na minimizaciju HTML/CSS te JavaScript koda koja, kod svakog zadatka, donosi veći broj bodova. Studenti koji ispit rade integralno rade sve zadtke. Studenti koji rade drugi parcijalni ispit, trebaju uraditi samo zadatke 3 i 4.
Po potrebi mozete ukljucti jQuery, jQuery UI i jQuery validator biblioteke.
Podaci za pristup FTP Serveru:
* Username: student_eb
* Password: student_eb

## Zadatak 1 (HTML+CSS) (ukupno 30 bodova – samo Integralno) :

Prema priloženoj formi wrd-1.png markup-u wrdIntegralno.html napraviti HTML stranicu s pripadajućim css-om. Stavke na navigacijskom menu-u mijenjaju boju prilikom hovera mišem. Izgled navigacijskog menija pogledati u priloženom file-u CSS Menu.jpg

## Zadatak 2 (HTML+CSS responsive stranica za mobilne uređaje – samo Integralno) (ukupno 20 bodova) :

Prema priloženoj formi stranica.jpg uciniti HTML stranicu iz zadatka 1 responsivnom da bude prilagođena mobilnim uređajima. Promjena izgleda stranice treba se desiti kada širina prozora browser-a postanje manja od 600px. Stavke na navigacijskom menu-u mijenjaju boju prilikom hovera mišem. Izgled navigacijskog menija pogledati u nastavku ove specifikacije u djelu Izgled menija na hover (CSS). 

## Zadatak 3 (JavaScript ili jQuery validacija) 

*Integralno: Ukupno 10 bodova*  
*Drugi parcijalni: Ukupno 20 bodova (raditi na file-u wrd2parc.html)*

Ostvariti validaciju podataka u input box na slijedeci nacin:
* Ime – tekstualni podaci
* Adresa – tekstualni podaci
* Postanski broj – numericki, 5 cifara
* Broj telefona – format: +111-11-111-1111

## Zadatak 4 (JavaScript ili jQuery CRUD):

*Integralno: Ukupno 20 bodova*  
*Drugi parcijalni: Ukupno 80 bodova (raditi na file-u wrd2parc.html)*

Integralni i parcijalni:
* Obezbjediti unos podataka preko web servisa
* Prilikom unosa svakog novog podatka, ucitati podatke u tabelu ispod forme kao na slici u prilogu
* Za unos i ucitavanje podataka koristiti web servise:
    * http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll
    * http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj

JSON format podataka za Dodaj akciju web servisa je
```json
{
  "dostavaAdresa": "string",
  "dostavaIme": "string",
  "dostavaPostanskiBroj": "string",
  "dostavaTelefon": "string",
  "napomena": "string"
}
```

Samo drugi parcijalni:
* Obezbjediti mogucnost filtera podataka u tabeli tako sto ce se prilikom unosa teksta u polje za pretragu, u tabeli ostajati samo oni podaci koji u polju "Ime" zadovoljavaju kriterije pretrage.

**Napomena: U prilogu se nalaze se sintaksni potsjetnici za HTML, CSS i jQuery.**

**Kotiranje stranice**

![Kotiranje stranice](src-readme/Slika_01.png)

Za ostatak stranice koji nije kotiran, procijeniti veličinu prema slici.
Obratiti pažnju na scroll bar sa desne strane. Pomoć: 
* odnosi se samo na desni div,
* moguće rješenje:
    * nav postaviti kao fixed a wrapper postaviti lijevu marginu veću od širine nav-a, ili
    * lijevu i desnu strana postaviti kao fixed sa visinom 100%, a desnoj strani dodati overflow.


**U nastavku su print screen-ovi sa detaljima izgleda i funkcionalnosti**

**Osnovni izgled stranice**

**Izgled donjeg djela desne strane**

**Klikom na sliku, slika dobova žuti okvir (JavaScript)**

![Osnovni izgled stranice](src-readme/Slika_02.png)

**Hover pointerom preko slike rezultira implementacijom opacity 80% (CSS).**

![Hover](src-readme/Slika_03.png)
![Hover](src-readme/Slika_04.png)
![Hover](src-readme/Slika_05.png)

**Izgled menija na hover (CSS)**

![Meni on hover](src-readme/Slika_06.png)

**Izgled stranice na mobilnom uređaju (ispod 600px širine)**

**Slike su jedna ispod druge.**

![Mobile](src-readme/Slika_07.png) ![Mobile](src-readme/Slika_08.png)

![Mobile](src-readme/Slika_09.png)


