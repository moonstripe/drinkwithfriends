import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {PlayingCard} from "./Card";
import {GameSpace} from './GameSpace';
import {DrinkFeed} from './DrinkFeed';
import {ChatBox} from './ChatBox';

import io from 'socket.io-client';
import {Container, Grid, List, ListItem, ListItemText, Snackbar, Card} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// import TextField from "@material-ui/core/TextField";
const socket = io();

const Table = () => {

    const gender = useSelector(state => state.viewer.gender);

    const [currentCard, setCurrentCard] = useState({});
    const [isTurn, setIsTurn] = useState(false);
    const [isDrink, setIsDrink] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [rule, setRule] = useState(0);
    const [targetPlayer, setTargetPlayer] = useState('');
    const [playerArr, setPlayerArr] = useState([]);
    const [sock, setSock] = useState('');
    const playerNickname = localStorage.getItem('nickname') || 'kojin';
    const [numTurn, setNumTurn] = useState(0);
    useEffect(() => {
        // socket welcome: adds player to array
        socket.emit('clientToServerWelcome', playerNickname);
        // updates players on client
        socket.on('serverToClientUpdateInfo', ([players, turnNum, socketId]) => {
            console.log(players, socketId);
            setPlayerArr(players);
            setNumTurn(turnNum);
        });

        socket.on('serverToClientShortList', (players) => {
            setPlayerArr(players);
        })

        socket.on('serverToClientSocketId', (socketId) => {
            setSock(socketId);
        });


        // connection to see whose turn it is
        socket.on('not_your_turn', ([_turn, card]) => {
            console.log('other player drew:', card);
            setCurrentCard(card);
            setIsSelecting(false)
            setIsDrink(false);
            setIsTurn(false);
            setRule(card.visVal);
            iDrink(card.visVal, false);
        })

        // connection to wait for turn
        socket.on('your_turn', (msg) => {
            setIsSelecting(false)
            setIsDrink(false);
            // Client side log displaying card
            setIsTurn(true);
            console.log("my turn: ", msg);
            setCurrentCard(msg);
            setRule(msg.visVal);
            iDrink(msg.visVal, true);
        })

        // logic for switch case rules
        socket.on('serverToClientDrink', () => {
            setIsDrink(true);
        })


        return function () {
            socket.off('serverToClientUpdateInfo');
            socket.off('your_turn');
            socket.off('not_your_turn');
            // socket.removeListener('not_your_turn');
        }
    }, []);


    const iDrink = (rule, turn) => {
        switch (rule) {
            case 1:
                // everyone drink
                setIsDrink(true);
                break;


            case 2:
                // pick someone to drink
                setIsSelecting(true);
                break;
            case 3:
                // self drink
                console.log(turn);
                if (turn !== false) {
                    setIsDrink(true);
                    break;
                }
                break;

            case 4:
                // *hit down key
                console.log(turn);
                if (turn) {
                    socket.emit('clientToServerRandom');
                }
                break;
            case 5:
                // guys
                if (gender === 0) {
                    setIsDrink(true);
                }
                break;

            case 6:
                // chicks
                if (gender === 1) {
                    setIsDrink(true);
                }
                break;
            case 7:
                // *hit up key
                console.log(turn);
                if (turn) {
                    socket.emit('clientToServerRandom');
                }
                break;
            case 8:
                // pick someone to drink
                if (turn) {
                    setIsDrink(true);
                }

                setIsSelecting(true);
                break;

            case 9:
                // *hit left key
                console.log(turn);
                if (turn) {
                    socket.emit('clientToServerRandom');
                }
                break;

            case 10:
                // everyone drinks
                setIsDrink(true);
                break;

            case 11:
                // *hit right key
                console.log(turn);
                if (turn) {
                    socket.emit('clientToServerRandom');
                }
                break;

            case 12:
                // Finish the cup
                setIsDrink(true);
                break;

            case 13:
                // *lowest amount of drinks
                console.log(turn);
                if (turn) {
                    socket.emit('clientToServerRandom');
                }
                break;
        }
        // console.log(card.visVal, card.suit);
        // socket.emit('ruleToServer', card.visVal);
    }

    //  Drink SnackBar
    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //
    //     setIsDrink(false);
    // };


    return (
        <div>
            <Grid container maxWidth="xl">
                <Grid xs={2}>
                    <DrinkFeed
                        playerArr={playerArr}
                        isSelecting={isSelecting}
                        isTurn={isTurn}
                        sock={sock}
                        targetPlayer={targetPlayer}
                    />
                </Grid>
                <Grid xs={6}>
                    <GameSpace
                        currentCard={currentCard}
                        isTurn={isTurn}
                    />
                </Grid>
                <Grid xs={4}>
                    <ChatBox/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Table;
