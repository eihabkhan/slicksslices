import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

const usePizza = ({ pizzas, values }) => {
  // 1. create state to hold order
  //   const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  // 2. create function     to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // 3. function to remove things from order
  const removeFromOrder = (index) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    console.log(e);
    setIsLoading(true);
    setError(null);
    // setMessage('Go eat!');
    // gather data to be sent
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      tajine: values.tajine,
    };

    //   TODO:
    // 4. send data to serverless function
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if all is working
    if (res.status >= 400 && res.status < 600) {
      setIsLoading(false);
      setError(text.message);
    } else {
      setIsLoading(false);
      setMessage('Success! Come on down for your pizza');
    }
  };

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    isLoading,
    message,
    submitOrder,
  };
};

export default usePizza;
