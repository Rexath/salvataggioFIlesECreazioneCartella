import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import LoginUser from "./LoginUser.jsx";
import ListUsersComponent from "./ListUsersComponent.jsx";
import UploadFiles from "./UploadFiles.jsx";
//import AddUser from "./AddUser.jsx";
//import AddUserPage from "./AddUserPage.jsx";
//import EditUserComponent from "./user/EditUserComponent";

import React from "react";

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={ListUsersComponent} />
                        <Route path="/upload-file" exact component={UploadFiles} />
                       {/*<Route path="/add-user/:id" component={AddUser} />
                        <Route path="/login" exact component={LoginUser} />*/}
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

const style = {
    color: 'red',
    margin: '10px'
}

export default AppRouter;