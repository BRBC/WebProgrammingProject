function switchButoane(){
    var butonAutentificare=document.getElementById("butonAutentificare");
    if(butonAutentificare.style.display=="initial"){
        butonAutentificare.style.display="none";
    }else{
        butonAutentificare.style.display="initial";
    }
    var butonAutentificare=document.getElementById("butonDelogare");
    if(butonAutentificare.style.display=="none"){
        butonAutentificare.style.display="initial";
    }else{
        butonAutentificare.style.display="none";
    }
}

module.exports.switchButoane=switchButoane();