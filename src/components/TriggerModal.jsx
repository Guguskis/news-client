import React from 'react';

import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Box, Card, CardContent, TextField, Button, MenuItem, Modal, Container, Grid } from '@mui/material';

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
    }
}

const TriggerModal = ({ trigger, isOpen, isEdit = false, isCreate = false, onSubmit, onCancel }) => {

    const [id, setId] = useState(-1);
    const [isEntry, setIsEntry] = useState(false);
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
        if (trigger.executionTime)
            setExecutionTime(trigger.executionTime)
        if (trigger.price)
            setPrice(trigger.price)

        console.log("trigger binded", trigger)
    }

    const onTriggerCreate = (type) => {
        if (isCreate) {
            console.log("onTriggerCreate trigger cannot be added during signal creation")
            return;
        } else if (type === "exit") {

        } else if (type === "entry") {

        }
        console.log("EDIT", type)
        onSubmit(trigger);
    }

    const onTriggerCancel = () => {
        onCancel();
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onTriggerCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default TriggerModal;