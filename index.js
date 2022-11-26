const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

let lovers = [];


// reglas de negocio
function getAll() {
  // if (lovers.length == 0) {
  //   return ([
  //     {
  //       name: "Felipe",
  //       lastname: "Iturriaga",
  //       age: 58
  //     }
  //   ]);
  // }
  return lovers;
}

const getOne = (name) => {
  return lovers.find((lover) => lover.name == name);
}


function addLover(lover) {
  lovers.push(lover);
}

// rutas
app.get(process.env.URL_APP + "/lovers", (req, res) => {
  res.json(getAll());
});

app.get(process.env.URL_APP + "/lovers/:name", (req, res) => {
  res.json(getOne(req.params.name));
});


app.post(process.env.URL_APP + "/lovers", (req, res) => {
  addLover(req.body);
  res.send("ok");
})




app.listen(process.env.PORT, () => {
  console.log(`listen in port ${process.env.PORT}`);
});