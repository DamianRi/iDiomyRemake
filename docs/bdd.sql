CREATE DATABASE idiomy;

use idiomy;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE scores(
    idscore INT NOT NULL AUTO_INCREMENT,
    iduser  INT NOT NULL,
    idioma VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    nivel INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (iduser) REFERENCES users(id),
    PRIMARY KEY (idscore, iduser, idioma, categoria, nivel)
);