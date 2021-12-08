import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, TextField, Button, MenuItem, InputAdornment, Container, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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

    const [id, setId] = useState(-1);
    const [symbol, setSymbol] = useState("BTC/ASS");
    const [channel, setChannel] = useState("");
    const [entries, setEntries] = useState([]);
    const [exits, setExits] = useState([]);

    useEffect(() => {
        console.log("signal binded", signal)
        bindSignalStateFields(signal);
    }, [signal])

    useEffect(() => {
        console.log("updated entries", entries)
    }, [entries])
    useEffect(() => {
        console.log("updated exits", exits)
    }, [exits])

    const bindSignalStateFields = (signal) => {
        if (signal.id)
            setId(signal.id)
        if (signal.symbol)
            setSymbol(signal.symbol)
        setChannel(signal.channel)
        setEntries(signal.entries)
        setExits(signal.exits)
    }

    return (
        <Card variant="outlined" sx={styles.container} key="signal-component">
            <CardContent sx={styles.details} >
                <SignalForm onSignalSubmit={onSubmit} />
            </CardContent>
        </Card>
    );

    function SignalForm({ onSignalSubmit }) {

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
            <CardContent >
                <Grid sx={{ direction: "column", justifyContent: "space-between" }}>

                    <Box sx={{ textAlign: "right" }}>
                        {isModify() ?
                            <Grid sx={{ justifyContent: "flex-end", alignItems: "center" }}>
                                <IconButton onClick={onSignalCancel} color="error">
                                    <DeleteForeverIcon />
                                </IconButton>
                                <IconButton onClick={onSignalCancel} color="primary">
                                    <CancelSharpIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                            :
                            <IconButton onClick={onSignalEdit} color="primary">
                                <EditIcon />
                            </IconButton>
                        }
                    </Box>

                    <Box component="div" marginBottom="1rem">
                        <TextField
                            label="#"
                            variant="standard"
                            sx={{ width: "2rem" }}
                            value={id}
                            disabled>
                        </TextField>

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
                        <TextField
                            label="Signal group"
                            sx={{ margin: "0 1rem", minWidth: "100px" }}
                            variant="standard"
                            disabled={!isModify()}
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                        // autoFocus
                        >
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
                    <Grid marginBottom="0.5rem" padding="0.5rem">
                        {entries.map(assembleEntry)}
                    </Grid >
                    <Grid marginBottom="0.5rem" padding="0.5rem">
                        {exits.map(assembleExit)}
                    </Grid>
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
            </CardContent>
            // </Container>
        );

        function assembleEntry(entry) {
            return (
                <Grid key={entry.id} flexDirection="row">
                    <Typography key={entry.id} variant="body2" component="p" sx={{ border: "1px solid red" }}>
                        Entry {entry.price} $
                    </Typography>
                </Grid>
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

    function isModify() {
        return isFormEdit || isFormCreate;
    }
}

export default SignalComponent;
