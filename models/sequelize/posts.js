/// A simple schema to manage your posts 
//  1). Creates an association between an Author and thier Posts
// 

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", 
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Personal"
      }
    },
    {
      // Create an association between an Author and thier Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          Post.belongsTo(models.Author, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Post;
};
