import CartNavButton from "./CartNavButton";

export default function CartAction({ createOrder, cartItems }) {
  const handleConfirmOrder = async () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    createOrder.execute(cartItems);
  };

  return (
    <div
      style={{ marginTop: "30px" }}
      className="d-flex justify-content-center gap-3 "
    >
      <CartNavButton
        visible={!createOrder.success}
        handle={() => handleConfirmOrder()}
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
