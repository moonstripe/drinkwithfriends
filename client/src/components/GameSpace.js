import React from 'react';
import {Grid} from "@material-ui/core";
import {PlayingCard} from "./Card";

export const GameSpace = (props) => {
    return (
        <Grid container>
        <Grid xs={12}>

            {
                props.currentPlayer != '' ? <p>Player {props.currentPlayer} pulled a {props.currentCard.visVal} of {props.currentCard.suit}</p> : null
            }

            {props.isTurn ?
                <PlayingCard suit={props.currentCard.suit} num={props.currentCard.visVal} image="/cards/red_back.png"/>
                :
                <PlayingCard suit={props.currentCard.suit} num={props.currentCard.visVal} image={props.currentCard.image}/>}
        </Grid>

    <Grid xs={12}>
        <p>your card</p>
        {props.isTurn ?
            <PlayingCard suit={props.currentCard.suit} num={props.currentCard.visVal} image={props.currentCard.image}/>
            :
            <PlayingCard suit={props.currentCard.suit} num={props.currentCard.visVal} image="/cards/red_back.png"/>}
    </Grid>
        </Grid>
    )
}
