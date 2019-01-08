const express= require('express');
const otraApi= express.Router();
const fetch = require('node-fetch');
//como es otra api va a tardar por lo que usamos async y aweit para que no nos de error.
otraApi.get('/user', async (req,res)=>{
    //almacenamos la peticion
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    //como fetch devuelve string hay que transformar a json:
    const users = await response.json();
    //llamamos el json:
    res.json(users);




});
module.exports= otraApi;