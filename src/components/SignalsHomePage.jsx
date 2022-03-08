// HomePage stateless react component

import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';

import { Box, Button, CircularProgress } from '@mui/material';
import SignalComponent from './SignalComponent.jsx';
import AddBoxIcon from '@mui/icons-material/AddBox'
import { ArraysState } from "../utils/utils.jsx";
import { API } from "../config/axiosConfig.jsx";
import { toast } from "react-toastify";
import { useCallback } from 'react';

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
    const [{ data: signalsData, loading: signalsLoading, error: signalsError }, signalsExecute] = API.useCryptoApi({
        url: "/api/signals",
        method: "GET"
    })

    const [signals, setSignals] = useState([]);
    const [isAddSignal, setIsAddSignal] = useState(false);
    
    useEffect(() => {
        if (signalsData) {
            setSignals(signalsData.items)
        }
    }, [signalsData])

    useEffect(() => {
        if (currenciesError) {
            toast.error("Failed to fetch currencies")
            console.error("Failed to fetch currencies", currenciesError)
        } else if (currencies) {
            console.debug("Fetched currencies", currencies)
        } else {
            console.debug("Fetching currencies...")
        }
    }, [currencies, currenciesError])

    useEffect(() => {
        if (signalsError) {
            toast.error("Failed to fetch signals")
            console.error("Failed to fetch signals", signalsError)
        } else if (signalsData) {
            console.debug("Fetched signals", signalsData)
        } else {
            console.debug("Fetching signals...")
        }
    }, [signalsData, signalsError])

    const addSignal = () => {
        setIsAddSignal(true);
    }

    const onSubmitSignal = () => {
        setIsAddSignal(false);
        signalsExecute();
    }

    const onCancelSignal = () => {
        setIsAddSignal(false);
        console.log('cancelled create new signal');
    }

    const onSubmitSignalCallback = useCallback(onSubmitSignal, [onSubmitSignal]) 
    const onCancelSignalCallback = useCallback(onCancelSignal, [onCancelSignal])


    const assembleSignal = (signal) => {
        return (
            <SignalComponent
                key={signal.id}
                signal={signal}
                onSubmit={onSubmitSignalCallback}
                onCancel={onCancelSignalCallback}
                symbols={currencies}
            />
        )
    }

    const AssembledCreateSignal = () =>
        <SignalComponent
            isCreate={true}
            onSubmit={onSubmitSignalCallback}
            onCancel={onCancelSignalCallback}
            symbols={currencies}
        />

    function isLoadingData() {
        return currenciesLoading || signalsLoading || currenciesError || signalsError;
    }

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
            {isAddSignal && <AssembledCreateSignal />}
            {isLoadingData() ?
                <CircularProgress />
                :
                signals.map(assembleSignal)
            }
        </Box>
    );
};

export default HomePage;