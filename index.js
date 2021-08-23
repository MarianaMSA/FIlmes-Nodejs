//Importando o express

const express = require("express");
const app = express();

//Definindo a porta

const port = 3000;

//Importando o JSON

app.use(express.json());

//Array
const filmes = [
    {
        id: 1,
        nome:"Capitão America" ,
        imagemUrl: "https://br.web.img2.acsta.net/pictures/19/02/04/18/35/1468867.jpg"
    },
    {
        id: 2,
        nome: "Capita marvel",
        imagemUrl:"https://br.web.img2.acsta.net/pictures/19/02/04/18/35/1468867.jpg"
    },
    {
        id: 3,
        nome: "O Incrivel Hulk",
        imagemUrl:"https://br.web.img2.acsta.net/c_310_420/pictures/210/485/21048566_20131010182211313.jpg"
    },
    {
        id: 4,
        nome: "Homem de ferro",
        imagemUrl:"https://images-na.ssl-images-amazon.com/images/I/81vTHovrz%2BL._AC_SY606_.jpg"
    },
    {
        id: 5,
        nome: "Homem de ferro 2",
        imagemUrl:"https://media.fstatic.com/SFp4c8GT3GTGYok7_526qDSHTns=/290x478/smart/media/movies/covers/2018/09/66432b37ed80464274a58239b695007f95c79155.jpg"
    },
    
];

const getFilmesValidos = () => filmes.filter(Boolean);
const getFilmeByID = (id) => getFilmesValidos().find((filme) => filme.id == id); 
// const getIndexByFilmes = (id) => getFilmesValidos().findIndex(filme) => (filme.id ==id);

//Rota Home
app.get("/", (req, res) => {
  res.send("Olá Blumer");
});

////Rota Filmes
app.get("/filmes", (req, res) => {
  res.send(getFilmesValidos);
});

//Filtro filme
app.get("/filmes/:id", (req, res) => {
  const id = req.params.id;
  const filme = filmes[id];
  if (!filme) {
    res.send("Filme não encontrado");
  }
  res.send(filme);
});

//rota de cadastro de um novo filme
app.post("/filmes", (req, res) => {
  const filme = req.body;

  if(!filme || !filme.nome || !filme.imagemUrl){
    res.status(400).send({
      message: "Filme invalido. tente novamente",
    });
    return;
  }

  const ultimoFilme = filmes[filmes.length -1];

  if(filmes.length){
    filme.id = ultimoFilme.id +1;
    filmes.push(filme);
  }else{
    filme.id = 1;
    filmes.push(filme);
  }

  res.send(`Filme adicionado com sucesso: ${filme.nome}. 
  O ID do filme é ${filme.id}`);
});

//rota de atualizacao de um filme
app.put("/filmes/:id", (req, res) => {
  const id = +req.params.id;
  
  const filmeIndex = getIndexByFilme(id);

  if (filmeIndex < 0){
    res.status(404).send({
      message: "O filme nao foi encontrado, tente novamente."
    });
    return;
  }

  const novoFilme = req.body;

  if(!Object.keys(novoFilme).length){
    res.status(400).send({
      message: "O body esta vazio!"
    });
    return;
  }

  if(!novoFilme || !novoFilme.nome || !novoFilme.imagemUrl){
    res.status(400).send({
      message: "filme invalido, tente novamente."
    });
    return;
  }

  const filme = getFilmeById(id);
  
  console.log(filmeIndex);
  filmes[filmeIndex] = {
    ...filme,
    ...novoFilme,
  };

  res.send(filmes[filmeIndex]);

});

//rota de remocao de um filme
app.delete("/filmes/:id", (req, res) => {
  const id = +req.params.id;

  const filmeIndex = getIndexByFilme(id);
  
  if(filmeIndex < 0 ){
    res.status(404).send({
      message: "Filme não encontrado"
    });
    return;
  }

  filmes.splice(filmeIndex, 1);
  res.send({
    message: "Filme removido com sucesso"
  });
});

//Definicao do listener passando a porta do servico
app.listen(port, () => {
  console.info(`App rodando na porta http://localhost:${port}/`);
});