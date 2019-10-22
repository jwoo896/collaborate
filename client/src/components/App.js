import React  from 'react';
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default ({ children }) => {
    return (
        <div>
            <AppBar position="sticky" color="secondary">
                <Toolbar>
                    <Button color="inherit"><Link to="/" style={{textDecoration: 'none', color: '#fff'}}>Login</Link></Button>
                    <Button color="inherit"><Link to="/signup" style={{textDecoration: 'none', color: '#fff'}}>Sign up</Link></Button>
                    <Button color="inherit"><Link to="/users" style={{textDecoration: 'none', color: '#fff'}}>Users</Link></Button>
                    <Button color="inherit"><Link to="/songs/new" style={{textDecoration: 'none', color: '#fff'}}>Add Song</Link></Button>
                </Toolbar>
            </AppBar>
            <Grid container>{children}</Grid>
        </div>
    );
}
