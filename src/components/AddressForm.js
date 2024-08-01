import React, { useState, useEffect } from 'react';

const AddressForm = ({ address, onChange, onRemove, states, cities }) => {
  const [localAddress, setLocalAddress] = useState(address);

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalAddress((prev) => ({ ...prev, [name]: value }));
    onChange(name, value);
  };

  return (
    <div>
      <input
        type="text"
        name="line1"
        placeholder="Address Line 1"
        value={localAddress.line1}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="line2"
        placeholder="Address Line 2"
        value={localAddress.line2}
        onChange={handleChange}
      />
      <input
        type="text"
        name="postcode"
        placeholder="Postcode"
        value={localAddress.postcode}
        onChange={handleChange}
        required
      />
      <select
        name="state"
        value={localAddress.state}
        onChange={handleChange}
        required
      >
        {states.map((state) => (
          <option key={state.id} value={state.name}>
            {state.name}
          </option>
        ))}
      </select>
      <select
        name="city"
        value={localAddress.city}
        onChange={handleChange}
        required
      >
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={onRemove}>Remove Address</button>
    </div>
  );
};

export default AddressForm;
