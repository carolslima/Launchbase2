const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
})

server.get("/", function(req, res){
  const about = {
    avatar_url: "https://avatars2.githubusercontent.com/u/50274059?s=460&u=bfb3ad15b9cefcfc33f6c4c8fdca52d0ebdb3dc8&v=4",
    name: "Caroline Lima",
    role: "Engenheira Eletricista e Desenvolvedora Javascript",
    description: 'Projetos elétricos residenciais e industriais, desenvolvimento de aplicações web <a href="https://github.com/carolslima?tab=repositories" target="_blank">Acessar meu Repositório</a>',
    links: [
      {name: "GitHub", url: "https://github.com/carolslima"},
      {name: "Twitter", url: "/"},
      {name: "Linkedin", url: "/"},
    ]
  }
  return res.render("about", {about})
})

server.get("/portifolio", function(req, res){
  return res.render("portifolio", {items: videos})
})

server.get("/video", function(req, res){
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id
  })
  if(!video){
    return res.send("Video not found!")
  }

  return res.render("video", {item: video})
})

server.listen(5000, function(){
  console.log("server is running");
})