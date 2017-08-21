

// Syncing our sequelize models and then starting our express app

module.exports = function(app,sql,port) {
  sql.sequelize.sync({ force: true }).then(function() {
    app.listen(port, function() {
      console.log("App listening on PORT " + port);
    }); 
  });
}