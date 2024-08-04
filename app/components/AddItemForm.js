import React, { useState } from 'react';
import
{
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  styled,
  createTheme,
  ThemeProvider,
  Drawer,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Close } from '@mui/icons-material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.4)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  padding: '10px 30px',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 6px rgba(74, 144, 226, 0.2)',
  '&:hover': {
    boxShadow: '0 6px 8px rgba(74, 144, 226, 0.4)',
    transform: 'translateY(-2px)',
  },
}));

const AddItemForm = ({ open, onClose, addItem }) =>
{
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    nafdacNo: '',
    price: '',
    expirationDate: null,
    supplier: '',
    isNonPerishable: false,
  });

  const handleChange = (e) =>
  {
    const { name, value, type, checked } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date) =>
  {
    setNewItem(prevItem => ({
      ...prevItem,
      expirationDate: date
    }));
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    addItem(newItem.name, {
      quantity: parseInt(newItem.quantity),
      nafdacNo: newItem.nafdacNo,
      price: parseFloat(newItem.price),
      expirationDate: newItem.isNonPerishable ? 'Non-perishable' : newItem.expirationDate,
      supplier: newItem.supplier,
      dateAdded: new Date(),
      id: Math.random().toString(36).substr(2, 4),
      isNonPerishable: newItem.isNonPerishable,
    });
    setNewItem({
      name: '',
      quantity: 1,
      nafdacNo: '',
      price: '',
      expirationDate: null,
      supplier: '',
      isNonPerishable: false,
    });

    onClose();
  };

  return (
    <Drawer anchor="right" open={ open } onClose={ onClose }>
      <Box sx={ { width: { sm: '600px' }, p: 3 } }>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={ 4 }>
          <Typography variant="h5" sx={ { fontWeight: 'bold' } }>
            Add New Item
          </Typography>
          <IconButton onClick={ onClose }>
            <Close />
          </IconButton>
        </Box>
        <form onSubmit={ handleSubmit }>
          <Grid container spacing={ 3 }>
            <Grid item xs={ 12 }>
              <StyledTextField
                fullWidth
                label="Item Name"
                name="name"
                value={ newItem.name }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <StyledTextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={ newItem.quantity }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <StyledTextField
                fullWidth
                label="NAFDAC Reg No"
                name="nafdacNo"
                value={ newItem.nafdacNo }
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <StyledTextField
                fullWidth
                label="Price (₦)"
                name="price"
                type="number"
                value={ newItem.price }
                onChange={ handleChange }
                required
              />
            </Grid>
            <Grid item xs={ 12 }>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ newItem.isNonPerishable }
                    onChange={ handleChange }
                    name="isNonPerishable"
                  />
                }
                label="Non-perishable"
              />
            </Grid>
            { !newItem.isNonPerishable && (
              <Grid item xs={ 12 }>
                <DatePicker
                  selected={ newItem.expirationDate }
                  onChange={ handleDateChange }
                  customInput={
                    <StyledTextField
                      fullWidth
                      label="Expiration Date"
                    />
                  }
                />
              </Grid>
            ) }
            <Grid item xs={ 12 }>
              <StyledTextField
                fullWidth
                label="Supplier"
                name="supplier"
                value={ newItem.supplier }
                onChange={ handleChange }
              />
            </Grid>
            <Grid item xs={ 12 }>
              <Box display="flex" justifyContent="flex-end">
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Add Item
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddItemForm;