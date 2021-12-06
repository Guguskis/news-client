// HomePage stateless react component

import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState } from 'react';

import Box from '@mui/material/Box';
import SignalComponent from '../components/SignalComponent.jsx';

const styles = {
    body: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "primary.main",
    }
}

function HomePage() {

    const addSignal = () => {
        return console.log('add signal');
    }

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
                    id: 1,
                    dateTime: "2020-01-01:00:00:00",
                    price: 56,
                    side: "SHORT",
                    type: "STOP_LOSS",
                    units: 100
                }
            ]
        },
        {
            id: 1,
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
                    id: 1,
                    dateTime: "2020-01-01:00:00:00",
                    price: 56,
                    side: "SHORT",
                    type: "STOP_LOSS",
                    units: 100
                }
            ]
        }
    ]);

    const assembleSignal = (signal) => {
        return <SignalComponent signal={signal} setSignals={setSignals} />;
    }

    return (
        <Box sx={styles.body}>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom>
                Signals
            </Typography>
            {signals.map(assembleSignal)}
        </Box>
    );

};

export default HomePage;