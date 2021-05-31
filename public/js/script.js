//sectiunea 1
function laIncarcare() {
  setInterval(afisareData, 1000);
  window.document.getElementById("p2").innerHTML = "Adresa URL este " + location.href;
  if (window.navigator.geolocation) {
    window.document.getElementById("p3").innerHTML = window.navigator.geolocation.getCurrentPosition(arataLocatia);
  } else {
    window.document.getElementById("p3").innerHTML = "Geolocatia nu e suportată de browser";
  }
  window.document.getElementById("p4").innerHTML = "Numele browserului este " + window.navigator.appName;
  window.document.getElementById("p5").innerHTML = "Versiunea browserului este " + window.navigator.appVersion;
  window.document.getElementById("p5").innerHTML = "Versiunea browserului este " + random_hex_code();

  // document.getElementById("flex-container").style.flex-direction ='row';

}

//sectiunea '3'
var rectangle = 0;
var firstRectangleX, firstRectangleY, secondRectangleX, secondRectangleY;
function plot_pt() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  if (rectangle == 0) {
    console.log("click if");

    firstRectangleX = event.clientX - canvas.offsetLeft;
    firstRectangleY = event.clientY - canvas.offsetTop + pageYOffset;
    console.log(firstRectangleX + " " + (firstRectangleY + pageYOffset));
    context.moveTo(firstRectangleX, firstRectangleY);
    rectangle++;
  } else {
    console.log("click else");
    secondRectangleX = event.clientX - canvas.offsetLeft;
    secondRectangleY = event.clientY - canvas.offsetTop + pageYOffset;
    console.log(secondRectangleX + " " + (secondRectangleY + pageYOffset));

    context.beginPath();
    context.moveTo(secondRectangleX, secondRectangleY);

    context.fillStyle = document.getElementById("umplere").value;
    context.lineWidth = 7;
    context.strokeStyle = document.getElementById("contur").value;
    context.strokeRect(firstRectangleX, firstRectangleY, secondRectangleX - firstRectangleX, secondRectangleY - firstRectangleY);
    context.fillRect(firstRectangleX, firstRectangleY, secondRectangleX - firstRectangleX, secondRectangleY - firstRectangleY)
    rectangle = 0;
  }
}

function arataLocatia(position) {
  window.document.getElementById("p3").innerHTML = "Locație curentă: </br> latitude: " + position.coords.latitude + " </br> longitude: " + position.coords.longitude;
}
function afisareData() {
  window.document.getElementById("p1").innerHTML = "Data este " + (new Date());
}

//sectiunea2
function random_hex_code() {
  var n = (Math.random() * 0xff * 100).toString(16);
  return "" + n.slice(0, 2);
}

var vector_hex_numbers_id = ["loto_hexa_number1", "loto_hexa_number2", "loto_hexa_number3", "loto_hexa_number4", "loto_hexa_number5", "loto_hexa_number6", "loto_hexa_number7", "loto_hexa_number8"];
var vector_random_hex_numbers_id = ["random_loto_number1", "random_loto_number2", "random_loto_number3", "random_loto_number4", "random_loto_number5", "random_loto_number6", "random_loto_number7", "random_loto_number8"];


function generate_random_loto_numbers() {
  window.document.getElementById("random_loto_number1").value = random_hex_code();
  window.document.getElementById("random_loto_number2").value = random_hex_code();
  window.document.getElementById("random_loto_number3").value = random_hex_code();
  window.document.getElementById("random_loto_number4").value = random_hex_code();
  window.document.getElementById("random_loto_number5").value = random_hex_code();
  window.document.getElementById("random_loto_number6").value = random_hex_code();
  window.document.getElementById("random_loto_number7").value = random_hex_code();
  window.document.getElementById("random_loto_number8").value = random_hex_code();
}

function validate_numbers() {
  var i;
  var j = 0;
  for (i = 0; i < vector_hex_numbers_id.length; i++) {
    if (window.document.getElementById(vector_random_hex_numbers_id[i]).value == window.document.getElementById(vector_hex_numbers_id[i]).value) {
      j++;
    }
  }
  if (j == 8) {
    window.document.getElementById("match").value = "Ați câștigat loteria!!!!";
  }
  else
    window.document.getElementById("match").value = "S-au găsit " + j + " potriviri";
}

//sectiunea4
function inserareLinie() {
  var table = document.getElementById("tabelSectiunea4");
  var numar = document.getElementById("numar").value;
  var primaLinie=table.getElementsByTagName("tr")[0];
  var nrColoane=primaLinie.getElementsByTagName("td").length;
  var row = table.insertRow(numar-1);
  console.log("inainte de for");
  for(let i=0;i<nrColoane;i++){
    console.log("intra in for");
    var cell = row.insertCell(i);
    cell.innerHTML = "NEW CELL";
    cell.bgColor=document.getElementById("color").value;
    
  }
  console.log("iesire for");
}
function inserareColoana() {
  var table = document.getElementById("tabelSectiunea4");
  var numar = document.getElementById("numar").value;
  console.log("inainte de for");
  for(let i=0;i<table.rows.length;i++){
    console.log("intra in for");
    var row=table.rows[i];
    var cell = row.insertCell(numar-1);
    cell.innerHTML = "NEW CELL";
    cell.bgColor=document.getElementById("color").value;
  }
  console.log("iesire for");
}


function schimbaContinut(resursa, jsFisier, jsFunctie) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange =
      function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          document.getElementById("continut").innerHTML =
            this.responseText
          if (jsFisier) {
            var elementScript = document.createElement('script');
            elementScript.onload = function () {
              console.log("hello");
              if (jsFunctie) {
                window[jsFunctie]();
              }
            };
            elementScript.src = jsFisier;
            document.head.appendChild(elementScript);
          } else {
            if (jsFunctie) {
              window[jsFunctie]();
            }
          }
        }
      }
    xmlhttp.open("GET", resursa + ".html", true);
    xmlhttp.send();
  }
}