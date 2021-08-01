const express = require('express');
const cors = require('cors');

//initializations
const app = express();


//setings
app.set('port', process.env.PORT || 4000); //establesco el puerto en caso que este disponible


//middlewares
app.use(cors());
app.use(express.json());//para trabajar co json


//Global Variables




//routes
// app.get('/api/notes/', (req, res) => { res.send('notas'); });
app.use('/api/notes', require('./routes/notes'));
app.use('/api/users', require('./routes/users'));



//static files



module.exports = app;