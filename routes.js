'use strict';

module.exports=function(app){
    var myjson=require('./controller');
    app.route('/').get(myjson.index);
    app.route('/showcontact').get(myjson.showcontact);
    app.route('/showcontactbyid/:id').get(myjson.showcontactbyid);
    app.route('/addcontact').post(myjson.addcontact);
    app.route('/changedata').put(myjson.changedata);
    app.route('/deletedata').delete(myjson.deletedata);
    app.route('/showtransaction').get(myjson.showtransaction);
}