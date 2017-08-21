/// A simple schema to manage your posts 
//  1). Creates an association between an Author and thier Posts
// 

module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define("Messages", 
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1]
        }
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1]
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1]
      }
    }
  );
  return Messages;
};
