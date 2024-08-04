import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const columns = [
  {
    field: 'id', headerName: 'ID'
  },
  {
    field: 'name', headerName: 'Item Name'
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
  },
  {
    field: 'nafdacNo', headerName: 'NAFDAC Reg No', width: 150,
  },
  {
    field: 'price',
    headerName: 'Price(₦)',
    type: 'number',
    valueFormatter: (params) =>
    {
      if (params == null) return '';
      return `₦${ params.toLocaleString() }`;
    },
  },

  {
    field: 'expirationDate',
    headerName: 'Expiration Date',
    type: 'date',
    width: 150,
    valueGetter: (params) =>
    {
      if (params?.seconds)
      {
        return new Date(params?.seconds * 1000);
      }
      return null;
    },
    valueFormatter: (params) =>
    {
      if (params instanceof Date)
      {
        return params?.toLocaleDateString();
      }
      return '';
    },
  },
  {
    field: 'supplier',
    headerName: 'Supplier',
    width: 190,
  },
  {
    field: 'dateAdded',
    headerName: 'Date Added',
    type: 'date',
    width: 190,
    valueGetter: (params) =>
    {
      if (params?.seconds)
      {
        return new Date(params.seconds * 1000);
      }
      return null;
    },
    valueFormatter: (params) =>
    {
      if (params instanceof Date)
      {
        return params.toLocaleDateString();
      }
      return '';
    },
  },
  {
    field: 'dateModified',
    headerName: 'Date Modified',
    type: 'date',
    width: 190,
    valueGetter: (params) =>
    {
      if (params?.seconds)
      {
        return new Date(params.seconds * 1000);
      }
      return null;
    },
    valueFormatter: (params) =>
    {
      if (params instanceof Date)
      {
        return params.toLocaleDateString();
      }
      return '';
    },
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 190,
    renderCell: (params) => (
      <Button variant='contained' onClick={ () => handleAction(params.row) }>Edit</Button>
    ),
  },
];

export default function PantryTable ({ rows })
{
  return (
    <div style={ { height: 400, width: '100%' } }>
      <DataGrid
        rows={ rows }
        columns={ columns }
        initialState={ {
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        } }
        pageSizeOptions={ [5, 10] }
        checkboxSelection
      />
    </div>
  );
}