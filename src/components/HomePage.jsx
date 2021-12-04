// HomePage stateless react component

import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Container from '@mui/material/Container';

const styles = {
    button: {
        fontSize: '1rem',
        backgroundColor: 'green',
        '&:hover': {
            backgroundColor: '#00ff00'
        }
    }
}


function HomePage() {

    function addSignal() {
        return console.log('add signal');
    }

    return (
        <Container >
            <Typography
                variant="h6"
                component="h1"
                color="textSecondary"
                gutterBottom
            >
                Signals
            </Typography>

            <Button
                sx={styles.button}
                onClick={() => addSignal()}
                variant="contained"
                endIcon={<AddBoxIcon />}
                type="submit"
            >
                Create
            </Button>
        </Container >
    );
};

export default HomePage;