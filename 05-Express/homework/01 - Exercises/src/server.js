// const bodyParser = require("body-parser");
const { application } = require("express");
const express = require("express");



// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let publications = [];
let index = 1

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

server.post("/posts", (req, res) => {
    const {author,title,contents} = req.body;
    if (!author || !title || !contents) {
        return res.status(404).json({error: "No se recibieron los parámetros necesarios para crear la publicación"})
  }
  
  const publicación = {
    id : index ++,
    author : author,
    title : title,
    contents: contents
  }
  publications.push(publicación);

  return res.json(publicación)

  });

server.get("/posts", (req,res) => {

  const {term, author, title} = req.query;

  if (author && title) {
    const devPubli2 = publications.filter((obj) => 
      obj.title === title && obj.author === author) 
  
        if (devPubli2.length === 0) res.status(404).json(
          {error: "No existe ninguna publicación con dicho título y autor indicado"});
        else res.status(200).json(devPubli2)
    }

  if (term) 
  {let devPubli = publications.filter((obj) => 
    obj.title.includes(term) || obj.contents.includes(term)) 

      if (devPubli.length === 0) res.status(200).json(publications);
      else res.status(200).json(devPubli)
  }

  else res.status(200).json(publications)



  })


//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };  
