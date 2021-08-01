const {Schema, model} = require('mongoose');
//const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {type: String, trim: true, required: true, unique: true}
    // name: {type: String, required: true},
    // email: {type: String, required: true, unique: true},
    // password: {type: String, required: true}   
}, {
    timestamps: true //agrega automaticamente a la bd la fecha de creacion y modifiocacion
});


module.exports = model('User', UserSchema, 'Users'); //exportamos el modelo (model, schema, colection_bd )