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
    }
    
     
  },
  
  {
     
    tableName: "burgers",
    classMethods: {
     
      associate: function(models){
        //Each burger belongs to specific customer
        Burger.belongsTo(models.Customer,{
          foreignKey:{
            allowNull : false  // for now, allow blank customer names
          }
        });
      }
    }
    
  }
 
);  

 

  return Burger;
};

 