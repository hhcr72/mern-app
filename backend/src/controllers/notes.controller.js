const Note = require("../models/Note");

const notesCtrl = {}; //lo guardo en un objeto


//obtengo todas las notas
notesCtrl.getNotes =  async (req, res) => {
    const notes = await Note.find(); //lean() corrige error de muestra de datos
    res.json(notes);
} 

//crea nueva nota
notesCtrl.createNote = async (req, res) => {
    const { title, description, date, user } = req.body;
    const newNote = new Note({
        title: title,
        description: description,
        date: date,
        user: user
    })
    await newNote.save()
    res.json({message: 'nota guardada'});
}

//obtengo una nota
notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json({ note })
} 

//actualizo una nota
notesCtrl.updateNote = async (req, res) => {
    const { title, description, user } = req.body;
    await Note.findOneAndUpdate(req.params.id, {title, description, user});
    res.json({messaje: 'PUT - Actualizo una nota ' + req.params.id})  
} 

//elimino una nota
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json({messaje: 'Delete - elimino la nota ' + req.params.id })
} 

module.exports = notesCtrl;