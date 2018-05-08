const mongoose = require("mongoose");
const Product = require('../models/products');


exports.get_all_products = (req, res, next) => {
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

exports.create_new_product = (req, res, next) => {
  // console.log(req.file)//req.file availabe from multer upload.single
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Creating a new product", //generic blah
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: `http://${req.headers.host}/products/${result._id}`
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
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

exports.edit_product = (req, res, next) => {
  const id = req.params.productId;
  //check to see if update 0,1 or both
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  // Product.update({ _id: id }, { $set: {name: req.body.newName, price: req.body.newPrice}});
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      // console.log(res);
      res.status(200).json({
        message: 'Product Updated',
        request: {
          type: 'GET',
          url: `http://${req.headers.host}/products/${id}`
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}

exports.remove_product = (req, res, next) => {
  const id = req.params.productId;

  Product.remove({ _id: id }).exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          message: "Send a new POST request at link to create a new product",
          type: "POST",
          url: `http://${req.headers.host}/products`,
          body: {
            name: 'String',
            price: 'Number'
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
}