const User = require("../models/User");

const usersCtrl = {}; //lo guardo en un objeto

//obtengo todos los usuarios
usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
} 
//crea nuevo usuario
usersCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({
        username: username
    })
    await newUser.save()
    res.json({messaje: 'Post - crea nuevo usuario '})
} 

//elimino un usuario
usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({messaje: 'Delete - elimino un usuario'})
} 

module.exports = usersCtrl;