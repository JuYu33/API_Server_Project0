const mongoose = require("mongoose");
const Games = require('../models/games');

/*
  MONGO ATLAS: 

  UI will implement select date dropdown form
    -query database for games on selected date
      -return DB.games || (Fetch API.games && POST TO DB)
    -setState games array
    -load component with games information
  information clickable for query for games data
    -query databes for selected game
      -return DB.game || (Fetch API.game && POST TO DB)
    -setState game data
    -load component with game data
*/
exports.get_all_games = (req, res, next) => {
  const gamesOnDate = req.params.gamesDate;
  const id = [];
  Games.find()  //this needs to find array of games. [] renders no games scheduled. else return [..];
    .select("_id date games")
    .exec()
    .then()
    .catch(err => {
      console.log("Error retreiving game info");
      res.status(404).json({
        error: err
      })
    });
  
  Games.findById(id)
    .select("_id price name productImage")
    .exec()
    .then(doc => {
      // console.log(doc);
      if (doc) {
        res.status(200).json({
          message: "Product found",
          request: {
            type: "GET",
            data: {
              _id: doc._id,
              name: doc.name,
              price: doc.price,
              productImage: doc.productImage,
            }
          }
        });
      } else {
        res.status(404).json({ message: `No entry found for your search request` });
      }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};



/*
exports.get_games = (req, res, next) => {
  console.log(req.headers);
  Product.find()
    .select('name price _id productImage')//only grab the values identified in the string
    .exec()
    .then(docs => {
      // console.log(docs);
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            url: {
              request: {
                type: 'GET',
                url: `http://${req.headers.host}/products/${doc._id}`//dynamically pull the URL or hard code to connect
              }
            }
          }
        })
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};
*/