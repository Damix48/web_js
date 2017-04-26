var reign;
var cards=[];

var data;
var cardsData;
var common;
var rare;
var epic;
var leggendary;

function preload() {
    data = loadJSON('cards.json');
}

function loadCards() {

    cardsData = data.cards[0];
    common = cardsData.common;
    rare = cardsData.rare;
    epic = cardsData.epic;
    leggendary = cardsData.leggendary;

    console.log(data);
    console.log(cardsData);
    console.log(common);
    console.log(rare);
    console.log(epic);
    console.log(leggendary);

}

function setup() {

    noCanvas();

    loadCards();

    reign = new Reign();

    reign.show_proprieties();

    for (var i = 0; i < common.length; i++) {
        cards.push(new Card(common[i]));
    }
    console.log("cards");
    console.log(cards);
    for (var i = 0; i < cards.length; i++) {
        console.log("CARD " + (i+1) + " ");
        cards[i].show_proprieties();
    }

    reign.applyCard(cards[0], 1);
    createP("New Reign:");
    reign.show_proprieties();
}

function draw() {

}
