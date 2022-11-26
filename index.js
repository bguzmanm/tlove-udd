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

const posInArray = (name) => {
  const element = getOne(name);
  return lovers.indexOf(element);
}

const editLover = (name, newName, newLastname, newAge) => {
  // buscar el lover en el arreglo de lovers y entrega la posición
  const pos = posInArray(name);
  lovers[pos] = {
    name: newName,
    lastname: newLastname,
    age: newAge
  };
};

const deleteLover = (name) => {
  // const pos = posInArray(name);
  // lovers = lovers.slice(pos, 1);

  lovers = lovers.filter((lover) => lover.name != name);

};

// RUTAS
// read
app.get(process.env.URL_APP + "/lovers", (req, res) => {
  res.json(getAll());
});
// read
app.get(process.env.URL_APP + "/lovers/:name", (req, res) => {
  res.json(getOne(req.params.name));
});
// create
app.post(process.env.URL_APP + "/lovers", (req, res) => {
  addLover(req.body);
  res.send("ok");
});
// update
app.patch(process.env.URL_APP + "/lovers/:name", (req, res) => {
  editLover(req.params.name, req.body.name, req.body.lastname, req.body.age);
  res.send("ok");
});
// delete
app.delete(process.env.URL_APP + "/lovers/:name", (req, res) => {
  deleteLover(req.params.name);
  res.send("ok");
})

app.listen(process.env.PORT, () => {
  console.log(`listen in port ${process.env.PORT}`);
});