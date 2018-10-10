$(function() {

    var target = new Target();
    var pricesBox = new PricesBox();
    var winScreen = new WinScreen();
    var doRandomShifting = false;

    window.document.addEventListener("keydown", function (e) {
      if (e.keyCode === 65)
        doRandomShifting = !doRandomShifting;
    });

    target.mouseover(function () {
        if (doRandomShifting === true)
          target.setPositionRandom();
    });

    target.click(function () {
		target.clicked();
        winScreen.setPrice(pricesBox.getPrice());
        winScreen.show();

        (function () {
            var showingTime = 5;
            winScreen.hideAfter(showingTime * 1000);
			target.hideAndReAppearAfter(showingTime * 1000);
            winScreen.paraph.append(" >> [" + showingTime + "]");

            var timerID = window.setInterval(function () {
                if (--showingTime > 0)
                    winScreen.paraph.append(" >> [" + showingTime + "]");

                else
                    window.clearInterval(timerID);
            }, 1000);
        })();
    });
})

function rand(pMin, pMax)
{
    return (Math.floor(((Math.random() * (pMax-pMin+1)) + pMin)));
}

function PricesBox()
{
    this.prices = [
    "une bicyclette",
    "un formidable rhododendron",
    "une cuillère déformable",
    "un ballon de baudruche",
    "une salopette en papier maché",
    "une authentique photographie de Mamie Popin's",
    "une super punaise",
    "une partie gratuite supplémentaire",
    "un cadeau surprise caché quelque part dans le code source",
    "un voyage pour deux personnes à Tourcoing",
    "une table basse en authentique cartons d'emballages de corn flakes",
    "une chaise pliante Ikea",
    "un tableau noir pour écrire des histoires et des équations",
    "un feutre qui sent bon",
    "une pochette en carton pour ranger ses papiers importants",
    "un morceau de carrelage de 18cm sur 39.7cm",
    "une tige en bambou",
    "un masque de canard à mettre lors de ses promenades matinales avec sa bande de canard le long du canal",
    "une collection de 765 boutons de toutes les couleurs et de toutes les formes",
    "un magnifique candélabre noir d'une hauteur de 20 cm, bougies non fournies",
    "un superbe accordeur pour violon d'ingre, piles non fournies",
    "un superbe accordéon d'ingre, piles non fournies",
    "le droit à l'exaltation, droit inaliénable dû à tout individu"
    ];

    this.getPrice = function () {
        return (this.prices[rand(0, (this.prices.length - 1))]);
    }
}

function WinScreen()
{
    this.jQEl = $("<div id=\"win_screen\">");
	this.jQEl.fadeOut(0);
    this.jQEl.css({
        "background-color": "#8cff66",
        "padding": "0px",
        "border": "black 1px dotted",
		"position": "absolute",
		"top": "0px",
		"left": "0px",
		"width": "100%"
	});

	this.paraph = $("<p>");
	this.paraph.css("margin", "15px");
	this.paraph.appendTo(this.jQEl);
    this.jQEl.appendTo($("body"));

    this.setPrice = function (pPrice) {
		this.paraph.html("GAGNÉ !<br />Bravo vous avez gagné <mark>" + pPrice
				+ "</mark> !<br /><br /> "
				+ "Comme vous êtes très fort vous avez droit à une <mark>partie supplémentaire</mark>");
    };

    this.show = function () {
        this.jQEl.fadeIn(200);
    };

    this.hide = function () {
        this.jQEl.fadeOut(400);
    };

	this.hideAfter = function (pTime) {
		this.jQEl.delay(pTime).fadeOut(400);
	};

	this.append = function (pEL) {
		this.jQEl.append(pEL);
	};
}

function Target()
{
	this.windowWidth = $(window).width() - 59;
	this.windowHeight = $(window).height() - 59;
	this.jQEl = $('<img id="target" src="./img/quest.png">');
	this.jQEl.css({
		"position": "absolute",
		"top": "0px",
		"left": "0px",
		"border": "red 1px dashed"
	});

	this.setPosition = function (pY, pX) {
		this.jQEl.css({ "top": (pY + "px"), "left": (pX + "px") })
	};

	this.setPositionCenter = function () {
    	this.setPosition(((this.windowHeight - 59) / 2),((this.windowWidth - 59) / 2));
	};

	this.setPositionRandom = function () {
		var px = rand(0, this.windowWidth - 1);
		var py = rand(0, this.windowHeight - 1);

		this.setPosition(py, px);
	};

	this.setGood = function () {
		this.jQEl.attr("src", "./img/good.png");
		this.jQEl.css("border-color", "green");
	};

	this.setQuest = function () {
		this.jQEl.attr("src", "./img/quest.png");
		this.jQEl.css("border-color", "red")
	};

	this.show = function () {
		this.jQEl.fadeIn(400);
	};

	this.showAfter = function (pTime) {
		this.jQEl.delay(pTime).fadeIn(400);
	};

	this.hide = function (pFunc) {
		var target = this;
		this.jQEl.fadeOut(400, pFunc);
	};

	this.hideAndReAppearAfter = function (pTime) {
		var target = this;

		this.hide(function () {
			target.setQuest();
			target.setPositionRandom();
		});

		this.showAfter(pTime);
	};

	this.clicked = function () {
		this.setGood();
	};

	this.mouseover = function (pFunc) {
		this.jQEl.mouseover(pFunc);
	};

	this.click = function (pFunc) {
		this.jQEl.click(pFunc);
	};

	this.setPositionCenter();
	$("body").append(this.jQEl);
}
