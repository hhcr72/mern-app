import React, { Component } from 'react'
import axios from 'axios'

export default class createUser extends Component {

    //creamos el arreglo 
    state = {
        users: [],
        username: '',
    }

    // pedimos datos al servidor
    componentDidMount() {
        this.getUsers();
        //console.log(this.state.users)
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({ users: res.data }) //almacenamos usuarios
    }

    onChangeusername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault()
        //const res = 
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        })  
        this.setState({username: ''}); //pongo el estado en vacio
        this.getUsers();
        //console.log(res)    
    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="card" >
                        <div className="card-header text-center">
                            <h5>Create New User</h5>

                            <div className="card-card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control"  value={this.state.username} onChange={this.onChangeusername} />
                                    </div>
                                    <div className="fmb-1 d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="list-group">
                        {
                            this.state.users.map(user =>
                                <li 
                                className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}
                                >
                                 {user._id} -  {user.username}
                                </li>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
