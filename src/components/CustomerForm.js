import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../features/customerSlice';
import axios from 'axios';
import { Button, Grid, TextField, Typography, CircularProgress } from '@mui/material';

const CustomerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const customers = useSelector((state) => state.customer.customers);
  const customer = customers.find((cust) => cust.id === id);

  const [loadingPan, setLoadingPan] = useState(false);
  const [loadingPostcode, setLoadingPostcode] = useState(false);
  const [panValid, setPanValid] = useState(true); 

  const [formData, setFormData] = useState({
    pan: '',
    fullName: '',
    email: '',
    mobileNumber: '',
    addresses: [{ addressLine1: '', postcode: '', state: '', city: '', addressLine2: '' }],
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
     
      setPanValid(true);
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const newAddresses = [...formData.addresses];
    const updatedAddress = { ...newAddresses[index], [name]: value };
    newAddresses[index] = updatedAddress;
    setFormData((prev) => ({ ...prev, addresses: newAddresses }));
  };

  const handleAddAddress = () => {
    setFormData((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { addressLine1: '', postcode: '', state: '', city: '', addressLine2: '' }],
    }));
  };

  const handleVerifyPan = async () => {
    if (formData.pan === customer?.pan) {
     
      return;
    }

    setLoadingPan(true);
    try {
      const response = await axios.post('https://lab.pixel6.co/api/verify-pan.php', {
        panNumber: formData.pan,
      });
      if (response.data.isValid) {
        setPanValid(true);
        setFormData((prev) => ({ ...prev, fullName: response.data.fullName }));
      } else {
        setPanValid(false);
      }
    } catch (error) {
      console.error('Error verifying PAN:', error);
      setPanValid(false);
    } finally {
      setLoadingPan(false);
    }
  };

  const handlePostcodeChange = async (index, e) => {
    const postcode = e.target.value;
    setLoadingPostcode(true);

    const newAddresses = [...formData.addresses];

    try {
      const response = await axios.post('https://lab.pixel6.co/api/get-postcode-details.php', {
        postcode,
      });

      if (response.data && response.data.state && response.data.city) {
        newAddresses[index] = {
          ...newAddresses[index],
          postcode: postcode,  
          state: response.data.state[0].name,
          city: response.data.city[0].name,
        };
        setFormData((prev) => ({ ...prev, addresses: newAddresses }));
      }
    } catch (error) {
      console.error('Error fetching postcode details:', error);
    } finally {
      setLoadingPostcode(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (panValid) {
      dispatch(addCustomer(formData));
      console.log('Customer added:', formData);
      navigate('/customers');
    } else {
      alert('Invalid PAN');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Pan:</Typography>
          <TextField
            fullWidth
            name="pan"
            value={formData.pan}
            onChange={handleInputChange}
            onBlur={handleVerifyPan}
            required
          />
          {loadingPan && <CircularProgress size={24} />}
        </Grid>

        <Grid item xs={4}>
          <Typography>Full Name:</Typography>
          <TextField
            fullWidth
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            readOnly
          />
        </Grid>

        <Grid item xs={4}>
          <Typography>Email:</Typography>
          <TextField
            fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Mobile Number:</Typography>
          <TextField
            fullWidth
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="+91"
          />
        </Grid>
      </Grid>

      {formData.addresses.map((address, index) => (
        <div key={index}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography>Address Line 1:</Typography>
              <TextField
                fullWidth
                type="text"
                name="addressLine1"
                value={address.addressLine1}
                onChange={(e) => handleAddressChange(index, e)} />
            </Grid>

            <Grid item xs={4}>
              <Typography>Address Line 2:</Typography>
              <TextField
                fullWidth
                type="text"
                name="addressLine2"
                value={address.addressLine2}
                onChange={(e) => handleAddressChange(index, e)} />
            </Grid>

            <Grid item xs={4}>
              <Typography>Postcode:</Typography>
              <TextField
                fullWidth
                type="text"
                name="postcode"
                value={address.postcode}
                onChange={(e) => {
                  handleAddressChange(index, e);
                  handlePostcodeChange(index, e);
                }} />
              {loadingPostcode && <CircularProgress size={24} />}
            </Grid>

            <Grid item xs={4}>
              <Typography>City:</Typography>
              <TextField
                fullWidth
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleAddressChange(index, e)}
                readOnly />
            </Grid>

            <Grid item xs={4}>
              <Typography>State:</Typography>
              <TextField
                fullWidth
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
                readOnly />
            </Grid>
          </Grid>
        </div>
      ))}

      <Button className='btn' type="button" onClick={handleAddAddress}>Add Address</Button>
      <Button className='btn' type="submit">Submit</Button>
    </form>
  );
};

export default CustomerForm;

