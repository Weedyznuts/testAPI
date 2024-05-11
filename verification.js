const jwt=require('jsonwebtoken');
const config=require('../config/secret')

function verifikasi(){
    return function (req,res,next){
        var role=req.body.role;
        var tokenWithBearer=req.headers.authorization;
        if (tokenWithBearer) {
            var token=tokenWithBearer.split(' ')[1];
            jwt.verify(token,config.secret,function(err,decoded){
                if (err) {
                    return res.status(401).send({auth:false,message:'token not registered'});
                }
                else {
                    if (role==1){
                        req.auth=decoded;
                        next();
                    }
                    else {
                        return res.status(401).send({auth:false,message:'role authorization failed'});
                    }
                }
            });
        }
        else {
            return res.status(401).send({auth:false,message: 'token not available'});
        }
    }
}


module.exports=verifikasi;