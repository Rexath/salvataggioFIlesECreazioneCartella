import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ListUsersComponent from "./ListUsersComponent.jsx";

// import AddUserPage from "./AddUserPage.jsx";
 
//import EditUserComponent from "./user/EditUserComponent";

import React from "react";

const AppRouter = () => {
    return(
        <div>
            <Router>
                <div className="col-md-6 offset-3">
                    <Switch>
                        <Route path="/" exact component={ListUsersComponent} />
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