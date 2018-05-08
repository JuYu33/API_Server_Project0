const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../auth_middleware/check_auth');
const OrdersController = require('../controllers/orders');


router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order);

router.get('/:orderId', checkAuth, OrdersController.orders_get_specific);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;

/*
router.get('/', checkAuth, (req, res, next) => {
  Order
    .find()
    .select("product quantity _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: `${defaultOrdersUrl}${doc._id}`
            }
          }
        })

      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

router.post('/', checkAuth, (req, res, next) => {
  Product.findById(req.body.productId)
    .then(foundProduct => {
      if (!foundProduct) {
        return res.status(404).json({
          message: "Product not found"
        })
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      order.save()
    })
    .then(result => {
      // console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        result: {
          type: "GET",
          url: `${defaultOrdersUrl}${result._id}`
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Product not found',
        error: err
      })
    })
});

router.get('/:orderId', checkAuth, (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(foundOrder => {
      if (!foundOrder) {
        return res.status(404).json({
          message: "Product Not Found"
        })
      }
      res.status(200).json({
        order: foundOrder,
        request: {
          type: "GET",
          url: `${defaultOrdersUrl}`
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
  Order.remove({
    _id: req.params.orderId
  })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: `${defaultOrdersUrl}`,
          body: {
            productId: 'ID',
            quantity: "Number"
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    });
});
*/
