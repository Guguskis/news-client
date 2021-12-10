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
        marginBottom: "1rem",
        minWidth: "300px",
        minHeight: "100px",
    },
    details: {
        alignContent: "center",
    }
}

function SignalComponent({ signal, isEdit = false, isCreate = false, onSubmit, onCancel }) {
    const [pairs, setPairs] = useState(["BTC/ASS", "ETH/ASS", "XRP/USDT", "BTC/USDT"]);
    const [sides, setSides] = useState(["LONG", "SHORT"]);

    const [isFormEdit, setIsFormEdit] = useState(isEdit);
    const [isFormCreate, setIsFormCreate] = useState(isCreate);

    const [id, setId] = useState(-1);
    const [symbol, setSymbol] = useState("BTC/ASS");
    const [side, setSide] = useState("LONG");
    const [channel, setChannel] = useState("");
    const [entries, setEntries] = useState([]);
    const [exits, setExits] = useState([]);

    useEffect(() => {
        bindSignalStateFields(signal);
    }, [signal])

    const bindSignalStateFields = (signal) => {
        if (!signal) return;
        if (signal.id)
            setId(signal.id)
        if (signal.symbol)
            setSymbol(signal.symbol)
        if (signal.side)
            setSide(signal.side)
        if (signal.channel)
            setChannel(signal.channel)
        if (signal.entries)
            setEntries(signal.entries)
        if (signal.exits)
            setExits(signal.exits)

        console.log("signal binded", signal)
    }

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
            side: side,
            channel: channel,
            entries: entries,
            exits: exits
        };
        console.log("send POST", signal);
        setIsFormCreate(false)
        onSubmit(signal);
    }

    const onEditSignalSubmit = () => {
        const editedSignal = {
            id: id,
            symbol: symbol,
            entries: entries,
            exits: exits
        };
        console.log("send PUT", editedSignal);

        setIsFormEdit(false)
        onSubmit(editedSignal);
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
        <Card variant="outlined" sx={styles.container} key="signal-component">
            <CardContent sx={styles.details} >
                <Grid sx={{ direction: "column", justifyContent: "space-between" }}>
                    <ActionsBar />
                    <DetailsSection />
                    <EntrySection />
                    <ExitSection />
                    {isModify() && <SaveButton />}
                </Grid>
            </CardContent>
        </Card>
    );

    function SaveButton() {
        return <Box component="div" display="flex" justifyContent="right">
            <Button
                variant="contained"
                endIcon={<AddBoxIcon />}
                disabled={!isModify()}
                onClick={submit}>
                Save
            </Button>
        </Box>;
    }

    function EntrySection() {
        return <>
            <Grid display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h6" component="h2">
                    Entries
                </Typography>
                <IconButton onClick={onSignalCancel} color="primary">
                    <AddBoxIcon />
                </IconButton>
            </Grid>
            <Grid marginBottom="0.5rem" padding="0.5rem">
                {entries.map(assembleTrigger)}
            </Grid>
        </>;
    }

    function ExitSection() {
        return <>
            <Grid display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h6" component="h2">
                    Exits
                </Typography>
                <IconButton onClick={onSignalCancel} color="primary">
                    <AddBoxIcon />
                </IconButton>
            </Grid>
            <Grid marginBottom="0.5rem" padding="0.5rem">
                {exits.map(assembleTrigger)}
            </Grid>
        </>;
    }

    function DetailsSection() {
        return <Box component="div" marginBottom="1rem">
            <TextField
                label="Pair"
                select
                sx={{ margin: "0 1rem", minWidth: "100px" }}
                variant="standard"
                disabled={!isFormCreate}
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}>
                {pairs.map(pair => (
                    <MenuItem key={pair} value={pair}>
                        {pair}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Side"
                select
                sx={{ margin: "0 1rem", minWidth: "100px" }}
                variant="standard"
                disabled={!isFormCreate}
                value={side}
                onChange={(e) => setSide(e.target.value)}>
                {sides.map(side => (
                    <MenuItem key={side} value={side}>
                        {side}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Channel"
                sx={{ margin: "0 1rem", minWidth: "100px" }}
                variant="standard"
                disabled={!isModify()}
                value={channel}
                onChange={(e) => setChannel(e.target.value)}>
            </TextField>
        </Box>;
    }

    function ActionsBar() {
        return <Grid sx={{ direction: "row", justifyContent: "space-between", display: "flex" }}>
            <Box sx={{ textAlign: "left", paddingLeft: "1rem" }} component="span">
                {(id >= 0) && <TextField
                    label="#"
                    component="span"
                    variant="standard"
                    sx={{ width: "2rem" }}
                    value={id}
                    disabled>
                </TextField>}
            </Box>
            <Box sx={{ textAlign: "right" }} component="span">
                {isModify() ?
                    <Box component="span" sx={{ justifyContent: "flex-end", alignItems: "center" }}>
                        {isFormEdit &&
                            <IconButton onClick={onSignalCancel} color="error">
                                <DeleteForeverIcon />
                            </IconButton>}
                        <IconButton onClick={onSignalCancel} color="primary">
                            <CancelSharpIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    :
                    <IconButton onClick={onSignalEdit} color="primary">
                        <EditIcon />
                    </IconButton>}
            </Box>
        </Grid>;
    }

    function assembleTrigger(trigger) {
        return (
            <Grid key={trigger.id} flexDirection="row">
                <Typography key={trigger.id} variant="body2" component="p" >
                    {/* {trigger.price} $ */}
                    Type | Price | Units | Executed
                </Typography>
            </Grid>
        )
    }

    function isModify() {
        return isFormEdit || isFormCreate;
    }
}

export default SignalComponent;
