const express = require("express");
const app = express();
const port = 3016;
const pokemon = require("./models/pokemon.js")
const methodOverride = require("method-override")

//Middleware//
app.use(express.urlencoded({ extended: false })); 
app.use(methodOverride("_method"))

//INDEX//
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {
        allPokemon: pokemon,
    })
})

//NEW//
app.get("/pokemon/new", (req, res) => {
    res.render("new.ejs")
})

//DELETE//
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect("/pokemon")
})

//UPDATE//
app.put("/pokemon/:id", (req, res) => {
    pokemon[req.params.id] = req.params.id
    res.redirect("/pokemon")
})

//CREATE//
app.post("/pokemon", (req, res) => {
    let newPokemon ={
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats:{
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            speed: req.body.speed,

        }
    }
    pokemon.push(newPokemon)
  
    res.redirect("/pokemon")
})



//EDIT//
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        data: pokemon[req.params.id],
        index: req.params.id
    })
})

//SHOW//
app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", {
        data: pokemon[req.params.id]
    })
})

app.listen(port, ()=> {
    console.log("Listening on port", port)
})