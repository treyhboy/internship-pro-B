const sequelize = require("sequelize");

const db = new sequelize({
  host: "localhost",
  username: "root",
  database: "db",
  password: "taruntrehan",
  dialect: "mysql"
});

const ud = db.define("userdb", {
  id: {
    type: sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: sequelize.DataTypes.STRING,
  pass: sequelize.DataTypes.STRING
});

const chats =  db.define('chats',{
  id:{
    type: sequelize.DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  chat:sequelize.DataTypes.STRING,
  username:sequelize.DataTypes.STRING,
  sid:sequelize.DataTypes.STRING
});

db.sync().then(function() {
  console.log("Database is ready");
});

module.exports = {
  ud,
  chats
};
