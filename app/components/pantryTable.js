import React from 'react';
import
{
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Box,
  Typography,
  Chip
} from '@mui/material';
import styled from '@emotion/styled';
import { Add, Remove } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
});

const StyledTableHeaderCell = styled(TableCell)({
  textAlign: 'center',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
});

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Item Name' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'nafdacNo', label: 'NAFDAC No' },
  { id: 'price', label: 'Unit Price(₦)' },
  { id: 'totalPrice', label: 'Total Price(₦)' },
  { id: 'expirationDate', label: 'Expiration Date' },
  { id: 'status', label: 'Status' },
  { id: 'supplier', label: 'Supplier' },
  { id: 'dateAdded', label: 'Date Added' },
  { id: 'action', label: 'Action' },
];

function formatDate (seconds)
{
  if (seconds)
  {
    return new Date(seconds * 1000).toLocaleDateString();
  }
  return '';
}

function getStatus (expirationDate, isNonPerishable)
{
  if (isNonPerishable)
  {
    return 'Non-perishable';
  }

  if (!expirationDate)
  {
    return 'Unknown';
  }

  const today = new Date();
  const expDate = new Date(expirationDate.seconds * 1000);

  if (expDate < today)
  {
    return 'Expired';
  } else if (expDate > today && expDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000))
  {
    return 'Expiring Soon';
  } else
  {
    return 'Good';
  }
}

export default function PantryTable ({ rows, removeItem, addItem })
{
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) =>
  {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) =>
  {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (row) =>
  {
    removeItem(row.name);
  };

  const handleAdd = (row) =>
  {
    addItem(row.name);
  };

  return (
    <Paper elevation={ 0 } sx={ { width: '100%', overflow: 'hidden' } }>
      <Typography variant='h5' my={ 2 }>Pantry Inventory</Typography>
      <TableContainer sx={ { maxHeight: 440 } }>
        <Table>
          <TableHead>
            <TableRow>
              { columns.map((column) => (
                <StyledTableHeaderCell key={ column.id }>
                  { column.label }
                </StyledTableHeaderCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            { rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) =>
              {
                const status = getStatus(row.expirationDate, row.isNonPerishable);
                return (
                  <TableRow hover role="checkbox" tabIndex={ -1 } key={ row.id }>
                    { columns.map((column) =>
                    {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={ column.id }>
                          { column.id === 'expirationDate'
                            ? row.isNonPerishable
                              ? 'Non-perishable'
                              : formatDate(value?.seconds)
                            : column.id === 'dateAdded' || column.id === 'dateModified'
                              ? formatDate(value?.seconds)
                              : column.id === 'action'
                                ? <Box display={ 'flex' } gap={ 1 }>
                                  <Button size='small' variant='contained' onClick={ () => handleAdd(row) }>
                                    <Add />
                                  </Button>
                                  <Button size="small" variant='outlined' color='error' onClick={ () => handleDelete(row) }>
                                    <Remove />
                                  </Button>
                                </Box>
                                : column.id === 'totalPrice'
                                  ? (row.price * row.quantity).toFixed(2)
                                  : column.id === 'status'
                                    ? <Chip
                                      label={ status }
                                      color={
                                        status === 'Expired' ? 'error' :
                                          status === 'Expiring Soon' ? 'warning' :
                                            status === 'Good' ? 'success' :
                                              'default'
                                      }
                                      size="small"
                                    />
                                    : value }
                        </StyledTableCell>
                      );
                    }) }
                  </TableRow>
                );
              }) }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ [5, 10, 25] }
        component="div"
        count={ rows.length }
        rowsPerPage={ rowsPerPage }
        page={ page }
        onPageChange={ handleChangePage }
        onRowsPerPageChange={ handleChangeRowsPerPage }
      />
    </Paper>
  );
}