DROP TABLE notas;

CREATE TABLE notas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    fecha TEXT,
    cuerpo TEXT,
    prioridad TEXT
);