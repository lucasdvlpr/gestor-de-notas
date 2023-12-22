DROP TABLE usuarios;

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  nombreyapellido TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  token TEXT NOT NULL
);
