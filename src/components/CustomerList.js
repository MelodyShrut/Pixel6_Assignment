import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer } from '../features/customerSlice';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const CustomerList = () => {
  const customers = useSelector((state) => state.customer.customers);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
  };

  return (
    <div>
      <Table>
        <TableHead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.fullName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.mobileNumber}</TableCell>
              <TableCell>
                <Link to={`/edit-customers/${customer.id}`}>Edit</Link>
                <Button onClick={() => handleDelete(customer.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerList;
