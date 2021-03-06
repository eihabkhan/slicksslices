const SIZES = {
  S: 0.74,
  M: 1,
  L: 1.25,
};

const calculatePizzaPrice = (cents, size) => cents * SIZES[size];

export default calculatePizzaPrice;
