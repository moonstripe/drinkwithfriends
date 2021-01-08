import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import {shadows} from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
    root: {
        height: "calc(100vh/3)"
    },
    media: {
        height: '100%',
        paddingTop: '10px',
        paddingLeft: '10px',
        backgroundPosition: "top",
        backgroundSize: 'contain',
    },
});

export const PlayingCard = (props) => {


    console.log(props.suit, props.num, props.image)

    const classes = useStyles();

    return (

        <Card className={classes.root}>

            <CardMedia
                className={classes.media}
                image={props.image}
                title='Card'
            />
        </Card>
    );
}
