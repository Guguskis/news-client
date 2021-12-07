import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, MenuItem, InputAdornment } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ObjectState } from "../utils/utils.jsx";

const styles = {
    container: {
        marginBottom: "10px",
        minWidth: "300px",
        minHeight: "100px",
    },
    details: {
        alignContent: "center",
        color: "primary.main",
        padding: "0 1rem"
    }
}

function SignalComponent({ signal, isEdit = false, isCreate = false, onSubmit }) {
    const [pairs, setPairs] = useState([
        {
            value: "BTC/ASS",
            label: "BTC/ASS"
        },
        {
            value: "ETH/ASS",
            label: "ETH/ASS"
        },
    ]);

    return (
        <Card variant="outlined" sx={styles.container}>
            <Component />
        </Card>
    );

    function Component() {

        return (
            <CardContent sx={styles.details} >
                {isEdit || isCreate ?
                    <SignalForm signal={signal} onSignalSubmit={onSubmit} />
                    :
                    <SignalDetails signal={signal} />
                }
            </CardContent>
        );
    }

    function SignalDetails({ signal }) {

        return (
            <Box component="div" >
                <Box component="div" borderBottom="1px solid">
                    <Typography variant="h5">
                        {isEdit ? "" : "#" + signal.id + " "}{signal.symbol}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Profit: 50$ / 10%
                    </Typography>
                </Box>
                <Box component="div" >{signal.entries.map(assembleEntry)}</Box>
                <Box component="div" >{signal.exits.map(assembleExit)}</Box>
            </Box>
        );

        function assembleEntry(entry) {
            return (
                <Typography key={entry.id} variant="body2" component="p">
                    Entry {entry.price} $
                </Typography>
            )
        }

        function assembleExit(exit) {
            return (
                <Typography key={exit.id} variant="body2" component="p" align="right">
                    {exit.price} $ Exit
                </Typography>
            )
        }

    }

    function SignalForm({ onSignalSubmit }) {

        const [price, setPrice] = useState(0);
        const [pair, setPair] = useState(pairs[0]);
        const [entries, setEntries] = useState([]);
        const [exits, setExits] = useState([]);

        const submit = () => {
            if (isCreate) {
                onCreateSignalSubmit();
            } else if (isEdit) {
                onEditSignalSubmit()
            } else {
                console.error("isCreate or isEdit should be true");
            }
        }

        const onCreateSignalSubmit = () => {
            // build signal and send POST
            const signal = {
                symbol: pair.value,
                price: price,
                entries: entries,
                exits: exits
            };
            console.log("create", signal);
            onSignalSubmit(signal);
        }

        const onEditSignalSubmit = () => {
            // build signal and send PUT
            ObjectState.set(signal, "symbol", pair.value);
            ObjectState.set(signal, "price", price);
            console.log("create", signal);
            onSignalSubmit(signal);
        }

        return (
            <Box component="div" alignItems="center">
                <Box component="div"  >
                    <TextField
                        label="Pair"
                        select
                        sx={{ margin: "0 1rem", minWidth: "100px" }}
                        variant="standard"
                        disabled={!isModify()}
                        value={pair.value}
                        onChange={(e) => setPair(e.target)}>
                        {pairs.map(pair => (
                            <MenuItem key={pair.value} value={pair.value}>
                                {pair.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Price"
                        sx={{ margin: "0 1rem" }}
                        variant="standard"
                        disabled={!isModify()}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </Box>
                {isModify() &&
                    <Box component="div" display="flex" justifyContent="right">
                        <Button
                            variant="contained"
                            endIcon={<AddBoxIcon />}
                            disabled={!isModify()}
                            onClick={submit}>
                            Save
                        </Button>
                    </Box>
                }
            </Box>
        );
    }

    function isModify() {
        return isEdit || isCreate;
    }
}

export default SignalComponent;
