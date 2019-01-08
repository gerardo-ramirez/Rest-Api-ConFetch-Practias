const express= require('express');
const route = express.Router();
//Requerimos el json ( manual pues no se autocompleta):
const movies = require('./../data/sample.json');

const _ = require('underscore');


route.get('/',(req,res)=>{
    res.json({"title:": "Hola api y json genio!"});
});
route.get('/test',(req,res)=>{
    const data = {
        "name": "gerardo",
        "prodesion":"developer"
    };
    res.json(data);
});
route.get('/api/movies',(req,res)=>{
    res.json(movies);

});

route.post('/api/movies',(req,res)=>{
    const {title, director, year, rating} = req.body;


    //podemos poner condicional:
    //si existe title y director etc:
    if( title && director && year && rating){
    //hacemos que la aplicacion genere un id:
    const id = movies.length + 1 ;

    const newMovie = {...req.body, id};//Asi pasamos toda la info del req.body, sin necesidad de copiar todo.
    //Tambien le sumamos id que crea la app.
    //console.log(newMovie);
    //como guardar el dato en el json de movies:
    movies.push(newMovie);
    res.json(movies); // devolvemos el json movies pero actualizado.
}else{
    res.send('grave error');
}
   
});
//utilizamos la libreria underscore:
route.delete('/api/movies/:id',(req,res) =>{
    //desde underscore utilizo su metodo each para recorrer el json.
    /*       recorre movies y obtiene movie y un indice
    si el id de ese indice = id lo remuevo con splice dandole el indice y la cantidadd */ 
    const {id} = req.params;
    _.each(movies, (movie, i) =>{
        if(movie.id == id){
        // remueve una  pelicula .
            movies.splice(i,1);

        }

    });
    //devolvemos el objeto:
    res.send(movies);


});

//ACTUALIZAR:
route.put('/api/movies/:id', (req,res)=>{
    const {title, director, year, rating} = req.body;
    const {id} = req.params;
    if( title && director && year && rating){
/* otra vez recorremos pero para actualizar pelicula*/ 
        _.each(movies, (movie, i) =>{
            if(movie.id == id){
            // actualiza pelicula con los datos del body.
                movie.tite = title,
                movie.director = director ,
                movie.year = year,
                movie.rating = rating;
    
            }
    
        });
        //devolvemos el objeto:
        res.send(movies);


    }else{
        res.send('grave error');
    }

});


module.exports = route;