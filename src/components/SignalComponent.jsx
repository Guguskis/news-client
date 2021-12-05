import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { FormGroup,Button, Box, Card, CardContent} from '@mui/material';
import { AddBoxIcon } from '@mui/icons-material/AddBox';
import { TextField } from '@mui/material/TextField';

const styles = {
    component: {
        alignContent: "center",
        color: "primary.main",
        padding: "0 1rem"
    }
}

function SignalComponent() {

    const [price, setPrice] = useState(0);

    function addSignal() {
        console.log('add signal');
    }

    const Component = () => {
        return (
            <CardContent sx={styles.component} component="form">
                <Box component="div" borderBottom="1px solid red">
                    <Typography variant="h5"  >
                        XRP/USDT
                    </Typography>
                    <Typography variant="body2" component="p">
                        Profit: 50$ / 10%
                    </Typography>
                </Box>
                <Box component="div">
                    <Typography variant="body2" component="p">
                        Entry 0.55 $
                    </Typography>
                </Box>
                <Box component="div">
                    <Typography variant="body2" align="right" component="p">
                        1.25 $ Exit
                    </Typography>
                </Box>
                
            </CardContent>
        );
    }

    const SignalForm = () => {
        return (
            <FormGroup >
                {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
                {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
                <Button
                    variant="contained"
                    endIcon={<AddBoxIcon />}
                    // type="submit"
                    onClick={addSignal}
                // stop limiting onClick count
                >
                    Create
                </Button>

                <Typography
                    component="h2"
                    color="textSecondary"
                >
                    Price: {price}
                </Typography>

                {/* <TextField
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                /> */}
            </FormGroup>
        );
    }

    return (
        <Card variant="outlined" sx={{ minWidth: "100px" }}>
            <Component />
            {/* <SignalForm/> */}
        </Card>
    );
}

export default SignalComponent;
