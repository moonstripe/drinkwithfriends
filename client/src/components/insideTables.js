import {Grid, List, ListItem, ListItemText, Snackbar} from "@material-ui/core";
import {PlayingCard} from "./Card";
import React from "react";

<Grid item xs={3}>
    <p> {playerNickname} drew a {rule}</p>
    <List component="nav" aria-label="contacts">
        {playerArr?.map(player => {
                if (player.socketId === sock) {
                    return (
                        <ListItem
                            style={{backgroundColor: "rgba(187,72,72,0.49)"}}>
                            <ListItemText primary={player.nickname}/>
                        </ListItem>
                    )
                } else {
                    return (
                        <ListItem
                            style={{backgroundColor: 'white'}}>
                            <ListItemText primary={player.nickname}/>
                            {
                                isSelecting && isTurn ? <button onClick={
                                        (e) => {
                                            setTargetPlayer(player.socketId);
                                            setIsSelecting(false);
                                            socket.emit('clientToServerPlayerTargeted', player.socketId);
                                            console.log(player.socketId);
                                        }
                                    }> Send Drink</button> :
                                    <button disabled >Send Drink</button>
                            }
                        </ListItem>
                    )
                }
            }
        )
        }

    </List>
    <div>
        <Snackbar open={isDrink} autoHideDuration={1000}>
            <Alert onClose={handleClose} severity="warning">
                Drink!
            </Alert>
        </Snackbar>
    </div>
</Grid>
{isTurn ?
    <PlayingCard suit={currentCard.suit} num={currentCard.visVal} image={currentCard.image}/>
    : null}
