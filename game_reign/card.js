function Card(card){

    this.title = card.title;
    this.category = card.category;
    this.actions = [
    {
        army: card.actions[0].army,
        economy: card.actions[0].economy,
        religion: card.actions[0].religion,
        inhabitants: card.actions[0].inhabitants
    },
    {
        army: card.actions[1].army,
        economy: card.actions[1].economy,
        religion: card.actions[1].religion,
        inhabitants: card.actions[1].inhabitants
    }]


    this.show_proprieties = function(){
        //console.log("ciao");
        // var lol="ciao";
        console.log(this);
        // createP("Title: " + this.title);
        // createP("Religion: " + this.religion);
        // createP("Army: " + this.army);
        // createP("Economy: " + this.economy);
        // createP("Inhabitants: " + this.inhabitants);
    }

}
