const express = require("express");
const app = express();
const Item = require("./Item");
const bodyParser = require("body-parser");
const cors = require('cors');
const getRate = require("./getRate");

app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/api/items", (req, res) => {
    Item.find()
        .then(found => res.json(found))
        .catch(() => res.sendStatus(500))
});

app.post("/api/items", (req, res) => {  
    getRate(req.body)
        .then(itemObj => new Item(itemObj).save())
        .then(saved => res.json(saved))
        .catch(() => res.sendStatus(400))
});

app.delete("/api/items/:id", (req, res) => {
    Item.remove({_id: req.params.id})
        .then(() => res.sendStatus(204))
        .catch(() => res.sendStatus(404))
});

app.put("/api/items/:id", (req, res) => {
    Item.update({_id: req.params.id}, req.body)
        .then(() => res.sendStatus(204))
        .catch(() => res.sendStatus(400))
});

app.listen(3001, () => {
    console.log("Example app listening on port 3001!");
});