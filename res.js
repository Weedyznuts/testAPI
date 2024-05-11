'use strict';

exports.ok=function(values,res){
    var data={
        'status':200,
        'values':values,
    };
    res.json(data);
    res.end();
};

exports.daftar=function(values,res){
    const result=values.reduce((accumulator,item)=>{
        if (accumulator[item.nama]){
            const group=accumulator[item.nama];
            if(Array.isArray(group.nama_barang)){
                group.nama_barang.push(item.nama_barang);
            } 
            else {
                group.nama_barang=[group.nama_barang,item.nama_barang];
            }
             
        }
        else {
            accumulator[item.nama]=item
        }
        return accumulator;
    },{});
    var data={
        'status':200,
        'values':result,
    };
    res.json(data);
    res.end();
};