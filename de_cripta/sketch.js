var alph=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var engF=[8.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406, 6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.36, 0.15, 1.974, 0.074];
var result="";
var lol= "ciao";

function setup() {

    // createCanvas(400, 400);
    // background(51);

    console.log("ciao");
    crypt("ciaocomestai", "d");
    console.log(result);
    decrypt("nwlzqzxsdeot", "lol");
    console.log(result);
    all_caesar("fldrfrphvwdl");

    var lol="nimakvigvzankwnsvzuarzadrzeggvtowvrwukhwqxefnmccplinkwnwgkobquiqjm";
    var ICmax=0;
    var len=0;
    for(var i=2; i<6; i++){
        var z=IC(lol, i);
        if(ICmax<z){
            ICmax=z;
            len=i;
        }
        console.log(i + " " + IC(lol, i));
    }
    console.log("La lunghezza più probabile è " + len + " dato che IC= " + ICmax);
    string_chi(result, len);

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
                result+=alph[(alph.length+(k-keyn[(i-spaces)%key.length]))%alph.length];
                break;
            }else if(k==alph.length-1){
                spaces++;
            }
        }
    }
}

function all_caesar(str) {
    for(var a=0; a<alph.length; a++){
        result="";
        for(var i=0; i<str.length; i++){
            for(var k=0; k<alph.length; k++){
                if(str[i]==alph[k]){
                    result+=alph[(alph.length+(k-a))%alph.length];
                    break;
                }
            }
        }
        console.log(alph[a] + " " +result);
    }
}

function IC(str, a){

    // printf("dentro IC\n");
    // printf("stringa: %s\ncaratteri: %d\n\n", str.c_str(), str.size());
    var strn;
    var sums=0;
    for (var i=0; i<a; i++) {
        var z=0;
        strn="";
        for (var k=i; k<str.length; k=k+a) {
            strn+=(str[k]);
            z++;
        }
        sums=sums+gg(strn);

    }
    return sums/a;
}

function gg(str){
    var z=0;
    var count=0;
    var som=0;
    var a=0, b=0;

    for(var k=0; k<alph.length; k++){
        for(var i=0; i<str.length; i++){

            if(str[i]==alph[k]){
                som=som+1;
            }
        }
    }

    for(var k=0; k<alph.length; k++){
        count=0;
        for(var i=0; i<str.length; i++){

            if(str[i]==alph[k]){
                count++;
            }
        }

        a=count*(count-1);
        b=som*(som-1);

        z=z+(a/b);
    }

    return z;
}

var dio;

function string_chi(str, len){

    var strn="";
    var sums=0;
    var c="";
    for (var i=0; i<len; i++) {
        var z=0;
        strn="";
        for (var k=i; k<str.length; k=k+len) {
            strn+=(str[k]);
            z++;
        }

        c+=letter(strn);
        //printf("#%d: %c \n", i, c);
        //printf("%c", c);
    }
    dio=c;
    console.log(c);
    //printf("%s\n\n", c.c_str());

}

function letter(str){


    var strn;
    var point=0;
    var chi_max=10000000;
    var chis=[];
    var alph_x=[];


    for(var a=0; a<alph.length; a++){
        for(var i=0; i<str.length; i++){
            for(var k=0; k<alph.length; k++){
                if(str[i]==alph[k]){
                    strn+=alph[(26+(k-a))%alph.length];
                    break;
                }
            }
        }
        chis[a]=chi_quadro(strn);
        alph_x[a]=alph[a];
        if(chi_max>chis[a]){
            chi_max=chis[a];
            point=a;
        }
        //printf("#%c: %f \n", alph[a], chis[a]);


    }

    for(var i=0; i<alph.length; i++){
        for(var j=i+1; j<alph.length; j++){
            if(chis[j]<chis[i]){

                var temp=chis[i];
                chis[i]=chis[j];
                chis[j]=temp;

                var temp2=alph_x[i];
                alph_x[i]=alph_x[j];
                alph_x[j]=temp2;

            }
        }
    }
    for(var i=0; i<alph.length; i++){
        //cout << setw(10);
        console.log(alph_x[i] + " " + chis[i]);
    }
    //printf("\n");


    return alph[point];
}

function chi_quadro(str){

    var z=0;
    var count=0;
    var som=0;
    var fi=0, Fi=0, a=0, b=0;

    // for(int k=0; k<LETT; k++){
    //     for(int i=0; i<str.size(); i++){
    //         if(str[i]==alph[k]){
    //             som=som+1;
    //         }
    //     }
    // }
    //printf("som: %d\n", som);
    som=str.length;
    //console.log(alph.length);

    for(var k=0; k<alph.length; k++){
        //console.log("oll");
        count=0;
        for(var i=0; i<str.length; i++){
            //console.log("alph: " + alph[k]);
            if(str[i]==alph[k]){
                count+=1;
            }
        }
        //console.log("count: " + count);
        //printf("count %c: %d\n", alph[k], count);

        Fi=engF[k]/100;
        // printf("F: %f ", engF[k]);
        // printf("Fi: %f ", Fi);
        fi=count/som;
        //printf(" fi: %f\n", fi);
        //console.log("fi: " + fi);

        a=pow(fi-Fi, 2);
        //console.log("a: " + a);
        b=Fi;

        z=z+(a/b);
    }

    return z;
}
