const express = require("express");
const router = express.Router()

const AuthenticationController = require('../controllers/Authetication')

router.post('/signin', AuthenticationController.signin)
router.post('/login', AuthenticationController.login)
router.get('/',AuthenticationController.checking)

module.exports = router