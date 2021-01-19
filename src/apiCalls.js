export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then((response) =>
    response.json()
  );
};

export const postOrder = (name, ingredients) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      ingredients: ingredients,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
