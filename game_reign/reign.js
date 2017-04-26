function Reign(){
    this.religion=10;
    this.army=10;
    this.economy=10;
    this.inhabitants=10;

    this.show_proprieties = function(){
        // console.log("ciao2");
        // var lol="ciao";
        createP("Religion: " + this.religion);
        createP("Army: " + this.army);
        createP("Economy: " + this.economy);
        createP("Inhabitants: " + this.inhabitants);
    }

    this.update = function(){
        this.religion+=1;
        this.army+=1;
        this.economy+=1;
        this.inhabitants+=1;
    }

    this.applyCard = function(card, choice) {

        // console.log("religion "+ card.actions[choice].religion);
        // console.log("army "+ card.actions[choice].army);
        // console.log("economy "+ card.actions[choice].economy);
        // console.log("inhabitants "+ card.actions[choice].inhabitants);

        this.religion+=card.actions[choice].religion;
        this.army+=card.actions[choice].army;
        this.economy+=card.actions[choice].economy;
        this.inhabitants+=card.actions[choice].inhabitants;
    }
}
