const sequelize = require("sequelize");

const db = new sequelize(process.env.DATABASE_URL);

const ud = db.define("userdb", {
  id: {
    type: sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: sequelize.DataTypes.STRING,
  pass: sequelize.DataTypes.STRING
});


db.sync().then(function() {
  console.log("Database is ready");
});

module.exports = {
  ud
};
