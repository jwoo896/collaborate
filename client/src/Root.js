import React  from 'react';
import {ApolloClient, InMemoryCache, HttpLink }from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import AddSong from "./components/AddSong";

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:4000/graphql'}),
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null
    })
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <AppBar position="sticky" color="secondary">
                    <Toolbar>
                        <Button color="inherit"><Link to="/" style={{textDecoration: 'none', color: '#fff'}}>Login</Link></Button>
                        <Button color="inherit"><Link to="/signup" style={{textDecoration: 'none', color: '#fff'}}>Sign up</Link></Button>
                        <Button color="inherit"><Link to="/users" style={{textDecoration: 'none', color: '#fff'}}>Users</Link></Button>
                        <Button color="inherit"><Link to="/songs/new" style={{textDecoration: 'none', color: '#fff'}}>Add Song</Link></Button>
                    </Toolbar>
                </AppBar>
                <div style={{alignItems: "center"}}>
                    <Route path="/" exact component={UserList}/>
                </div>
                <Route path="/users" component={UserList}/>
                <Route path="/songs/new" component={AddSong}/>
                <Grid  container direction="column" justifty="space-evenly" alignItems="center">
                    <Grid item xs={8}>
                        <Route path="/signup" exact component={CreateUser}/>
                    </Grid>
                </Grid>
            </Router>
        </ApolloProvider>
    )
}

export default Root;