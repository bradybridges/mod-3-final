export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const addOrder = async (name, ingredients) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name,
      ingredients,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }; 
  
  const result = await fetch('http://localhost:3001/api/v1/orders', options);
  return result;
}


