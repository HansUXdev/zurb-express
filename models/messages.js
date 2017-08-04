/// A simple schema to manage your posts 
//  1). Creates an association between an Author and thier Posts
// 

module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define("Messages", 
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      Email: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      Message: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    }
  );
  return Messages;
};
