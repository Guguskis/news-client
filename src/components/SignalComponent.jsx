import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, MenuItem } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

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

function SignalComponent({ signal, isEdit = false, onSubmit }) {

    return (
        <Card variant="outlined" sx={styles.container}>
            <Component />
        </Card>
    );

    function Component() {

        return (
            <CardContent sx={styles.details} >
                <SignalDetails signal={signal} />
                {/* {isEdit && <SignalForm signal={signal} />} */}
                <SignalForm signal={signal} onSignalSubmit={onSubmit} />
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
        const [price, setPrice] = useState(0);
        const [pair, setPair] = useState(pairs[0]);

        const submit = () => {
            signal = {
                id: 4,
                symbol: "BTC/ASS",
                position: 220,
                entries: [
                    {
                        id: 1,
                        dateTime: "2020-01-01:00:00:00",
                        price: 50,
                        side: "LONG",
                        type: "MARKET",
                        units: 100
                    },
                    {
                        id: 2,
                        dateTime: "2020-01-01:00:00:00",
                        price: 75,
                        side: "LONG",
                        type: "MARKET",
                        units: 100
                    }
                ],
                exits: [
                    {
                        id: 1,
                        dateTime: "2020-01-01:00:00:00",
                        price: 62,
                        side: "SHORT",
                        type: "TAKE_PROFIT",
                        units: 100
                    },
                    {
                        id: 2,
                        dateTime: "2020-01-01:00:00:00",
                        price: 56,
                        side: "SHORT",
                        type: "STOP_LOSS",
                        units: 100
                    }
                ]
            };

            console.log("SignalForm -> submit -> signal");
            onSignalSubmit(signal);
        }

        

        return (
            <Box component="div" >
                <TextField
                    select
                    label="Pair"
                    variant="standard"
                    disabled={!isEdit}
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}>
                    {pairs.map(pair => (
                        <MenuItem key={pair.value} value={pair.value}>
                            {pair.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Price"
                    variant="standard"
                    disabled={!isEdit}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                {isEdit &&
                    <Button
                        variant="contained"
                        endIcon={<AddBoxIcon />}
                        // type="submit"
                        disabled={!isEdit}
                        onClick={submit}>
                        Save
                    </Button>
                }

            </Box>
        );
    }
}

export default SignalComponent;
