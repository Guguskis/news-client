import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Box, Card, CardContent, TextField, Container } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

const styles = {
    container: {
        marginBottom: "10px",
    },
    details: {
        alignContent: "center",
        color: "primary.main",
        padding: "0 1rem"
    }
}

function SignalComponent({ signal }) {

    function addSignal() {
        console.log('add signal');
    }

    return (
        <Card variant="outlined" sx={styles.container}>
            <Component />
        </Card>
    );

    function Component() {
        return (
            <CardContent sx={styles.details} >
                <SignalDetails signal={signal} />
                {/* <SignalForm signal={signal} /> */}
            </CardContent>
        );
    }

    function SignalDetails({ signal }) {

        return (
            <Box component="div" >
                <Box component="div" borderBottom="1px solid">
                    <Typography variant="h5">
                        {signal.symbol}
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

    function SignalForm({ signal }) {

        const [price, setPrice] = useState(0);

        return (
            <Box component="div" >
                <Typography
                    component="h2">
                    Price: {signal.price}
                </Typography>

                <TextField
                    // label="Price"
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Button
                    variant="contained"
                    endIcon={<AddBoxIcon />}
                    // type="submit"
                    onClick={addSignal}>
                    Create
                </Button>
            </Box>
        );
    }
}

export default SignalComponent;
