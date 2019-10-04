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

class UserList extends Component {

    renderUsers() {
        return this.props.data.users.map( user => {
            return (
                <ListItem divider="true">
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
    render(){
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