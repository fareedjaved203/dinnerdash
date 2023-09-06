export const increaseQuantity = (product, quantity, setQuantity) => {
  if (product.stock <= quantity) return;

  const qty = quantity + 1;
  setQuantity(qty);
};

export const decreaseQuantity = (quantity, setQuantity) => {
  if (1 >= quantity) return;
  const qty = quantity - 1;
  setQuantity(qty);
};

export const addToCartHandler = (
  id,
  quantity,
  dispatch,
  addItemsToCart,
  alert
) => {
  dispatch(addItemsToCart(id, quantity, alert));
};
