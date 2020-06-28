var menuBtn = document.getElementsByTagName('div');

menuBtn[0].addEventListener('click',function() {
	var menuItems = this.nextElementSibling;
	if(menuItems.style.display == "block") {
		menuItems.style.display = "none";
	} else {
		menuItems.style.display = "block";
	}
});

var getVile = document.getElementsByClassName('VilaKolonaOkvir');


for(i = 0; i < getVile.length;i++) {
	getVile[i].addEventListener('click',function() {
		var getNameChild = this.nextElementSibling;
		var getName = getNameChild.innerHTML;
		document.getElementById('Slika').value = getName;
		console.log(this);
		var current = document.getElementsByClassName("active");
		if(current.length > 0) {
    		current[0].className = current[0].className.replace(" active", "");
    	}
    	this.className += " active";

		var getPriceChild = getNameChild.nextElementSibling;
		getPrice = parseInt(getPriceChild.innerHTML);
		document.getElementsByName('CijenaPoDanu')[0].value = getPrice;
	});
}

var priceBtn = document.getElementsByTagName('label')[4];

priceBtn.onclick = function() {
	var getDays = document.getElementById('BrojDana').value;
	var getPrice = document.getElementsByName('CijenaPoDanu')[0].value;
	var finalPrice = getDays * getPrice;
	document.getElementsByName('IznosUkupno')[0].value = finalPrice;
}
