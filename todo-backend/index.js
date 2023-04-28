const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require('body-parser');
//const Sequelize = require("sequelize");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.TEAM_NAME, process.env.USER_NAME, process.env.PASSWORD,
    {
        dialect: "postgres",
        port: process.env.PORT,
        host: process.env.HOST,
    });

// add cors
const cors = require('cors');

app.use(cors());

app.get("/", (req, res) => {

    res.json(itemLists);
});

// use body parser to extract data from post body.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
//get item
app.get("/tasks", getItem);

const getItem = async (req, res) => {
    //auth
   // if (req.headers["Authorization"] != "banana") {
     //   return res.status(401).end();

    };

    const tasks = await Task.findAll();
    res.json(tasks.map((t) => t.toJSON()));

    console.log(tasks);
}

//add and create item
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
// Update items
app.patch("/task/:id", async (req, res) => {
    try {
        const completed = req.body;
        const { id } = req.params;
        console.log("patch received body", id, completed)
        await Task.update(completed, { where: { id } });
        res.end();

    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
});
//Delete items
app.delete("/task/:id", async (req, res) => {
    const { id } = req.params;
    await Task.destroy({ where: { id: id } })
    res.end();
});


app.listen(8080, () => {
    "Example app listening on port 8080";
});
