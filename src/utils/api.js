export const verifyPAN = async (panNumber) => {
    const response = await fetch('https://lab.pixel6.co/api/verify-pan.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ panNumber }),
    });
    return response.json();
  };
  
  export const getPostcodeDetails = async (postcode) => {
    const response = await fetch('https://lab.pixel6.co/api/get-postcode-details.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postcode }),
    });
    return response.json();
  };
  