const express=require('express');
const app=express();
const path=require('path');
const props=require('./utilities/properties');

//app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.json());
app.use(express.urlencoded());


app.set('views','./views');
app.set('view engine', 'pug');


app.use('/',require('./routes/index'));


app.listen(props.serverPort,()=>{
    console.log('listening on port ' + props.serverPort);
})