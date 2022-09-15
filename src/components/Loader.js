import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader({loading}) {
    return loading ? 
    <Box sx={{ display: 'flex', marginLeft: "256px" }}>
        <CircularProgress />
    </Box> : null;
}