import React  from 'react';
import {ApolloClient, InMemoryCache, HttpLink }from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from "./components/App";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import AddSong from "./components/AddSong";

const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://downtheblock-server.herokuapp.com/graphql'}),
    cache: new InMemoryCache({
        dataIdFromObject: object => `${object.__typename}${object.id}` || null
    })
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <App>
                    <Route path="/" exact component={UserList}/>
                    <Route path="/users" component={UserList}/>
                    <Route path="/songs/new" component={AddSong}/>
                    <Grid  container direction="column" justifty="space-evenly" alignItems="center">
                        <Grid item xs={8}>
                            <Route path="/signup" exact component={CreateUser}/>
                        </Grid>
                    </Grid>
                </App>
            </Router>
        </ApolloProvider>
    )
}

export default Root;
