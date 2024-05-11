var express=require('express');
var auth=require("./auth");
var router=express.Router();
var verifikasi=require("./verification")

router.post('/api/v1/register',auth.registration);
router.post('/api/v1/login', auth.login)
router.post('api/v1/changepassword',verifikasi(),auth.changepassword);
router.get('/api/v1/secretpage',verifikasi(),auth.secretpage)

module.exports=router;