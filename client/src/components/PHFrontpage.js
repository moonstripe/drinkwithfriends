import React, {useEffect} from 'react';
import {reduxForm, Field} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import {Typography, Box, Grid, makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { getNickname } from "./PlayerReducer";

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex'
    },
    field: {
        width: '600px',
    },
}))

const PlaceHolderFrontpage = ( props ) => {
    const TextFieldInput = ({input, meta, label}) => {
        // console.log('FIELD COMPONENT PROPS', props);
        return <TextField
            {...input}
            label={label}
        />;
    };

    const {handleSubmit, history} = props;

    const handlePlayer = async (formValues, dispatch) => {
        console.log(formValues);

        dispatch(getNickname(formValues));
        history.push('/game')
    }



    const classes = useStyles();

    return (
        <form noValidate autoComplete="off" className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Field
                        className={classes.field}
                        name='nickname'
                        label='nickname'
                        component={TextFieldInput}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handleSubmit(handlePlayer)}
                        variant="contained"
                        color="primary">
                        Sign in
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export const WrappedPlaceholder = reduxForm({form: 'nickName'})(PlaceHolderFrontpage);
