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

 server.get("/posts/:author", (req,res) => { 
  const {author} = req.params;

  const autores = publications.filter((obj)=> obj.author === author);

  if (autores.length === 0)res.status(404).json({error: "No existe ningun post del autor indicado"})
  else res.status(200).json(autores)
 })

 server.put("/posts/:id", (req,res)=> {
  const {id} = req.params;
  const {title,contents} = req.body;
  let impr = {}

  if (!id && !title && !contents) res.status(404).json({error: "No se recibieron los parámetros necesarios para modificar la publicación"});

  const arrayId = publications.filter((obj)=> obj.id === id);

  if (arrayId.length === 0) res.status(404).json({error: "No se recibió el id correcto necesario para modificar la publicación"});

  else actualiz = publications.forEach((obj) =>{
    if (obj.id === id) {
      obj.title = title;
      obj.contents = contents;
      impr = obj;
    }})
    res.status(200).json(impr)

 })

 server.delete('/posts/:id',(req,res)=>{
  const {id} = req.params;

  if (!id) res.status(404).json({error: "No se recibió el id de la publicación a eliminar"});

  const arrayId = publications.filter((obj)=> obj.id === id);

  if (arrayId.length !== 0) { publications.forEach((obj,index) =>{
    if (obj.id === id) {
      publications.splice(index,1)
    }})
    res.status(200).json({ success: true})}

else res.status(404).json({error: "No se recibió el id correcto necesario para eliminar la publicación"});
 })  

 server.delete("/author/:name",(req,res)=>{
  const {name} = req.params;
  let borradas = []

  if (!name) res.status(404).json({error: "No se recibió el nombre del autor"});

  const arrayId2 = publications.filter((obj)=> obj.author === name);

  if (arrayId2.length !== 0) { publications.forEach((obj,index) =>{
    if (obj.author === name) {
      borradas.push(obj);
      publications.splice(index,1)

    }})
    res.status(200).json(borradas)}

else res.status(404).json({error:"No se recibió el nombre correcto necesario para eliminar las publicaciones del autor"});
 })


//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };  
