const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const fs = require('fs');
const cookieParser = require('cookie-parser');
var session = require('express-session');
const { send } = require('process');
var mysql = require('mysql');


const app = express();
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 10000
	}
}));

const port = 6789;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'))
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));

// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res
var utilizator;
fs.readFile('utilizatori.json', (err, data) => {
	if (err) throw err;
	utilizator = JSON.parse(data);
});

var listaIntrebari;
fs.readFile('intrebari.json', (err, data) => {
	if (err) throw err;
	listaIntrebari = JSON.parse(data);
});

app.get('/', (req, res) => {
	var cookies = req.cookies;
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "123catalina",
		database: "cumparaturi"
	});

	//console.log(cookies["username"]);
	con.connect(function (err) {
		if (err) throw err;
		con.query("SELECT * FROM produse", function (err, result, fields) {
			if (err) throw err;
			//console.log(result);
			res.render("index", { cookies: cookies, result: result });
		});
	});
});

var listaProduse = [];
app.post("/adauga-cos", (req, res) => {
	console.log(req.body);
	listaProduse.push(req.body);
	console.log(listaProduse);
});

app.get('/autentificare', (req, res) => {
	var cookies = req.cookies;
	res.render('autentificare', { cookies });
});
app.get('/admin', (req, res) => {
	if (req.session.rol == "ADMIN") {
		res.render('admin');
	}
	else {
		res.redirect('/');
	}
});
app.post('/verificare-autentificare', (req, res) => {
	var check = false;
	for (let i = 0; i < utilizator.length; i++) {
		if (req.body["username"] == utilizator[i]["nume"] && req.body["password"] == utilizator[i]["parola"]) {
			req.session.name = utilizator[i]["nume complet"];
			req.session.colour = utilizator[i]["culoare preferata"];
			req.session.rol = utilizator[i]["rol"];
			res.cookie('username', utilizator[i]["nume complet"]);
			check = true;
			res.redirect("/");
		}
	}
	if (check == false) {
		res.cookie('mesajEroare', 'Eroare la introducerea datelor', { maxAge: 1000 });
		res.redirect("/autentificare");
	}
});
// la accesarea din browser adresei http://localhost:6789/chestionar se va apela funcția specificată
app.get('/chestionar', (req, res) => {
	// în fișierul views/chestionar.ejs este accesibilă variabila 'intrebari' care conține vectorul de întrebări
	res.render('chestionar', { intrebari: listaIntrebari });
});



app.post('/rezultat-chestionar', (req, res) => {
	console.log(req.body);
	//res.send("formular: " + JSON.stringify(req.body));
	var raspunsuriCorecte = 0;
	for (var i = 0; i < listaIntrebari.length; i++) {
		if (listaIntrebari[i].corect == req.body[i]) {
			raspunsuriCorecte++;
		}
	}
	res.render('rezultat-chestionar', { rezultate: raspunsuriCorecte });
});

app.post('/adaugare-produs', (req, res) => {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "123catalina",
		database: "cumparaturi"
	});

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
		con.query("insert into produse(id,nume,pret) values (" + req.body.nid + ",'" + req.body.nprodus + "'," + req.body.pprodus + ");", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});

	});

});

app.get('/creare-bd', (req, res) => {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "123catalina",
		database: "cumparaturi"
	});

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
		con.query("CREATE DATABASE IF NOT EXISTS cumparaturi", function (err, result) {
			if (err) throw err;
			console.log("Database created");
		});
		var sql = "CREATE TABLE IF NOT EXISTS produse (id INTEGER(3), nume VARCHAR(255), pret DECIMAL(4,2))";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Table created");
			res.redirect("/");
		});

	});

});
var id = 0;

app.get('/inserare-db', (req, res) => {

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "123catalina",
		database: "cumparaturi"
	});

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
		con.query("insert into produse(id,nume,pret) values ( 1,'banane',6.99);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (2,'mere roșii',5.89);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (3,'lamai',2.89);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (4,'portocale',3.59);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (5,'avocado',12.99);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (6,'ceapa',1.25);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (7,'afine',6.49);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (8,'capsune',7);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (9,'ridiche legatura',1.39);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse(id,nume,pret) values (10,'cartofi',2.99);", function (err, result) {
			id++;
			if (err) throw err;
			console.log("product inserted");
		});

		res.redirect("/");
	});

});

app.get('/vizualizare-cos', (req, res) => {
	res.render('vizualizare-cos', { listaProduse });
})
app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));