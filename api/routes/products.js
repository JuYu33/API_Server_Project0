const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../auth_middleware/check_auth');
const productController = require('../controllers/products');

//detail file storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); //null replaces error
  },
  filename: (req, file, cb) => {
    const dateNow = new Date().toISOString().replace(/:/g, '');
    const filename1 = dateNow + file.originalname.replace(/\\/g, '/');
    console.log(filename1);
    cb(null, filename1);
  }
})

const fileFilter = (req, file, cb) => {
      //could set error by replacing null with an error
      //succeeds regardless of filter. Just doesn't post ot uploads folder
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //accept file, and stores it
    cb(null, true);
  } else {
    //reject a file, ignores and no storing
    //if error then 
    cb(null, false);
  }
}

// const upload = multer({ dest: 'uploads/' });//configure the destination folder for incoming files
const MbyteLimit = 5;
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * MbyteLimit
  },
  fileFilter: fileFilter
});

router.get('/', productController.get_all_products);

router.post('/', checkAuth, upload.single('productImage'), productController.create_new_product);

router.get('/:productId', productController.get_product);

router.patch('/:productId', checkAuth, productController.edit_product);

router.delete('/:productId', checkAuth, productController.remove_product);

module.exports = router;

/*
router.get('/', (req, res, next) => {
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
                url: `http://localhost:3000/products/${doc._id}`//dynamically pull the URL or hard code to connect
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
});

router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
  console.log(req.file)//req.file availabe from multer upload.single
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
        message: "Handling POST requests to /products", //generic blah
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/products/${result._id}`
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

});

router.get('/:productId', (req, res, next) => {
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

});

router.patch('/:productId', checkAuth, (req, res, next) => {
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
          url: `http://localhost:3000/products/${id}`
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });


});

router.delete('/:productId', checkAuth, (req, res, next) => {
  const id = req.params.productId;

  Product.remove({ _id: id }).exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          message: "Send a new POST request at link to create a new product",
          type: "POST",
          url: 'http://localhost:3000/products',
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

});
*/



/*

pre.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req,res,next) => {
  Product.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
      // empty array = 404?
      // if(docs.length >= 0) {
      //   res.status(200).json(docs);
      // } else {
      //   res.status(404).json({
      //     message: "no object found";
      //   })
      // }
      
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });

  // generic GET handler
  // res.status(200).json({
  //   message: "Handling GET requests to /products"
  // });
  
});

router.post('/', (req,res,next) => {
  // const product = {
  //   name: req.body.name,
  //   price: req.body.price
  // }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  //mongoose uses save() to store in database
  //product.save((err,result)); //something else
  //product.save().exec(); //turns this into a promise
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  
});

router.get('/:productId', (req,res,next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: `No entry found for your search request`});
      }
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });


  // dummy data
  // const id = req.params.playerId;
  
  // if (id == 'Davis') {
  //   res.status(200).json({
  //     playerName: "Anthony Davis",
  //     id: id
  //   })
  // } else {
  //   res.status(200).json({
  //     message: "No player found"
  //   })
  // }
  
});

router.patch('/:productId', (req,res,next) => {
  const id = req.params.productId;
  //check to see if update 0,1 or both
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  // Product.update({ _id: id }, { $set: {name: req.body.newName, price: req.body.newPrice}});
  Product.update({ _id: id }, { $set: updateOps})
    .exec()
    .then(result => {
      console.log(res);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });

  // generic patch
  // res.status(200).json({
  //   message: 'Updated player data'
  // })
  
});

router.delete('/:productId', (req,res,next) => {
  const id = req.params.productId;

  Product.remove({_id: id}).exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
  // generic delete
  // res.status(200).json({
  //   message: 'Deleted player'
  // })
  
});

module.exports = router;
*/