const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require('body-parser');
//const Sequelize = require("sequelize");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("Team7YL", "hyper", "Rox6kTdcxcRzPeEWB6Ff",
    {
        dialect: "postgres",
        port: 5432,
        host: "104.199.12.40",
    });


// sequelize.authenticate().then(() => {
//     console.log("connection successful");
// }).catch((err) => { console.log("error connecting to database!") })


// console.log("another task")

let itemLists = [
    {
        title: "Breakfast",
        description: "Milk ==== and Bacon Backend",
    },
    {
        title: "Shopping lllhkb List",
        description: "Dipper and backend"
    }
];
// add cors
const cors = require('cors');

app.use(cors());

app.get("/", (req, res) => {

    res.json(itemLists);
});

// use body parser to extract data from post body.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// receive new item as body and add it to database then send the whole items to frontEnd
app.post("/newItem/", (req, res) => {
    let newItem = req.body;
    itemLists.push(newItem);
    res.json(itemLists);
});


//test

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

main();
//app.use(morgan("tiny"));

//const port = 3000;

//app.use(bodyParser.json());

app.get("/tasks", async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks.map((t) => t.toJSON()));

    console.log(tasks);
});

app.post("/task", async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await Task.create({ "title": title, "description": description });
        return res.json(task.toJSON());
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }


});

app.patch("/task/:id", async (req, res) => {
    const { completed } = req.body;
    const { id } = req.params;
    await Task.update({ completed }, { where: { id } });
    res.end();
});


app.listen(8080, () => {
    "Example app listening on port 8080";
});