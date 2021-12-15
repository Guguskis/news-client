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

const TriggerModal = ({ trigger, isOpen, isEdit = false, onSubmit, onCancel }) => {

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

    const onTriggerCreate = () => {
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
                        Add trigger {isEntry ? "entry" : "exit"}
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