--Codigo feito em SQLite temporariamente.

--Create table Usuario
CREATE TABLE Usuario(
    UsuarioId INTEGER PRIMARY KEY,
    Nome VARCHAR(200) NULL,
    Descricao VARCHAR(2000) NULL,
    Zap VARCHAR NULL,
    Insta VARCHAR NULL,
    Face VARCHAR NULL,
    Twitter VARCHAR NULL,
    Foto VARCHAR NULL,
    Artistas INTEGER NOT NULL -- 0 False, 1 True
);

--Create table Categoria
CREATE TABLE Categoria(
    Texto VARCHAR(100) PRIMARY KEY
);

--Create table Obra
CREATE TABLE Obra(
    ObraId INTEGER PRIMARY KEY,
    Titulo VARCHAR(200) NULL,
    Descricao VARCHAR(2000) NULL,
    Foto VARCHAR NOT NULL,
    UsuarioId INTEGER NOT NULL,
    Categoria VARCHAR(100) NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(UsuarioId)
    FOREIGN KEY (Categoria) REFERENCES Categoria(Texto)
);

--Create table Tag
CREATE TABLE Tag(
    Texto VARCHAR(100) PRIMARY KEY,
    ObraId INTEGER NOT NULL,
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);

--Create table Mensagens
CREATE TABLE Mensagem(
    MensagemId INTEGER PRIMARY KEY,   
    Conteudo VARCHAR NOT NULL,
    UsuarioOrigemId INTEGER NOT NULL,
    UsuarioDestinoId INTEGER NULL, 
    ObraId INTEGER NULL, --obra e origem são nulos para no codigo identifcar se a menssagem é para um post ou para um usuario
    FOREIGN KEY (UsuarioOrigemId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (UsuarioDestinoId) REFERENCES Usuario(UsuarioId),
    FOREIGN KEY (ObraId) REFERENCES Obra(ObraId)
);