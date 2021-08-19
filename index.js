//Importando o express

const express = require('express');
const app = express();

//Definindo a porta 

const port = 3000;

//Importando o JSON

app.use(express.json());

//Array
const filmes = [
    "Homem de Ferro",
    'Homem de Ferro 2',
    'Viuva Negra',
    'Minha Mãe é uma peça',
    'Minha Mãe é uma peça2',
    'A Ilha do Medo'
];





//Rota Home
app.get('/', (req, res)=>{
    res.send('Olá Blumer');
});

////Rota Filmes
app.get('/filmes', (req,res) => {
    res.send(filmes);
});

//Filtro filme
app.get('/filmes/:id', (req,res) => {
    const id = req.params.id - 1;
    const filme = filmes[id];
    if(!filme){
        res.send('Filme não encontrado');
    }
    res.send(filme);
});

//Add filme
app.post('/filmes',(req,res) =>{
    const filme = req.body.filme;

    const id = filmes.length + 1;

    filmes.push(filme);

    res.send(`Filme adicionado com sucesso: ${filme}  ID :${id}`)
});

//Editando o filme
app.put('/filmes/:id',(req,res) =>{
    const id = req.params.id - 1;
    const filme = req.body.filme;
    const nomeAnterior = filmes[id];
    filmes[id] = filme;
    if(!filme){
        res.send('Filme não encontrado!')
    }
    res.send(`Filme atualizado com sucesso: ${filme}, filme anterior ${nomeAnterior}`);

});

//Deletando o filme
app.delete('/filmes/:id', (req,res) => {
    const id = req.params.id - 1;
    const apagado = filmes[id];
    delete filmes[id];
    if(!apagado){
        res.send('Filme não encontrado!');
    };
    res.send(`Filme removido com sucesso ${apagado}`)
});

//Deletando splice

app.delete('/filmesSplice/:id', (req,res) => {
    filmes.splice(id,1);
    delete filmes[id];
    res.send(`Filme removido com sucesso ${apagado}`)
});

app.listen(port, () =>{ 
    console.log(`App rodando na porta http://localhost:${port}/`)
});


