// console.log("Run server by me")
const express = require("express"); //CommonJs Modules
const db = require("./data/hubs-model.js");

const server = express();

server.use(express.json()); //this is needed to pass json to the db
server.get("/", (req, res) => {
  res.send({ api: "up and running" });
});

//list of hubs
server.get("/hubs", (req, res) => {
  //get list with the db
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      console.log("error on GET /hubs", error);
      res
        .status(500)
        .json({ errorMessage: "error getting lsit of hubs from database" });
    });
});
// add hubs
server.post("/hubs", (req, res) => {
  const datahub = req.body;
  //call the db and add data
  db.add(datahub)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log("error on POST /hubs", error);
      res.status(500).json({ errorMessage: "error adding hubs to database" });
    });
});

//deleting from hub

server.delete("/hubs/:id", (req, res) => {
  const id = req.params.id;

  db.remove(id)
  .then(removed => {
    if (removed) {
      res
        .status(200)
        .json({ message: "Hub removed successfully from database", removed });
    }
    else {
        res.status(404).json({message:"hub not found"})
    }
  })
  .catch(error => {
    console.log("error on DELETE /hubs", error);
    res.status(500).json({ errorMessage: "error removing hub from database" });
  });

});
//update a hub
const port = 6000;
server.listen(port, () => console.log(`\n ** API on port${port}**\n`));
