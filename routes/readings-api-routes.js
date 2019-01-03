var db = require("../models");

module.exports = function(app) {
    

    
    app.post("/api/readings", function(req, res) {
       db.Reading.create({
           place:  req.body.place,
           address: req.body.address,
           gallons: req.body.gallons,
           price: req.body.total,
           perGallon: req.body.perGallon
       }).then(function(result) {
           res.json(result);
       });
    });

    app.get("/", function(req, res) {
        db.Reading.findAll({
           ////look to order in descend
           order: [['id', 'DESC']]
        }).then(function(data) {
           console.log(data);
           res.render("index", { readings: data });
            
        });
    });

    app.delete("/api/delete/:id", function(req, res) {
        db.Reading.destroy({
          where: {
              id: req.params.id
          }
        }).then(function(dbReadings){
          res.json(dbReadings)
        });
    });

    app.get("/api/find/:id", function(req, res) {
        db.Reading.findOne({
        where: {
            id: req.params.id
        }
      }).then(function(dbReadings) {
        res.json(dbReadings);
      });
    });
    
    app.put("/api/update/:id", function(req, res) {
        db.Reading.update({
          place: req.body.place,
          address: req.body.address,
          gallons: req.body.gallons,
          price: req.body.total,
          perGallon: req.body.perGallon
        }, 
    { where: { id: req.params.id }
            
        }).then(function(result) {
            res.json(result);
        });
    });
};