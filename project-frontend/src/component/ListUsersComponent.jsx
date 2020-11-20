import React, { Component } from 'react';
import UserDataService from '../service/UserDataService.js';

class ListUsersComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }
        this.refreshUsers = this.refreshUsers.bind(this)
    }

    componentDidMount() {

        this.refreshUsers();
    }

    refreshUsers() {
        UserDataService.retrieveAllUsers()
            .then(
                response => {
                    console.log(response);
                    this.setState({ users: response.data })
                    
                }
            )
    }

    render() {
        return (
            <div className="container">
                <h3>All Users</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Email</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.nome}</td>
                                            <td>{user.cognome}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <p id="ciao"></p>
                </div>
            </div>
        )
    }
}

export default ListUsersComponent;