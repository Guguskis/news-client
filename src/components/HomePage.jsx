// HomePage stateless react component

import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

import { Box, Button } from '@mui/material';
import SignalComponent from '../components/SignalComponent.jsx';
import AddBoxIcon from '@mui/icons-material/AddBox'
import {ArraysState} from "../utils/utils.jsx";

const styles = {
    body: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "primary.main",
    }
}

function HomePage() {

    const [isAddSignal, setIsAddSignal] = useState(false);
    const [signal, setSignal] = useState({
        entries: [],
        exits: []
    });

    const [signals, setSignals] = useState([
        {
            id: 1,
            symbol: "XRP/USDT",
            position: 100,
            entries: [
                {
                    id: 1,
                    dateTime: "2020-01-01:00:00:00",
                    price: 50,
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
        },
        {
            id: 2,
            symbol: "BTC/USDT",
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
        }
    ]);

    const addSignal = (e) => {
        e.preventDefault();
        console.log('add signal');

        setIsAddSignal(true);
    }

    const onSubmitSignal = (signal) => {
        ArraysState.add(setSignals, signal);
        console.log('added signal to array', signal);
    }

    const assembleSignal = (signal) =>
        <SignalComponent key={signal.id} signal={signal} />

    return (
        <Box sx={styles.body}>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom>
                Signals
            </Typography>
            <Box sx={{ marginBottom: "10px" }}>
                <Button
                    variant="contained"
                    endIcon={<AddBoxIcon />}
                    onClick={addSignal}>
                    Add Signal
                </Button>
            </Box>
            {isAddSignal && <SignalComponent signal={signal} isEdit={true} onSubmit={onSubmitSignal} />}
            {signals.map(assembleSignal)}
        </Box>
    );

    function CreateSignalCard() {

    }

};

export default HomePage;