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
                    <List>
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
                    </List>
            );
        });
    }
    render(){
        if(this.props.data.loading){return <div>Loading...</div>}
        return(
            <Grid container direction="column" justify="center" spacing={1}>
                <Grid item xs={12} md={12}>
                    {this.renderUsers()}
                </Grid>
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
            headliner {
                title,
                url
            }
        }
    }
`;

export default graphql(query)(UserList);