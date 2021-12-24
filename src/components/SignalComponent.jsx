import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { useState, useEffect, useCallback } from 'react';
import { Box, Card, CardContent, TextField, Button, MenuItem, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Paper, tableCellClasses, Stack, CircularProgress } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { styled } from '@mui/material/styles';
import { API } from "../config/axiosConfig.jsx";
import { LoadingButton } from '@mui/lab';


import TriggerModal from './TriggerModal.jsx';
import TriggerComponent from './TriggerComponent.jsx';
import { ArraysState } from '../utils/utils.jsx';
import { toast } from 'react-toastify';

const styles = {
    container: {
        marginBottom: "1rem",
        minWidth: "300px",
        minHeight: "100px",
        maxWidth: "30rem",
    },
    details: {
        alignContent: "center",
    }
}

function SignalComponent({ signal, isEdit = false, isCreate = false, onSubmit, onCancel, symbols }) {
    const [{ data: createSignalData, loading: createSignalLoading, error: createSignalError }, createSignalExecute] = API.useCryptoApi({
        url: "/api/signals",
        method: "POST"
    },
        { manual: true }
    )
    const [{ data: editSignalData, loading: editSignalLoading, error: editSignalError }, editSignalExecute] = API.useCryptoApi({
        url: `/api/signals/${signal?.id}`,
        method: "PATCH"
    },
        { manual: true }
    )
    const [{ data: deleteSignalData, loading: deleteSignalLoading, error: deleteSignalError }, deleteSignalExecute] = API.useCryptoApi({
        url: `/api/signals/${signal?.id}`,
        method: "DELETE"
    },
        { manual: true }
    )

    const [{ data: getSignalData, loading: getSignalLoading, error: getSignalError }, getSignalExecute] = API.useCryptoApi({
        url: `/api/signals/${signal?.id}`,
        method: "GET"
    },
        { manual: true }
    )

    const [sides, setSides] = useState([{ label: "Long", value: true }, { label: "Short", value: false }]);

    const [isSignalEdit, setIsSignalEdit] = useState(isEdit);
    const [isSignalCreate, setIsSignalCreate] = useState(isCreate);
    const [isTriggerModalOpen, setIsTriggerModalOpen] = useState(false);

    const [triggerToEdit, setTriggerToEdit] = useState({});
    const [isEditTrigger, setIsEditTrigger] = useState(false);

    const [id, setId] = useState(-1);
    const [leverage, setLeverage] = useState(1);
    const [symbol, setSymbol] = useState(symbols[0]);
    const [isLong, setIsLong] = useState(true);
    const [channel, setChannel] = useState("");
    const [triggers, setTriggers] = useState([]);

    useEffect(() => {
        bindSignalStateFields(signal);
    }, [signal])

    useEffect(() => {
        if (!createSignalLoading && createSignalData) {
            toast.success("Signal saved")
            console.info('Signal saved', createSignalData);
            onSubmit();
        }
    }, [createSignalLoading, createSignalData, onSubmit]);

    useEffect(() => {
        if (createSignalError) {
            toast.error(createSignalError.message);
        }
    }, [createSignalError]);

    useEffect(() => {
        if (!editSignalLoading && editSignalData) {
            toast.success("Signal saved")
            console.info('Signal saved', editSignalData);
            onSubmit();
        }
    }, [editSignalLoading, editSignalData, onSubmit]);

    useEffect(() => {
        if (editSignalError) {
            toast.error(editSignalError.message);
        }
    }, [editSignalError]);

    // todo resolve performance issue and toast being shown mid expiration
    useEffect(() => {
        if (!deleteSignalLoading && deleteSignalData) {
            toast.success("Signal deleted")
            console.info('Signal deleted', deleteSignalData);
            onSubmit();
        }
    }, [deleteSignalLoading, deleteSignalData, onSubmit]);

    useEffect(() => {
        if (deleteSignalError) {
            toast.error(deleteSignalError.message);
        }
    }, [deleteSignalError]);

    useEffect(() => {
        if (!getSignalLoading && getSignalData) {
            bindSignalStateFields(getSignalData)
        }
    }, [getSignalLoading, getSignalData]);

    useEffect(() => {
        if (getSignalError) {
            toast.error(getSignalError.message);
        }
    }, [getSignalError]);

    const bindSignalStateFields = (signal) => {
        if (!signal) return;
        if (signal.id)
            setId(signal.id)
        if (signal.leverage)
            setLeverage(signal.leverage)
        if (signal.symbol)
            setSymbol(signal.symbol)
        if (signal.isLong)
            setIsLong(signal.isLong)
        if (signal.channel)
            setChannel(signal.channel)
        if (signal.triggers)
            setTriggers(signal.triggers)
    }

    const submit = () => {
        if (isSignalCreate) {
            onCreateSignalSubmit();
        } else if (isSignalEdit) {
            onEditSignalSubmit()
        } else {
            console.error("isCreate or isEdit should be true");
        }
    }

    const onCreateSignalSubmit = () => {
        console.info("Sending create signal request");
        createSignalExecute({
            data: {
                ...createSignalData,
                symbol: symbol,
                leverage: leverage,
                isLong: isLong,
                channel: channel,
            }
        })
    }

    const onEditSignalSubmit = () => {
        console.info("Sending edit signal request");
        editSignalExecute({
            data: {
                ...editSignalData,
                leverage: leverage,
                channel: channel
            }
        })
    }

    const onSignalDeleteSubmit = () => {
        console.info("Sending delete signal request");
        deleteSignalExecute();
    }

    const onSignalCancel = () => {
        if (isSignalCreate) {
            onCancel();
        } else if (isSignalEdit) {
            setIsSignalEdit(false)
        } else {
            console.log("onSignalCancel Tried to press cancel button while form was neither in edit or create")
        }
    }

    const onSignalEdit = () => {
        if (!isSignalEdit) {
            setIsSignalEdit(true);
        } else if (isSignalCreate) {
            onCancel();
        } else {
            console.log("onSignalEdit Tried to press cancel button while form was neither in edit or create")
        }
    }

    const onTriggerSubmit = (trigger) => {
        console.debug("onTriggerSubmit", trigger);
        setIsTriggerModalOpen(false);
        getSignalExecute();
    }

    const onTriggerSubmitCallback = useCallback(onTriggerSubmit, [onTriggerSubmit])

    const onTriggerCreate = (isEntry) => {
        const trigger = {
            isEntry: isEntry
        }
        setTriggerToEdit(trigger);
        setIsEditTrigger(false);
        setIsTriggerModalOpen(true);
        console.debug("onTriggerCreate", trigger);
    }

    const onTriggerCancel = () => {
        setIsTriggerModalOpen(false);
    }

    return (
        <Card variant="outlined" sx={styles.container} key="signal-component">
            <CardContent sx={styles.details} >
                <Grid sx={{ direction: "column", justifyContent: "space-between" }}>
                    <ActionsBar />
                    <Box component="div" marginBottom="1rem">
                        <TextField
                            label="Currency"
                            select
                            sx={{ margin: "0 1rem", minWidth: "100px" }}
                            variant="standard"
                            disabled={!isSignalCreate}
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}>
                            {symbols.map(symbol => (
                                <MenuItem key={symbol} value={symbol}>
                                    {symbol}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Side"
                            select
                            sx={{ margin: "0 1rem" }}
                            variant="standard"
                            disabled={!isSignalCreate}
                            value={isLong}
                            onChange={(e) => setIsLong(e.target.value)}>
                            {sides.map(isLong => (
                                <MenuItem key={isLong.label} value={isLong.value}>
                                    {isLong.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Leverage"
                            sx={{ margin: "0 1rem", maxWidth: "5rem" }}
                            variant="standard"
                            disabled={!isModify()}
                            value={leverage}
                            onChange={(e) => setLeverage(e.target.value)}>
                        </TextField>
                        <TextField
                            label="Channel"
                            sx={{ margin: "0 1rem" }}
                            variant="standard"
                            disabled={!isModify()}
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}>
                        </TextField>
                    </Box>
                    {!isSignalCreate && <EntrySection />}
                    {!isSignalCreate && <ExitSection />}
                    {isModify() && <SaveButton />}
                </Grid>
                {isTriggerModalOpen && <TriggerModal
                    signal={signal}
                    trigger={triggerToEdit}
                    isOpen={true}
                    isEdit={isEditTrigger}
                    onSubmit={onTriggerSubmitCallback}
                    onCancel={onTriggerCancel} />}
                {/* <TriggerModal
                    signal={signal}
                    trigger={triggerToEdit}
                    isOpen={isTriggerModalOpen}
                    isEdit={isEditTrigger}
                    onSubmit={onTriggerSubmitCallback}
                    onCancel={onTriggerCancel} /> */}
            </CardContent>
        </Card>
    );

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
                        {isSignalEdit &&
                            <IconButton onClick={onSignalDeleteSubmit} color="error">
                                {deleteSignalLoading ?
                                    <CircularProgress color="error" size="1rem" />
                                    :
                                    <DeleteForeverIcon />
                                }
                            </IconButton>}
                        <IconButton onClick={onSignalCancel} color="primary">
                            <CancelSharpIcon />
                        </IconButton>
                    </Box>
                    :
                    <IconButton onClick={onSignalEdit} color="primary">
                        <EditIcon />
                    </IconButton>}
            </Box>
        </Grid>;
    }

    function EntrySection() {
        const entries = triggers.filter(t => t.isEntry);
        return <>
            <Stack direction="row" sx={{ alignItems: "center" }}>
                <Box width="2.5rem">
                    <Typography variant="h6" component="h2" >
                        Entry
                    </Typography>
                </Box>
                <IconButton onClick={() => onTriggerCreate(true)} color="primary">
                    <AddBoxIcon />
                </IconButton>
            </Stack>
            <TableContainer component={Paper} sx={{ marginBottom: "0.5rem", padding: "0.25rem" }}>
                <Table size="small" >
                    <TableBody>
                        {entries.map(assembleTrigger)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>;
    }

    function ExitSection() {
        const exits = triggers.filter(t => !t.isEntry);
        return <>
            <Grid display="flex" flexDirection="row" alignItems="center">
                <Box width="2.5rem">
                    <Typography variant="h6" component="h2" width="2.25rem" >
                        Exit
                    </Typography>
                </Box>
                <IconButton onClick={() => onTriggerCreate(false)} color="primary">
                    <AddBoxIcon />
                </IconButton>
            </Grid>
            <TableContainer component={Paper} sx={{ marginBottom: "0.5rem", padding: "0.25rem" }}>
                <Table size="small" aria-label="a dense table" >
                    <TableBody>
                        {exits.map(assembleTrigger)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>;
    }

    function SaveButton() {
        return <Box component="div" display="flex" justifyContent="right">
            <LoadingButton
                loading={createSignalLoading || editSignalLoading}
                variant="contained"
                loadingIndicator={<CircularProgress color="primary" size="1rem" />}
                endIcon={<AddBoxIcon />}
                disabled={!isModify()}
                onClick={submit}>
                Save
            </LoadingButton>
        </Box >;
    }

    function assembleTrigger(trigger) {
        return (
            <TriggerComponent
                key={trigger.id}
                signal={signal}
                trigger={trigger}
                showActionBar={isModify()}
                onSubmit={onTriggerSubmitCallback}
            />
        )
    }

    function isModify() {
        return isSignalEdit || isSignalCreate;
    }
}

export default SignalComponent;
