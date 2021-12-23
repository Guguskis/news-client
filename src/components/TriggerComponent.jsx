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
import { ArraysState } from '../utils/utils.jsx';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "0.75rem",
    },
    borderBottomWidth: 0,
    // borderBottomColor: theme.palette.primary.main,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    borderBottomColor: theme.palette.primary.main,
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TriggerComponent({ signal, trigger, showActionBar = true, onSubmit }) {

    const [{ data: deleteTriggerData, loading: deleteTriggerLoading, error: deleteTriggerError }, deleteTriggerExecute] = API.useCryptoApi({
        url: `/api/signals/${signal?.id}/triggers/${trigger?.id}`,
        method: "DELETE"
    },
        { manual: true }
    )

    const [isTriggerModalOpen, setIsTriggerModalOpen] = useState(false);
    const [isEditTrigger, setIsEditTrigger] = useState(false);

    const [id, setId] = useState(-1);
    const [isEntry, setIsEntry] = useState(false);
    const [isMarket, setIsMarket] = useState(true);
    const [quantity, setQuantity] = useState(100);
    const [executed, setExecuted] = useState(false);
    const [entryTime, setEntryTime] = useState(new Date());
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
        if (trigger.entryTime)
            setEntryTime(new Date(trigger.entryTime))
        if (trigger.price)
            setPrice(trigger.price)
    }

    useEffect(() => {
        if (!deleteTriggerLoading && deleteTriggerData) {
            toast.success("Trigger deleted")
            console.info('Trigger deleted', deleteTriggerData);
            onSubmit();
        }
    }, [deleteTriggerLoading, deleteTriggerData, onSubmit]);

    useEffect(() => {
        if (deleteTriggerError) {
            toast.error(deleteTriggerError.message);
        }
    }, [deleteTriggerError]);

    const onTriggerSubmit = (trigger) => {
        console.debug("onTriggerSubmit", trigger);
        onSubmit();
    }

    const onTriggerSubmitCallback = useCallback(onTriggerSubmit, [onTriggerSubmit])

    const onTriggerEdit = () => {
        setIsEditTrigger(true);
        setIsTriggerModalOpen(true);
        console.debug("onTriggerEdit", trigger);
    }

    const onTriggerCancel = () => {
        setIsTriggerModalOpen(false);
    }

    const onTriggerDelete = (trigger) => {
        deleteTriggerExecute();
        console.debug("onTriggerDelete", trigger);
    }

    return (
        <StyledTableRow
            key={trigger.id}>
            <StyledTableCell scope="row" width="0.5rem">
                <ExecutedIcon />
            </StyledTableCell>
            <StyledTableCell scope="row">
                {trigger.isMarket ? "Market" : "Limit"} {quantity}@{price}
            </StyledTableCell>
            {showActionBar &&
                <StyledTableCell align="right" scope="row">
                    <Box component="span">
                        <IconButton color="error" onClick={() => onTriggerDelete(trigger)} >
                            {deleteTriggerLoading ?
                                <CircularProgress color="error" size="1rem" />
                                :
                                <DeleteForeverIcon />
                            }
                        </IconButton>
                        <IconButton onClick={() => onTriggerEdit(trigger)} color="primary" >
                            <EditIcon />
                        </IconButton>
                    </Box>
                </StyledTableCell>
            }
            <TriggerModal
                signal={signal}
                trigger={trigger}
                isOpen={isTriggerModalOpen}
                isEdit={isEditTrigger}
                onSubmit={onTriggerSubmitCallback}
                onCancel={onTriggerCancel} />
        </StyledTableRow>
    );

    function ExecutedIcon() {
        return <Box component="span" marginRight="1rem">
            {trigger.executed ?
                <CheckCircleIcon color="success" />
                :
                <HourglassBottomIcon color="warning" />
            }
        </Box>;
    }
}

export default TriggerComponent;
