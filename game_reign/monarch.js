function Monarch(){

    this.gender="";
    this.age=10;
    this.charisma=10;
    this.worship=10;
    this.strength=10;
    this.morality=10;
    this.faith="";
    this.religious_T=10;


    this.show_proprieties = function(){
        //console.log("ciao");
        // var lol="ciao";
        createP("Religion: " + this.religion);
        createP("Army: " + this.army);
        createP("Money: " + this.money);
        createP("Inhabitants: " + this.inhabitants);
    }

    this.update = function(){
        this.religion+=1;
        this.army+=1;
        this.money+=1;
        this.inhabitants+=1;
    }
}
