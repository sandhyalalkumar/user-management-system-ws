const express = require('express');
const passport = require('passport');
const userController = require("../controllers/user.controller")
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', passport.authenticate('local'), userController.login);
router.get('/profile/:userId', userController.profile);
router.get('/user/:username', userController.profileByUserName);

module.exports = router;