import calculatePizzaPrice from './calculatePizzaPrice';

const calculateOrderTotal = (order, pizzas) => {
  // 1. loop over each item in order
  console.log('ORDER:', order);
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((p) => p.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
  // 2. calc total for pizza
  // 3. add total to tab
};

export default calculateOrderTotal;
