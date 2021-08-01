const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: String, required: true},
    date: {type: Date, default: Date.now}
}, {
    timestamps: true //agrega automaticamente a la bd la fecha de creacion y modifiocacion
});

module.exports = model('Note', NoteSchema, 'Notes'); //exportamos el modelo (model, schema, colection_bd )