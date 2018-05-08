const express = require('express');
const router = express.Router();

const checkAuth = require("../auth_middleware/check_auth");
const userController = require("../controllers/user");


router.post('/signup', userController.user_create);

router.post('/login', userController.user_login);

router.delete('/delete/:userId', checkAuth, userController.delete_user);


module.exports = router;


/*

{
	"email": "fake@mail.netm",
	"password": "pw123"
}

router.post('/signup', (req,res,next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email not avaialbe, already exists",
        })
      } else {
        bcrypt.hash(req.body.password, 11, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const newUser = new User({
              _id : new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            newUser.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User Created',
                  email: result.email,
                  password: result.password
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    })
    .catch()
});

router.post('/login', (req,res,err) => {
  User.findOne({email: req.body.email})
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Email and/or Password entered incorrectly",
        })
      } else {
        bcrypt.compare(req.body.password, users.password, (err, result) => {
          if (result) {
            const jToken = jwt.sign({
              email: users.email,
              _id: users._id
            }, 
            process.env.MY_JWT_KEY,
            {
              expiresIn: '1h'
            },

          )
            return res.status(200).json({
              message: "Auth successful",
              token: jToken
            })
          } else {
            return res.status(401).json({
              message: "Email and/or Password entered incorrectly",
            })
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

router.delete('/delete/:userId', (req,res,err) => {
  User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: `User deleted`,
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
})
*/