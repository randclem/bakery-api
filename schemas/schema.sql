DROP TABLE IF EXISTS cakes;
CREATE TABLE IF NOT EXISTS cakes (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL,
  description text NOT NULL,
  state text NOT NULL
);
INSERT INTO cakes (name, description, state) VALUES ('Pastel Uno', 'Un buen pastel para la dia de los muertos', 'New');