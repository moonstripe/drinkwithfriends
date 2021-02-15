import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import {PlayingCard} from "./Card";
import {GameSpace} from './GameSpace';
import {DrinkFeed} from './DrinkFeed';
import {ChatBox} from './ChatBox';

import io from 'socket.io-client';
import {Container, TextField, Grid, List, ListItem, ListItemText, Snackbar, Card} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// import TextField from "@material-ui/core/TextField";
const socket = io();

const Table = () => {
    //
    // const gender = useSelector(state => state.viewer.gender);

    const { nickname } = useSelector(state => state.player)

    console.log(nickname);

    // chatBox states
    const [message, setMessage] = useState({message: "", name: ""});
    const [chat, setChat] = useState([]);

    // chatBox functions
    const renderChat = () => {
        return chat.map(({nickname, message}, index) =>(
            <div key={index}>
                <h3>
                    {nickname}: <span>{message}</span>
                </h3>
            </div>
        ))
    }
    const onTextChange = e => {
        setMessage({ ...message, [e.target.name]: e.target.value })
    }
    const onMessageSubmit = (e) => {
        e.preventDefault()
        const {name, message} = message
        socket.emit('chat message', { nickname, message })
        setMessage({ message: "", nickname })
    }

    const [currentCard, setCurrentCard] = useState({});
    const [isTurn, setIsTurn] = useState(false);
    const [isDrink, setIsDrink] = useState(false);
    const [isSelecting, setIsSelecting] = useState(false);
    const [rule, setRule] = useState(0);
    const [targetPlayer, setTargetPlayer] = useState('');
    const [playerArr, setPlayerArr] = useState([]);
    const [sock, setSock] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState({
        nickname: nickname.nickname,
        socket: '',
    });
    useEffect(() => {

        // chatBox changes start 
        socket.on('chat message', ({ name, message}) => {
            setChat([...chat, { nickname, message }])
        })
        // chatBox changes end


        // socket welcome: adds player to array
        socket.emit('clientToServerWelcome', nickname.nickname);
        // updates players on client
        socket.on('serverToClientUpdateInfo', ([players, turnNum, socketId]) => {
            console.log(players, socketId);
            setPlayerArr(players);
        });

        socket.on('serverToClientShortList', (players) => {
            setPlayerArr(players);
        })

        socket.on('serverToClientSocketId', (socketId) => {
            setSock(socketId);
        });


        // connection to see whose turn it is
        socket.on('not_your_turn', ([player, socketId, card]) => {
            console.log('other player drew:', card);
            setCurrentCard(card);
            setIsSelecting(false)
            setIsDrink(false);
            setIsTurn(false);
            setRule(card.visVal);
            iDrink(card.visVal, false);
            setCurrentPlayer({nickname: player, socket: socketId});
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
            setCurrentPlayer({nickname: '', socket: ''});
        })

        // logic for switch case rules
        socket.on('serverToClientDrink', () => {
            setIsDrink(true);
        })


        return function () {
            socket.off('serverToClientUpdateInfo');
            socket.off('serverToClientShortList')
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
                if (false) {
                    setIsDrink(true);
                }
                break;

            case 6:
                // chicks
                if (false) {
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
                        sock={sock}
                        targetPlayer={targetPlayer}
                        currentPlayer={currentPlayer}
                    />
                </Grid>
                <Grid xs={6}>
                    <GameSpace
                        currentPlayer={currentPlayer}
                        currentCard={currentCard}
                        isTurn={isTurn}
                    />
                </Grid>
                <Grid xs={4}>
                    <form onSubmit={onMessageSubmit}>
                        {/* <h1>Messenger</h1>
                        <div className="name-field">
                            <TextField 
                            name="name" 
                            onChange={e => onTextChange(e)} 
                            value={message.name}
                            label="Name"
                            />
                        </div> */}
                        <div>
                            <TextField 
                            name="message" 
                            onChange={e => onTextChange(e)} 
                            value={message.message}
                            id="outlined=multiline-static"
                            variant="outlined"
                            label="Message"
                            />
                        </div>
                        <button>Send Message</button>
                    </form>
                    <div className="render-chat">
                        <h1>Chat Log</h1>
                        {renderChat()}
                    </div>
                    {/* <ChatBox
                        currentPlayer={currentPlayer}
                        // look at drink feed
                        // keep track of an array of messages in backend
                    /> */}
                </Grid>
            </Grid>
        </div>
    );
}

export default Table;
