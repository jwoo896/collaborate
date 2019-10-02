import React  from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import createUser from "../queries/createUser";
import fetchUsers from "../queries/fetchUsers";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

export default function CreateUser() {
    let history = useHistory();
    const classes = useStyles();
    const [values, setValues] = React.useState({
        'First Name': '',
        'Last Name': '',
        'Alias': '',
        'City': '',
        'Email': '',
        'Password': ''
    });

    const renderTextFields = () => {
        const keys = Object.keys(values);
        return keys.map( key => {
            if(key === 'Alias' || key === 'City') {
                return (
                    <Grid item xs>
                        <TextField
                            id={key}
                            label={key}
                            value={values[key]}
                            className={classes.textField}
                            onChange={handleChange(key)}
                            margin="normal"/>
                    </Grid>
                );
            } else {
                return (
                    <Grid item xs>
                        <TextField
                            required
                            id={key}
                            label={key}
                            value={values[key]}
                            className={classes.textField}
                            onChange={handleChange(key)}
                            margin="normal"/>
                    </Grid>
                );
            }
        });
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                firstName: values['First Name'],
                lastName: values['Last Name'],
                alias: values['Alias'],
                email: values['Email'],
                location: values['City']
            }}).then(() => {
                history.push('/users');
        });
    };

    const [ newUser ] = useMutation(createUser, {
        refetchQueries: [{query: fetchUsers}]
        });

    return (
        <Grid item>
            <form className={classes.container} onSubmit={handleSubmit}>
                <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                    {renderTextFields()}
                </Grid>
                <Button type="submit">Sign up</Button>
            </form>
        </Grid>
    );
}