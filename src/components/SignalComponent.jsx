import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { FormGroup, Box, Card, CardContent, TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import { ObjectState } from "../utils/utils.jsx";

const styles = {
    component: {
        alignContent: "center",
        color: "primary.main",
        padding: "0 1rem"
    }
}

function SignalComponent(props) {

    // signal prop
    const { signal, setSignals } = props;

    const [price, setPrice] = useState(0);

    function addSignal() {
        console.log('add signal');
    }

    const Component = () => {

        return (
            <CardContent sx={styles.component} >
                <Box component="div" borderBottom="1px solid red">
                    <Typography variant="h5"  >
                        {signal.symbol}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Profit: 50$ / 10%
                    </Typography>
                </Box>
                <Box component="div">
                    {signal.entries.map((entry) =>
                        <Typography variant="body2" component="p">
                            Entry {entry.price} $
                        </Typography>
                    )}
                </Box>
                <Box component="div">
                    {signal.exits.map((exit) =>
                        <Typography variant="body2" component="p" align="right">
                            {exit.price} $ Exit
                        </Typography>
                    )}
                </Box>
                <SignalForm />
            </CardContent>
        );
    }

    const SignalForm = () => {
        return (
            <Box component="div" >
                <Typography
                    component="h2"
                    color="textSecondary"
                >
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
                    type="submit"
                    onClick={addSignal}
                // stop limiting onClick count
                >
                    Create
                </Button>
            </Box>

        );
    }

    return (
        <Card variant="outlined" sx={{ minWidth: "100px" }}>
            <Component />
        </Card>
    );
}

export default SignalComponent;
