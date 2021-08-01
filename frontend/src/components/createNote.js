import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'



export default class createNote extends Component {

    //creamos el arreglo 
    state = {
        users: [],
        userSelected: '',
        title: '',
        description: '',
        date: new Date(),
        editing: false,
        _id: ''
   }

 // pedimos datos al servidor
 async componentDidMount() {
      
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({ 
        users: res.data.map(user => user.username),
        userSelected: res.data[0].username //asigno el promer registro al combo
    }) //almacenamos usuarios
    
    //verifico si traigo un id para la edicion
    if (this.props.match.params.id) {
        const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
       
        this.setState({
            title: res.data.note.title,
            description: res.data.note.description,
            date: new Date(res.data.note.date),
            userSelected: res.data.note.user,
            editing: true,
            _id: this.props.match.params.id 
        })
        console.log(this.state.title)
    }
    
}


    onSubmit = async (e) => { 
        e.preventDefault()
        const newNote = {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            user: this.state.userSelected
        }    
        if (this.state.editing) {
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote);
        } else {
            await axios.post('http://localhost:4000/api/notes', newNote);
        } 
       window.location.href = "/";
    }

    onInputChange = e => {

        this.setState({
            [e.target.name]: e.target.value //valor de seleccion
        })

    }

    onChangeDate = date => {
        this.setState({date})
    }

    render() {
        return (
     
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h2>Create Notes</h2>
                    </div>
                    <div className="card card-body">
                      
                        {/* selecciono usuario */}
                        <div className="mb-3">
                            <select 
                            className="form-select"
                            name="userSelected"
                            onChange={this.onInputChange} 
                            value={this.state.userSelected}
                            > {
                                this.state.users.map(user => 
                                    <option key={user} value={user}>
                                        {user}
                                    </option>
                                )
                            } </select>

                        </div>

                        <div className="mb-3">
                            <input type="text" name="title" className="form-control" onChange={this.onInputChange} value={this.state.title} placeholder="Title" required/>
                        </div>
                        <div className="mb-3">
                            <textarea name="description"  className="form-control" onChange={this.onInputChange} value={this.state.description} placeholder="Description" required ></textarea>
                        </div>
                        
                        <div className="mb-3">
                            <DatePicker
                                className="form-control"
                                selected={this.state.date} //when day is clicked
                                onChange={this.onChangeDate}
                                />
                        </div>
                        
                        <form onClick={this.onSubmit} >
                            <div type="submit" className="btn btn-primary">
                                Save
                            </div>                          
                        </form>
                      
                    </div>
                </div>
            </div>

        )
    }
}
