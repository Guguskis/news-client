import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, TextField, Button, MenuItem, InputAdornment, Container, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
// import { AddBoxIcon, IconButton, MenuOutlinedIcon } from '@mui/icons-material';

import { ObjectState } from "../utils/utils.jsx";

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

function SignalComponent({ signal, isEdit = false, isCreate = false, onSubmit, onCancel }) {
    const [pairs, setPairs] = useState(["BTC/ASS", "ETH/ASS", "XRP/USDT", "BTC/USDT"]);

    const [isFormEdit, setIsFormEdit] = useState(isEdit);
    const [isFormCreate, setIsFormCreate] = useState(isCreate);

    return (
        <Card variant="outlined" sx={styles.container}>
            <Component />
        </Card>
    );

    function Component() {

        return (
            <CardContent sx={styles.details} >
                {/* {isModify() ?
                    <SignalForm signal={signal} onSignalSubmit={onSubmit} />
                    :
                    <SignalDetails signal={signal} />
                } */}
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

    function SignalForm({ signal, onSignalSubmit }) {

        const [symbol, setSymbol] = useState("BTC/ASS");
        const [entries, setEntries] = useState([]);
        const [exits, setExits] = useState([]);

        useEffect(() => {
            if (signal.symbol)
                setSymbol(signal.symbol);
        }, [signal.symbol])

        const submit = () => {
            if (isFormCreate) {
                onCreateSignalSubmit();
            } else if (isFormEdit) {
                onEditSignalSubmit()
            } else {
                console.error("isCreate or isEdit should be true");
            }
        }

        const onCreateSignalSubmit = () => {
            const signal = {
                id: Math.random() * 1000,
                symbol: symbol,
                entries: entries,
                exits: exits
            };
            console.log("send POST", signal);
            setIsFormCreate(false)
            onSignalSubmit(signal);
        }
        
        const onEditSignalSubmit = () => {
            const editedSignal = {
                id: signal.id,
                symbol: symbol,
                entries: entries,
                exits: exits
            };
            console.log("send PUT", editedSignal);
            
            setIsFormEdit(false)
            onSignalSubmit(editedSignal);
        }

        const onSignalCancel = () => {
            if (isFormCreate) {
                onCancel();
            } else if (isFormEdit) {
                setIsFormEdit(false)
            } else {
                console.log("onSignalCancel Tried to press cancel button while form was neither in edit or create")
            }
        }

        const onSignalEdit = () => {
            if (!isFormEdit) {
                setIsFormEdit(true);
            } else if (isFormCreate) {
                onCancel();
            } else {
                console.log("onSignalEdit Tried to press cancel button while form was neither in edit or create")
            }
        }

        return (
            // <Container>
            <Grid sx={{ direction: "column", }}>

                <Box sx={{ textAlign: "right" }}>
                    {isModify() ?
                        <IconButton onClick={onSignalCancel}>
                            <CancelSharpIcon />
                        </IconButton>
                        :
                        <IconButton onClick={onSignalEdit}>
                            <EditIcon />
                        </IconButton>
                    }
                </Box>

                <Box component="div">
                    <TextField
                        label="Pair"
                        select
                        sx={{ margin: "0 1rem", minWidth: "100px" }}
                        variant="standard"
                        disabled={!isModify()}
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}>
                        {pairs.map(pair => (
                            <MenuItem key={pair} value={pair}>
                                {pair}
                            </MenuItem>
                        ))}
                    </TextField>
                    {/* <TextField
                        label="Price"
                        sx={{ margin: "0 1rem" }}
                        variant="standard"
                        disabled={!isModify()}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    /> */}
                </Box>
                {isModify() &&
                    <Box component="div" display="flex" justifyContent="right">
                        <Button
                            variant="contained"
                            endIcon={<AddBoxIcon />}
                            disabled={!isModify()}
                            onClick={submit}>
                            Save
                        </Button>
                    </Box>
                }
            </Grid>
            // </Container>
        );
    }

    function isModify() {
        return isFormEdit || isFormCreate;
    }
}

export default SignalComponent;
