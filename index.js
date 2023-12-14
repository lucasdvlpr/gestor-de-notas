const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./sqlite3/database.db');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  token TEXT
)`);

app.use(express.json());

app.post('/api/login', (req,res) =>{
  const{username,password} = req.body;
  // console.log(req.body);
  db.get('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], (error,row)=>{
    if(error){
      res.status(500).send('Error interno del servidor.');
    }else if (!row){
      res.status(401).send('Los datos ingresados son incorrectos.');
    }else{
      res.send(row);
    }
  });
});

app.get('/api/registros/:id', (req,res) =>{
  const id = req.params.id;
  db.get('SELECT * FROM usuarios WHERE id = ?', [id], (error, row) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (!row) {
      res.status(404).send(`No hay usuarios con ID ${id}`);
    } else {
      res.send(row);
    }
  });
});

app.get('/api/registros', (req, res) => {
  db.all('SELECT * FROM usuarios', (error, rows) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.send(rows);
    }
  });
});

app.post('/api/registros', (req,res) => {
  console.log('Cuerpo de la Solicitud:', req.body);
  const {username, password, token} = req.body;
  db.get('SELECT * FROM usuarios WHERE username = ?', [username], (error,row) => {
    if(error){
      res.status(500).send(error.message);
    }else if (row){
      res.status(400).send(`El nombre de usuario '${row.username}' ya está en uso`);
    }else{
      db.run('INSERT INTO usuarios (username, password, token) VALUES (?,?,?)', [username, password, token], (error) =>{
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Error al registrar usuario' });
        }
        return res.json({ message: `Usuario creado!`});
      })
    }
  });
});

app.get('/api/notas/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM notas WHERE id = ?', [id], (error, row) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (!row) {
      res.status(404).send(`No hay notas con ID ${id}`);
    } else {
      res.send(row);
    }
  });
});

app.get('/api/notas', (req, res) => {
  db.all('SELECT * FROM notas', (error, rows) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.send(rows);
    }
  });
});

app.post('/api/notas', (req, res) => {
  const {titulo, fecha, cuerpo} = req.body;
  db.run(
    'INSERT INTO notas (titulo, fecha, cuerpo) VALUES (?, ?, ?)',
    [titulo, fecha, cuerpo],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'No se envio el formulario' });
      }
      return res.status(200).json({ success: true });
    }
  );
});

app.put('/api/notas/:id', (req, res) => {
  const id = req.params.id;
  const {titulo, fecha, cuerpo} = req.body;
  db.run(
    'UPDATE notas SET titulo = ?, fecha = ?, cuerpo = ? WHERE id = ?', [titulo, fecha, cuerpo, id], function(error){
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json({ message: `Nota con ID ${id} actualizada`});
    }
  });
})

app.delete('/api/notas/:id', (req,res) => {
  const id = req.params.id;
  db.run('DELETE FROM notas WHERE id = ?', id, function(error) {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json({ message: `Nota con ID ${id} eliminada`});
    }
  });
})


app.listen(4000, () => {
console.log('Servidor escuchando en el puerto 4000');
});