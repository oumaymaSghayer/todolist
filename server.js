const http = require("http");
const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

/************************************************************************************ */
app = express();

app.use(cookieSession({ secret: "todotopsecret" }));

/************************************************************************************ */
const server = http.createServer((req, res) => {
  app
    .get("/", (req, res) => {
      res.render("afficher.ejs", { todolist: req.cookieSession.todolist });
    })
    .get("/ajouter", (req, res) => {
      if (req.body.newtodo != "") {
        req.cookieSession.todolist.push(req.body.newtodo);
      }
      res.redirect("/");
    })
    .get("/suprimer/:id", (req, res) => {
      req.cookieSession.todolist.splice(req.params.id, 1);
      res.redirect("/");
    });
});

/********************************************************** */

/************************************************************ */
server.listen(8080);
console.log("listening");
