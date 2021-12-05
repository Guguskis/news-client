// HomePage stateless react component

import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
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
    const [price, setPrice] = useState(0);

    const addSignal = () => {
        // function addSignal() {
        return console.log('add signal');
    }

    return (
        <Box sx={styles.body}>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom>
                Signals
            </Typography>
            <SignalComponent />
            <SignalComponent />
            <SignalComponent />
            <SignalComponent />
        </Box>
    );

};

export default HomePage;