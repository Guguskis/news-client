// HomePage stateless react component

import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';

import { Box, Button, CircularProgress } from '@mui/material';
import SignalComponent from '../components/SignalComponent.jsx';
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ArraysState } from "../utils/utils.jsx";
import { API } from "../config/axiosConfig.jsx";

const styles = {
    body: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "primary.main",
        padding: "2rem"
    }
}

function HomePage() {
    const [{ data: currencies, loading: currenciesLoading, error: currenciesError }, currenciesExecute] = API.useCryptoApi({
        url: "/api/currencies",
        method: "GET"
    })

    const [isAddSignal, setIsAddSignal] = useState(false);

    const [signals, setSignals] = useState([
        {
            id: 1,
            symbol: "XRPUSDT",
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
            symbol: "DOTUSD",
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

    useEffect(() => {
        const sorted = [...signals].sort((prevSignal, currSignal) => prevSignal.id > currSignal.id); // todo fix sorting for react hooks
        // setSignals(sorted)
    }, [signals]);

    useEffect(() => {
        if (currencies)
            console.debug("Fetched currencies", currencies)
        else if (currenciesError)
            console.error("Failed to fetch currencies", currenciesError)
        else
            console.debug("Fetching currencies...")
    }, [currencies, currenciesError])

    const addSignal = (e) => {
        e.preventDefault();
        console.log('add signal');

        setIsAddSignal(true);
    }

    const onSubmitSignal = (signal) => {
        const newSignal = signals.filter(s => s.id === signal.id).length === 0;
        if (newSignal) {
            ArraysState.add(setSignals, signal);
        } else {
            ArraysState.replaceByKey(setSignals, signal, "id")
        }

        setIsAddSignal(false);
        console.log('added signal to array', signal);
    }

    const onCancelSignal = () => {
        setIsAddSignal(false);
        console.log('cancelled create new signal');
    }

    const assembleSignal = (signal) =>
        <SignalComponent
            key={signal.id}
            signal={signal}
            onSubmit={onSubmitSignal}
            onCancel={onCancelSignal}
            symbols={currencies}
        />

    const assembleCreateSignal = () =>
        <SignalComponent
            isCreate={true}
            onSubmit={onSubmitSignal}
            onCancel={onCancelSignal}
            symbols={currencies}
        />

    if (currenciesLoading)
        return <Box sx={styles.body}>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom>
                Signals
            </Typography>
            <CircularProgress />
        </Box>

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
            {isAddSignal && assembleCreateSignal()}
            {signals.map(assembleSignal)}
        </Box>
    );
};

export default HomePage;