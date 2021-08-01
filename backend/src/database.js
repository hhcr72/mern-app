const mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI  
// ? process.env.MONGODB_URI : 
// 'mongodb://localhost/mern-app' //accedo al entorno de variables de sistema y if/else 

//creamos variables de conexion con varibles de entorno
const { MERN_APP_MONGODB_HOST, MERN_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${MERN_APP_MONGODB_HOST}/${MERN_APP_MONGODB_DATABASE}`;


mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));

// const conection = mongoose.connection;

// conection.once('open', () => {
//     console.log('database is conected')
// });


