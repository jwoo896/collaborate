import React  from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserList from "./components/UserList";

const client = new ApolloClient();

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <AppBar position="sticky" color="secondary">
                    <Toolbar>
                        <Button color="inherit"><Link to="/" style={{textDecoration: 'none', color: '#fff'}}>Login</Link></Button>
                        <Button color="inherit"><Link to="/users" style={{textDecoration: 'none', color: '#fff'}}>Users</Link></Button>
                    </Toolbar>
                </AppBar>
                <Route path="/" exact component={UserList}/>
                <Route path="/users" component={UserList}/>
            </Router>
        </ApolloProvider>
    )
}

export default Root;