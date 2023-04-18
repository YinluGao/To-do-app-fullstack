const Sequelize = require("sequelize");
const sequelize = new Sequelize("anton", "hyper", "Rox6kTdcxcRzPeEWB6Ff", {
    dialect: "postgres",
    port: 5432,
    host: "104.199.12.40",
});


sequelize.authenticate().then(() => {
    console.log("connection successful");
}).catch((err) => { console.log("error connecting to database!") })


console.log("another task")
//module.exports = sequelize;