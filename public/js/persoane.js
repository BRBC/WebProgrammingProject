function incarcaDocument() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            incarcaDate(this);
        }
    };
    xhttp.open("GET", "resurse/persoane.xml", true);
    xhttp.send();
}
function incarcaDate(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var table = "<table><tr><th>ID</th><th>Prenume</th><th>Nume</th><th>Varsta</th><th>Strada</th><th>Numarul</th><th>Localitate</th><th>Judet</th><th>Tara</th></tr>";
    var x = xmlDoc.getElementsByTagName("persoana");
    var id = 1;
    // table+="<tbody>"
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>"+id+"</td><td>" +
            x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue +
            "</td></tr>";
            id++;
    }
    // table+="</tbody>"
    table+="</table>"
    document.getElementById("tabelPersoane").innerHTML = table;
}