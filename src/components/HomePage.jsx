// HomePage stateless react component

import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';

import { FormControlLabel } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import Box from '@mui/material/Box';


const styles = {
    button: {
        fontSize: '1rem',
        // backgroundColor: 'green',
        // '&:hover': {
        //     backgroundColor: '#00ff00'
        // }
    },
}

const signalCardForm = () => {
    return (
        <>
            <CardContent sx={{ alignContent: "center" }} >
                <Box component="div" gutterBottom>
                    <Typography variant="h5" component="h2">
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
        </>
    );
}

function HomePage() {
    const [price, setPrice] = useState(0);

    const addSignal = () => {
        // function addSignal() {
        return console.log('add signal');
    }

    return (
        <Box sx={{ minWidth: 275, margin: "50px", height: "100wh", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Typography
                variant="h6"
                component="h1"
                color="textSecondary"
                gutterBottom>
                Signals
            </Typography>
            <Card variant="outlined" sx={{margin: "0.25rem"}}>{signalCardForm()}</Card>
            <Card variant="outlined" sx={{margin: "0.25rem"}}>{signalCardForm()}</Card>
            <Card variant="outlined" sx={{margin: "0.25rem"}}>{signalCardForm()}</Card>
            <Card variant="outlined" sx={{margin: "0.25rem"}}>{signalCardForm()}</Card>
        </Box>
    );

    // return (
    //     <Box
    //         component="form"
    //         sx={{ borderColor: 'primary.main' }}
    //         // sx={{
    //         //     '& .MuiTextField-root': { m: 1, width: '25ch' },
    //         // }}
    //         noValidate
    //         autoComplete="off"
    //     >
    //         Container
    //         <Container >
    //             <Typography
    //                 variant="h6"
    //                 component="h1"
    //                 color="textSecondary"
    //                 gutterBottom
    //             >
    //                 Signals
    //             </Typography>

    //             <FormGroup >
    //                 {/* <FormControlLabel control={<Checkbox defaultChecked />} label="Label" /> */}
    //                 {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    //                 <Button

    //                     variant="contained"
    //                     endIcon={<AddBoxIcon />}
    //                     // type="submit"
    //                     onClick={addSignal}
    //                 // stop limiting onClick count
    //                 >
    //                     Create
    //                 </Button>
    //                 <Typography
    //                     component="h2"
    //                     color="textSecondary"
    //                 >
    //                     Price: {price}
    //                 </Typography>

    //                 <TextField
    //                     id="outlined-basic"
    //                     label="Price"
    //                     variant="outlined"
    //                     type="number"
    //                     value={price}
    //                     onChange={(e) => setPrice(e.target.value)}
    //                 />
    //             </FormGroup>
    //         </Container>
    //     </Box>
    // );


};

export default HomePage;