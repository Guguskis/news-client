// HomePage stateless react component

import React from 'react';

// import typography
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';

function HomePage()  {

    function addSignal() {
        return console.log('add signal');
    }


    return (
        <>
            <Typography
                variant="h6"
                component="h1"
                color="textPrimary"
                gutterBottom
            >
                Signals
            </Typography>

            <Button
                onClick={() => addSignal()}
                variant="contained"
                endIcon={<AddBoxIcon />}
                type="submit"
            >
                Create
            </Button>
        </>
    );
};

export default HomePage;