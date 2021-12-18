import React from 'react';

import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, TextField, Button, Modal, Container, Grid, MenuItem, Switch, Stack } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        paddingTop: "1rem"
    }
}

const TriggerModal = ({ signal, trigger, isOpen, isEdit = false, onSubmit, onCancel }) => {

    const [id, setId] = useState(-1);
    const [isEntry, setIsEntry] = useState(true);
    const [isMarket, setIsMarket] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [executed, setExecuted] = useState(false);
    const [executionTime, setExecutionTime] = useState(Date.now());
    const [price, setPrice] = useState(250);

    useEffect(() => {
        bindTriggerStateFields(trigger);
    }, [trigger])

    const bindTriggerStateFields = (trigger) => {
        if (!trigger) return;

        setId(trigger.id)
        setIsEntry(trigger.isEntry)
        setIsMarket(trigger.isMarket)
        setQuantity(trigger.quantity)
        setExecuted(trigger.executed)
        setExecutionTime(trigger.executionTime)
        setPrice(trigger.price)

        console.debug("trigger bound", trigger)
    }

    const submit = () => {
        const trigger = {
            isEntry: isEntry,
            isMarket: isMarket,
            quantity: quantity,
            executed: executed,
            executionTime: executionTime,
            price: price
        }

        if (isEdit) {
            onTriggerEditSubmit(trigger);
        } else {
            onTriggerCreateSubmit(trigger);
        }

        onSubmit(trigger);
    }

    const onTriggerCreateSubmit = (trigger) => {
        onSubmit(trigger);
    }

    const onTriggerEditSubmit = (trigger) => {
        onSubmit(trigger);
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
                    Trigger
                </Typography>
                <TriggerTypeSwitch />
                <SaveButton />
            </Box>
        </Modal>
    );

    function TriggerTypeSwitch() {
        return <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography variant="body2">
                Limit
            </Typography>
            <Switch
                onChange={(e) => setIsMarket(e.target.checked)}
                checked={isMarket}
                disabled={isEdit}/>
            <Typography variant="body2">
                Market
            </Typography>
        </Stack>;
    }

    function SaveButton() {
        return <Box component="div" display="flex" justifyContent="right">
            <Button
                variant="contained"
                endIcon={<AddBoxIcon />}
                onClick={submit}>
                Save
            </Button>
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