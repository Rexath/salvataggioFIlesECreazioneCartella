import React, { Component } from 'react';
import UserServiceData from '../service/UserServiceData.js';

class ListUsersComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            message: null
        }

        this.refreshUsers = this.refreshUsers.bind(this)
        this.uploadFileClicked = this.uploadFileClicked.bind(this)
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        UserServiceData.retrieveAllUsers()//HARDCODED
            .then(
                response => {
                    console.log(response);
                    this.setState({ users: response.data })
                }
            )
    }

    uploadFileClicked() {

        this.props.history.push(`/upload-file`)
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
                                            {/*<td><button className="btn btn-warning" onClick={() => this.deleteCourseClicked(course.id)}>Delete</button></td>*/}
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

                <button className="btn btn-success" onClick={this.uploadFileClicked}>Add</button>
            </div>
        )
    }
}

export default ListUsersComponent;