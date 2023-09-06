export const initialCalculations = (orders) => {
  let total = 0;
  orders &&
    orders?.order?.forEach((order) => {
      if (order.orderStatus === "Completed") {
        total += order.totalPrice;
      }
    });
  return total;
};
