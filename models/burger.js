module.exports = function(sequelize, DataTypes){

  var Burger = sequelize.define("burger", {
    item_id : {
      type: DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true,
      allowNull: false
    },
    burger_name :{
      type:DataTypes.STRING(40),
      allowNull : false

    },
    devoured : {
      type:DataTypes.BOOLEAN,
      defaulValue : false,
      allowNull : false
    },
   
     
  });

  return Burger;
};

 