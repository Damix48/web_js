var alph=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var engF=[8.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406, 6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.36, 0.15, 1.974, 0.074];
var result;
var lol="nimakvigvzankwnsvzuarzadrzeggvtowvrwukhwqxefnmccplinkwnwgkobquiqjm";
var ICmax=0;
var len=0;
var len_max=5;

// Page's element
var text;
var result_lb;
var div_result;
var div_key;
var bt1;
var options;

function setup() {
    noCanvas();

    // Page's element initialization
    text = document.getElementById("text");
    result_lb = document.getElementById("result");
    div_result = document.getElementById("div-result");
    div_key = document.getElementById("div-key");
    key_el = document.getElementById("key");
    bt1 = document.getElementById("bt1");

    bt1.addEventListener("click", get_result);

    // property of the element when options
    options = document.option.options;
    for(var i = 0; i < options.length; i++) {
        options[i].onclick = function() {
            console.log(this.value);
            property(this.value);
        };
    }

}


// property of the element when options
function property(s){
    if(s==1){
        key_el.removeAttribute("disabled");
    }else if(s==2){
        key_el.removeAttribute("disabled");
    }else if(s==3){
        key_el.setAttribute("disabled", "true");
    }
}

function get_result(){

    if(options[0].checked==true){
        console.log(text.value);
        console.log(key_el.value);

        if(text.value==""){
            showToast("Write text");
        }else if(key_el.value==""){
            showToast("Write the key");
        }else{
            result_lb.value=crypt(text.value, key_el.value);

            div_result.className += " is-upgraded is-dirty"
        }

    }else if (options[1].checked==true) {
        if(text.value==""){
            showToast("Write text");
        }else if(key_el.value==""){
            showToast("Write the key");
        }else{
            result_lb.value=decipher(text.value, key_el.value);;
            div_result.className += " is-upgraded is-dirty"
        }

    }else if (options[2].checked==true) {
        if(text.value==""){
            showToast("Write text");
        }else{
            decrypt(text.value);
        }
    }
}

function showToast(error){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: "ERROR. " + error};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

}

function decrypt(text_){
    ICmax=0;
    var d = document.getElementById("div-result");
    console.log("il testo è:");
    console.log(text_);

    for(var i=2; i<len_max; i++){
        var z=IC(text_, i);
        if(ICmax<z){
            ICmax=z;
            len=i;
        }
        console.log(i + " " + IC(text_, i));
    }

    console.log("ciao");

        // find_key(text.value, len);
        // key_el.value=result;
    var key=find_key(text_, len)
    key_el.value=key;
    // decrypt(text.value, "ciao");
    result_lb.value=decipher(text_, key);
    // result_lb.value=decrypt(text.value, "ciao");;
    div_result.className += " is-upgraded is-dirty";
    div_key.className += " is-upgraded is-dirty";
    key_el.setAttribute("disabled", "true");

    // result_lb.removeAttribute("disabled");
}


function crypt(str, key){

    var spaces=0;
    var keyn=[];
    var result2="";
    console.log(str);
    console.log(key);

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
                result2 += alph[(k+keyn[(i-spaces)%key.length])%alph.length];
                break;
                console.log("entrato");
                console.log(str[i]);
            }else if(k==alph.length-1){
                spaces++;
            }
        }
    }

    console.log("result è:");
    console.log(result2);
    //result=prova;
    return result2;

}

function decipher(str, key){

    var spaces=0;
    var keyn=[];
    var result2="";

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
                result2+=alph[(alph.length+(k-keyn[(i-spaces)%key.length]))%alph.length];
                break;
            }else if(k==alph.length-1){
                spaces++;
            }
        }
    }

    return result2;
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
        // console.log(alph[a] + " " +result);
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
        sums+=gg(strn);

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



function find_key(str, len){ //chi

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
    // result=c;
    return c;

    // console.log(c);
    //printf("%s\n\n", c.c_str());

}

function letter(str){


    var strn="";
    var point=0;
    var chi_max=10000000;
    var chis=[];
    var alph_x=[];


    for(var a=0; a<alph.length; a++){
        strn="";
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

    // for(var i=0; i<alph.length; i++){
    //     for(var j=i+1; j<alph.length; j++){
    //         if(chis[j]<chis[i]){
    //
    //             var temp=chis[i];
    //             chis[i]=chis[j];
    //             chis[j]=temp;
    //
    //             var temp2=alph_x[i];
    //             alph_x[i]=alph_x[j];
    //             alph_x[j]=temp2;
    //
    //         }
    //     }
    // }
    // for(var i=0; i<alph.length; i++){
    //     //cout << setw(10);
    //     // console.log(alph_x[i] + " " + chis[i]);
    // }
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
    // console.log(str);

    for(var k=0; k<alph.length; k++){
        //console.log(k);
        count=0;
        for(var i=0; i<str.length; i++){
            //console.log("alph: " + alph[k]);
            if(str[i]==alph[k]){
                count++;
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
