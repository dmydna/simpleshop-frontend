import CartNavButton from "./CartNavButton";

export default function CartAction({ createOrder, cartItems, clearCart }) {
  const handleConfirmOrder = async () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    createOrder.execute(cartItems);
  };

  const handleClearCart = () => {
    clearCart()
  }

  return (
    <div
      style={{ marginTop: "30px" }}
      className="d-flex justify-content-center gap-3 "
    >
      <CartNavButton
        visible={!createOrder.success}
        handle={() => handleClearCart()}
        variant="light"
        title="Cancelar"
      />

      <CartNavButton
        visible={!createOrder.success}
        handle={() => handleConfirmOrder()}
        title="Continuar"
      />
    </div>
  );
}
