const express=require('express');
const bodyParser=require('body-parser');
const app=express();

var morgan=require('morgan');

//*setting json body parser*//
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//*routing*//
var routes=require('./routes');
routes(app);
app.use('/auth',require('./middleware'));
app.listen(3000,()=>{
    console.log('server started');
});