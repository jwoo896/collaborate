import React, { Component } from 'react';
import fetchUsers from "../queries/fetchUsers";
import { graphql } from "react-apollo";
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Grid,
    IconButton,
    Avatar
} from "@material-ui/core";
import { Menu, AccountCircle } from "@material-ui/icons";

import Geocode from 'react-geocode';

// Geocode.setApiKey(`AIzaSyBN_Lz6CafuTmiJyVqE6JnNeXwwn3gXGVQ`);
// Get latidude & longitude from address.
// Geocode.fromAddress("3635 25th st San Francisco").then(
//     response => {
//         const { lat, lng } = response.results[0].geometry.location;
//         console.log(lat, lng);
//     },
//     error => {
//         console.error(error);
//     }
// );
class UserList extends Component {

    renderUsers() {
        return this.props.data.users.map( user => {
            return (
                <ListItem key={user.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircle/>
                        </Avatar>
                        {user.firstName}
                    </ListItemAvatar>
                    <ListItemText primary={<audio controls src="https://collaborate-songs.s3-us-west-1.amazonaws.com/hitchhiker+"></audio>}/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={this.openMenu}>
                            <Menu/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    }

    // testGeoCode() {
        // Geocode.setApiKey(`AIzaSyBN_Lz6CafuTmiJyVqE6JnNeXwwn3gXGVQ`);
// Get latidude & longitude from address.
//         Geocode.fromAddress("3635 25th st San Francisco").then(
//             response => {
//                 const { lat, lng } = response.results[0].geometry.location;
//                 console.log(lat, lng);
//             },
//             error => {
//                 console.error(error);
//             }
//         );
//     }
    render(){
        // this.testGeoCode();
        if(this.props.data.loading){return <div>Loading...</div>}
        return(
            <Grid item xs={10}>
                <List>
                    {this.renderUsers()}
                </List>
            </Grid>
        );
    }
}

export default graphql(fetchUsers)(UserList);
