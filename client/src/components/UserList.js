import React, { Component } from 'react';
import gql from 'graphql-tag';
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
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircle/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.firstName}
                    />
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
            <Grid item xs={12} md={12}>
                <List>
                    {this.renderUsers()}
                </List>
            </Grid>
        );
    }
}

const query = gql`
    {
        users {
            id,
            firstName,
            lastName,
            alias,
            email
        }
    }
`;

export default graphql(query)(UserList);