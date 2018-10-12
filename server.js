require('dotenv').config();

const express = require('express'),
      app = express(),
      logging = require('morgan'),
      ejs = require('ejs'),
      ejsLayouts = require('express-ejs-layouts'),
      axios = require('axios');

const apiClient = axios.create();


app.use(logging('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', (req, res) => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    apiClient({method: "get", url: apiUrl}).then(apiRes => {
        res.render('index');
    })
})

app.get('/posts', (req, res) => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    apiClient({method: "get", url: apiUrl}).then(apiRes => {
        let body = [];
        for(var i = 0; i < apiRes.data.length; i++){
            body.push(apiRes.data[i]);
        }
        res.render('post', {body: body});
    })
})

app.listen(process.env.PORT, err => {
    console.log(err || `listening on port ${process.env.PORT}....`)
})