import React, { useDebugValue } from 'react';

import { useState, useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, TextField, Button, Modal, Container, Grid, MenuItem, Switch, Stack, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { API } from "../config/axiosConfig.jsx";
import { toast } from 'react-toastify';

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxWidth: "90%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        paddingTop: "1rem"
    }
}

const TriggerModal = ({ signal, trigger, isOpen, isEdit = false, onSubmit, onCancel }) => {
    // introduced bug when clicking edit signal causes signal craeted popup   
    const [{ data: createTriggerData, loading: createTriggerLoading, error: createTriggerError }, createTriggerExecute] = API.useCryptoApi({
        url: `/api/signals/${signal?.id}/triggers`,
        method: "POST"
    },
        { manual: true }
    )

    const [{ data: patchTriggerData, loading: patchTriggerLoading, error: patchTriggerError }, patchTriggerExecute] = API.useCryptoApi({
        url: `/api/signals/${signal?.id}/triggers/${trigger?.id}`,
        method: "PATCH"
    },
        { manual: true }
    )

    const [id, setId] = useState(-1);
    const [isEntry, setIsEntry] = useState(false);
    const [isMarket, setIsMarket] = useState(true);
    const [quantity, setQuantity] = useState(100);
    const [executed, setExecuted] = useState(false);
    const [entryTime, setEntryTime] = useState(new Date());
    const [price, setPrice] = useState(250);

    const [{ data: getTickersData, loading: getTickersLoading, error: getTickersError }, getTickersExecute] = API.useCryptoApi({
        url: `/api/currencies/${signal?.symbol}/tickers`,
        method: "GET",
        params: {
            from: entryTime,
        }
    },
        { manual: true }
    )

    useEffect(() => {
        if (isOpen && signal)
            getTickersExecute()
    }, [isOpen, signal, getTickersExecute])

    useEffect(() => {
        if (!getTickersLoading && getTickersData) {
            if (getTickersData.length > 0)
                setPrice(getTickersData[0].close);
        }
    }, [getTickersLoading, getTickersData])

    useEffect(() => {
        bindTriggerStateFields(trigger);
    }, [trigger])

    useEffect(() => {
        if (!createTriggerLoading && createTriggerData) {
            toast.success("Trigger created")
            console.info('Trigger created', createTriggerData);
            onSubmit(createTriggerData);
        }
    }, [createTriggerLoading, createTriggerData, onSubmit]);

    useEffect(() => {
        if (createTriggerError) {
            toast.error(createTriggerError.message);
        }
    }, [createTriggerError]);

    useEffect(() => {
        if (!patchTriggerLoading && patchTriggerData) {
            toast.success("Trigger updated")
            console.info('Trigger updated', patchTriggerData);
            onSubmit(patchTriggerData);
        }
    }, [patchTriggerLoading, patchTriggerData, onSubmit]);

    useEffect(() => {
        if (patchTriggerError) {
            toast.error(patchTriggerError.message);
        }
    }, [patchTriggerError]);

    const bindTriggerStateFields = (trigger) => {
        if (!trigger) return;
        if (trigger.id)
            setId(trigger.id)
        if (trigger.isEntry)
            setIsEntry(trigger.isEntry)
        if (trigger.isMarket)
            setIsMarket(trigger.isMarket)
        if (trigger.quantity)
            setQuantity(trigger.quantity)
        if (trigger.executed)
            setExecuted(trigger.executed)
        if (trigger.entryTime)
            setEntryTime(new Date(trigger.entryTime))
        if (trigger.price)
            setPrice(trigger.price)
    }

    const submit = () => {
        if (isEdit) {
            onTriggerEditSubmit();
        } else {
            onTriggerCreateSubmit();
        }
    }

    const onTriggerCreateSubmit = () => {
        createTriggerExecute({
            data: {
                isEntry: isEntry,
                isMarket: isMarket,
                quantity: quantity,
                entryTime: entryTime,
                price: price
            }
        });
    }

    const onTriggerEditSubmit = () => {
        patchTriggerExecute({
            data: {
                quantity: quantity,
                entryTime: entryTime,
                price: price
            }
        });
    }

    const onTriggerCancel = () => {
        onCancel();
    }

    return (
        <Modal
            open={isOpen}
            onClose={onTriggerCancel}
        >
            <Box sx={styles.modal}>
                <ActionsBar />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <ModalHeader />
                </Typography>
                <TriggerTypeSwitch />
                <Box sx={{ marginBottom: "1rem", maxWidth: "100%" }}>
                    <DateTimePicker
                        gutterBottom
                        label="Entry time"
                        value={entryTime}
                        onChange={setEntryTime}
                        ampm={false}
                        inputFormat="yyyy-MM-dd HH:mm"
                        mask="____-__-__ __:__"
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
                {!isMarket &&
                    <Box marginBottom="1rem">
                        <TextField
                            id="price"
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            disabled={isEdit}
                        />
                    </Box>}
                <SaveButton />
            </Box>
        </Modal>
    );

    function ModalHeader() {
        const action = `${isEdit ? "Update" : "Create"}`;
        return isEntry ? `${action} Entry` : `${action} Exit`;
    }

    function TriggerTypeSwitch() {
        return <Stack direction="row" sx={{ alignItems: "center" }} marginBottom="1rem">
            <Typography variant="body2">
                Limit
            </Typography>
            <Switch
                onChange={(e) => setIsMarket(e.target.checked)}
                checked={isMarket}
                disabled={isEdit}
            />
            <Typography variant="body2">
                Market
            </Typography>
        </Stack>;
    }

    function SaveButton() {
        return <Box component="div" display="flex" justifyContent="right">
            <LoadingButton
                loading={createTriggerLoading}
                loadingIndicator={<CircularProgress color="primary" size="1rem" />}
                variant="contained"
                endIcon={<AddBoxIcon />}
                onClick={submit}>
                Save
            </LoadingButton>
        </Box>;
    }

    function ActionsBar() {
        return <Box sx={{ textAlign: "right" }} component="div">
            <IconButton onClick={onTriggerCancel} color="primary">
                <CancelSharpIcon />
            </IconButton>
        </Box>;
    }
};

export default TriggerModal;