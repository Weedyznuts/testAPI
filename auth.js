var connection=require('../connection');
var mysql=require('mysql');
var md5=require('md5');
var response=require('../res');
var jwt=require('jsonwebtoken');
var config=require('../config/secret');
var ip=require('ip');

exports.registration=function(req,res){
    var post= {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }
    var query= 'SELECT email FROM ?? WHERE ?? = ?';
    var table= ['user','email',post.email];
    query=mysql.format(query,table);
    connection.query(query,function(error,rows){
        if (error) {
            console.log (error);
        }
        else {
            if (rows.length==0) {
                var query='INSERT INTO ?? SET ?';
                var table=['user'];
                query=mysql.format(query,table);
                connection.query(query,post,function(error,rows){
                    if (error) {
                        console.log (error);
                    }
                    else {
                        response.ok('Data successfully added',res);
                    }
                });
            }
            else {
                response.ok('email telah terdaftar',res);
            }
        }
    })
};

exports.login=function(req,res) {
    var post={
        password:req.body.password,
        email:req.body.email,
    }
    var query="SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table=['user','password',md5(post.password),'email',post.email];
    query=mysql.format(query,table);
    connection.query(query,function(error,rows){
        if (error) {
            console.log(error);
        }
        else {
            if (rows.length==1){
                var token=jwt.sign({rows},config.secret,{
                    expiresIn:'2400000'
                });
                id_user=rows[0].id;
                var data={
                    id_user:id_user,
                    access_token:token,
                    ip_address:ip.address()
                }
                var query='INSERT INTO ?? SET ?';
                var table=['access_token'];
                query=mysql.format(query,table);
                connection.query(query,data,function(error,rows){
                    if (error) {
                        console.log(error);
                    }
                    else {
                        res.json({
                            success:true, 
                            message:'token jwt generated',
                            token:token,
                            //expires:expired//
                            currUser: data.id_user,
                        });
                    }
                });
            }
            else {
                res.json({'Error':true,'Message':'Email not regtstered or password is wrong'});
            }
        }
    });

    
}

exports.changepassword=function (req,res) {
    var data={
        email:req.body.email,
        currpassword:md5(req.body.currpassword),
        newpassword:md5(req.body.newpassword),
    }
    var query="SELECT email,password FROM ?? WHERE ?? = ?";
    var table=['user','email',data.email];
    query=mysql.format(query,table);
    connection.query (query,function(error,rows){
        if (error) {
            console.log(error);
        }
        else {
            if (rows.length==1) {
                email=rows[0].email;
                password=rows[0].password;
                if (data.currpassword==password) {
                    if (data.newpassword==data.currpassword) {
                        res.json({
                            success:false,
                            message:"new password can't be the same as the old password. Try another password!"
                        }).end()
                    }
                    else {
                        connection.query('UPDATE user SET password = ? WHERE email = ?',
                            [data.newpassword,email],
                            function(error,rows,fields){
                                if (error) {
                                    res.json({
                                        success:false,
                                        message:error,
                                    }).end()
                                }
                                else {
                                    res.json({
                                        success:true,
                                        message:'Password updated successfully'
                                    }).end()
                                }
                            }
                        )
                    }
                }
                else {
                    res.json({
                        success:false,
                        message: "failed to update password"
                    }).end()
                }
            }
            else {
                res.json({
                    success:false,
                    message: "wrong password"
                }).end()            
            }
        }
    });
}

exports.secretpage=function (req,res){
    response.ok('This page is only available for user role 1',res);
}

