'use strict';
var response=require('./res');
var connection=require('./connection');

exports.index=function(req,res){
    response.ok('API berjalan',res);
};

exports.showcontact=function(req,res){
    connection.query('SELECT * FROM contact',function(error,rows,fields){
        if(error){
            connection.log(error);
        }
        else {
            response.ok(rows,res);
        }
    });
};

exports.showcontactbyid=function(req,res){
    var id=req.params.id
    connection.query('SELECT * FROM contact WHERE id=?',[id],
        function(error,rows,field){
            if(error){
                connection.log(error);
            }
            else {
                response.ok(rows,res);
            }
        }
    );
};

exports.addcontact=function(req,res){
    var nama=req.body.nama;
    var nomor_hp=req.body.nomor_hp;
    var alamat_email=req.body.alamat_email;
    var alamat_rumah=req.body.alamat_rumah;
    connection.query('INSERT INTO contact (nama,nomor_hp,alamat_email,alamat_rumah) VALUES(?,?,?,?)',[nama,nomor_hp,alamat_email,alamat_rumah],
        function(error,rows,field){
            if(error){
                console.log(error);
            }
            else {
                response.ok('data successfully added',res);
            }
        }
    );
};

exports.changedata=function(req,res){
    var id=req.body.id;
    var nama=req.body.nama;
    var nomor_hp=req.body.nomor_hp;
    var alamat_email=req.body.alamat_email;
    var alamat_rumah=req.body.alamat_rumah;
    connection.query('UPDATE contact SET nama=?, nomor_hp=?, alamat_email=?, alamat_rumah=? WHERE id=?',
        [nama,nomor_hp,alamat_email,alamat_rumah,id],
        function(error,rows,field){
            if(error){
                console.log(error);
            }
            else {
                response.ok('data successfully updated',res);
            }
        }
    );
};

exports.deletedata=function(req,res){
    var id=req.body.id;
    connection.query('DELETE FROM contact WHERE id=?',[id],
    function(error,rows,field){
        if(error){
            console.log(error);
        }
        else {
            response.ok('data successfully deleted',res);
        }
    }
    );
};

exports.showtransaction=function(req,res){
    connection.query('SELECT contact.id, contact.nama, contact.nomor_hp, contact.alamat_email, contact.alamat_rumah, barang.nama_barang FROM transaksi JOIN barang JOIN contact WHERE transaksi.id_customer = contact.id AND transaksi.id_barang = barang.id_barang',
    function(error,rows,field){
        if(error){
            console.log(error);
        }
        else {
            response.daftar(rows,res);
        }
    }
);
};


//SELECT contact.id, contact.nama, contact.nomor_hp, contact.alamat_email, contact.alamat_rumah, barang.nama_barang
//FROM transaksi
//JOIN barang JOIN contact
//WHERE transaksi.id_customer = contact.id AND transaksi.id_barang = barang.id_barang