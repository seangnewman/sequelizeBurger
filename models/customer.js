module.exports = function(sequelize, DataTypes){
  var Customer = sequelize.define("customer", {
    customer_id : {
      type: DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true,
      allowNull: false
    },
    customer_name :{
      type:DataTypes.STRING(40),
      allowNull : false
    }
  },
   
  );

 
  return Customer;
}