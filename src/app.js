const express = require('express');
const app = express();
const morgan = require('morgan');
const root= require('./../routes/router');
const otraApi = require('./../routes/usamosFetch'); //usamos Api de otro servidor con Node-Fetch;


//setting
app.set('port', process.env.PORT || 8080);
//ordenar la vista del json:
app.set('json spaces', 2);
/*  se verá asi en la interfaz:
{
  "title:": "Hola api y json genio!"
}
*/ 


//middleware
app.use(morgan('dev'));

//entender json;
app.use(express.json());

//entender formulario
app.use(express.urlencoded({extended: false}));
//route
app.use(root);
app.use(otraApi);

//starting the server
app.listen(app.get('port'),()=>{
 console.log('server on port')
}); 