var alph=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var engF=[8.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406, 6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.36, 0.15, 1.974, 0.074];
var result="";
var lol= "ciao";

function setup() {

    // createCanvas(400, 400);
    // background(51);

    console.log("ciao");
    crypt("ciaocomestai", "lol");
    console.log(result);
    decrypt("nwlzqzxsdeot", "lol");
    console.log(result);
}

function crypt(str, key){

    var spaces=0;
    var keyn=[];
    result="";

    for(var i=0; i<key.length; i++){ //inizializza la key
        for(var k=0; k<alph.length; k++){
            if(key[i]==alph[k]){
                keyn[i]=k;
            }
        }
    }
    //console.log(alph.length);

    for(var i=0; i<str.length; i++){ //cripta
        for(var k=0; k<alph.length; k++){
            if(str[i]==alph[k]){
                result += alph[(k+keyn[(i-spaces)%key.length])%alph.length];
                break;
                //console.log(str[i]);
            }else if(k==alph.length-1){
                spaces++;
            }
        }
    }
    //result=prova;

}
function decrypt(str, key){

    var spaces=0;
    var keyn=[];
    result="";

    for(var i=0; i<key.length; i++){ //inizializza la key
        for(var k=0; k<alph.length; k++){
            if(key[i]==alph[k]){
                keyn[i]=k;
            }
        }
    }

    for(var i=0; i<str.length; i++){ //decripta
        for(var k=0; k<alph.length; k++){
            if(str[i]==alph[k]){
                //printf("a:%d, bb:%d, b:%d, c:%c\n", (i-spaces)%key.size(),k, (abs(k-keyn[(i-spaces)%key.size()]))%LETT, alph[(abs(k-keyn[(i-spaces)%key.size()]))%LETT]);
                result+=alph[(alph.length+(k-keyn[(i-spaces)%key.length]))%alph.length];
                break;
            }else if(k==alph.length-1){
                spaces++;
            }
        }
    }
}
