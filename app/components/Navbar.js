'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import AddItemForm from './AddItemForm';
import { TrackChanges } from '@mui/icons-material';

const Navbar = ({ addItem }) =>
{
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <AppBar variant='outlined' color={ 'secondary' } position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" fontWeight={ 700 } sx={ { flexGrow: 1 } }>
            Pantry Tracker
            <TrackChanges sx={ { ml: '2px' } } />
          </Typography>
          <Button sx={ {
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            }
          } } color="inherit" variant='text' onClick={ handleOpenDrawer }>
            Add New Item
          </Button>
        </Toolbar>
      </AppBar>
      {/* Add new item form */ }
      <AddItemForm addItem={ addItem } open={ isDrawerOpen } onClose={ handleCloseDrawer } />
    </>
  );
};

export default Navbar;
