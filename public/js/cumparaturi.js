class Produs {
    constructor(id,name, quantity) {
      this.id=id;
      this.name = name;
      this.quantity = quantity;
    }
  }
var x=0;
function populateStorage() {
  var tabelProduse=document.getElementById("tabelProduse");
    console.log("obiect adaugat");
    x=x+1;
    var produs=new Produs(x,document.getElementById("numeProdus").value,document.getElementById("cantitate").value);
    console.log(produs.name);
    tabelProduse.innerHTML+="<tr><td>"+produs.id+"</td><td>"+produs.name+"</td><td>"+produs.quantity+"</td></tr>";
    localStorage.setItem(x, JSON.stringify(produs));
}

