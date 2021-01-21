import React, { useState, useEffect } from 'react';
import {List, ListItem, ListItemText, ListItemIcon} from "@material-ui/core";
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';


import io from 'socket.io-client';
const socket = io();

export const DrinkFeed = (props) => {
    console.log(props.currentPlayer);
    const [arr, setArr] = useState(props.playerArr);


    useEffect(() => {
        setArr(props.playerArr);
    }, [props.playerArr])

    const renderDrinkFeed = () => {

        return (
            <List component="nav" aria-label="contacts">

                {arr?.map(player => {
                        if (player.socketId === props.sock) {
                            return (
                                <ListItem
                                    style={{backgroundColor: "rgba(187,72,72,0.49)"}}>
                                    <ListItemText primary={player.nickname}/>
                                </ListItem>
                            )
                        } else {
                            return (
                                <ListItem
                                    style={props.currentPlayer.socket === player.socketId ? {backgroundColor: 'green'} : {backgroundColor: 'white'}}>
                                    <ListItemText primary={player.nickname}/>
                                    <ListItemIcon><LocalDrinkIcon/></ListItemIcon>
                                    {/*{*/}
                                    {/*    props.isSelecting && props.isTurn ? <button onClick={*/}
                                    {/*            (e) => {*/}
                                    {/*                setTargetPlayer(player.socketId);*/}
                                    {/*                setIsSelecting(false);*/}
                                    {/*                socket.emit('clientToServerPlayerTargeted', player.socketId);*/}
                                    {/*                console.log(player.socketId);*/}
                                    {/*            }*/}
                                    {/*        }> Send Drink</button> :*/}
                                    {/*        <button disabled >Send Drink</button>*/}
                                    {/*}*/}
                                </ListItem>
                            )
                        }
                    }
                )
                }
            </List>
        )
    }


    return (
        renderDrinkFeed()
    )
}
