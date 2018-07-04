//SETUP
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  const { error } = dotenv.config();
  if (error) {
    throw error
  } 
  dotenv.load();
  console.log('loaded env');
}

console.log('start');
var rootpath = path.resolve(__dirname, '../../'); //due to file structure, rootpath to dist folder is up several dir....
// Serve only the static files form the dist directory
app.use(express.static(path.join(rootpath +'/dist/angular-tour-of-heroes')));
//app.use(express.static(__dirname + '/dist/angular-tour-of-heroes'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

/////////////////////DATABASE/////////////////////////

const db = process.env.DATABASE_URL || "postgres://localhost:5432/angular-tour-of-heroes";
const pool = new Pool({
  connectionString: db,
  ssl: true
});

////////////////////// CONFIG//////////////////////////


// app.all("/*", function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   next();
// });

// app.route('/api/heroes').get((req, res) => {
//   console.log('connecting to route func');
//   res.send(201, req.body);
// });

app.get('/api/heroes', async (req, res) => {
  try {
  	console.log('connecting to get db');

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');

    //console.log(result.rows[0].food);
    //res.json([ { id: result.rows[0].id, food: result.rows[0].food } ]);

    var heroes = [];
    for (var i in result.rows) {
      heroes.push({id: result.rows[i].id, name: result.rows[i].food});
    }
    res.send(heroes);

    // res.send( [ { id: result.rows[0].id, name: result.rows[0].food },
    //             { id: 2, name: 'jelly' },
    //             { id: 3, name: 'mexican' }
    //                                                                    ] );

    client.release();
    
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.get('/api/heroes/s', async (req, res) => { //search call
  try {
    console.log('connecting to get search db');

    var name = req.query.name; //query tag not param

    const client = await pool.connect();
    //case insensitive search, || = concat
    const result = await client.query("SELECT id, food FROM test_table WHERE LOWER(food) LIKE '%' || LOWER($1) || '%'", [name]); 

    var heroes = [];
    for (var i in result.rows) {
      heroes.push({id: result.rows[i].id, name: result.rows[i].food});
    }
    res.send(heroes);

    client.release();
    
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//NOTE WILDCARD AND VAR matches to be put after static URLs if using same HTTP requests!!

app.get('/api/heroes/:id', async (req, res) => {
  try {
    console.log('connecting to get id db');

    //var id2 = req.query.id; //expressjs
    //console.log(id2);

    var id = req.params.id; //generic
    //console.log(req.params.id); 

    const client = await pool.connect();
    const result = await client.query('SELECT id, food FROM test_table WHERE id = $1', [id]);

    var hero = {id: result.rows[0].id, name: result.rows[0].food}; //hero obj
    res.send(hero);

    client.release();
    
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.put('/api/heroes', async (req, res) => { //update call
  try {
    console.log('connecting to update db');

    console.log(req.body); //get object of request
    var id = req.body.id; 
    var food = req.body.name; 

    const client = await pool.connect();
    const result = await client.query('UPDATE test_table SET food = $2 WHERE id = $1', [id, food]);

    const result = await client.query('SELECT * FROM test_table');
    console.log(result);
    //var hero = {id: result.rows[0].id, name: result.rows[0].food}; //hero obj
    //res.send(hero);

    client.release();
    
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});



app.get('/*', function(req,res) { //wild card last check
    console.log('connecting to page');
    res.sendFile(path.join(rootpath+'/dist/angular-tour-of-heroes/index.html'));
    //res.sendFile(path.join(__dirname+'/dist/angular-tour-of-heroes/index.html'));
});


///////////////////////////LAUNCH///////////////////////
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);