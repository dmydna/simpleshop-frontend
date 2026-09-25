import CartNavButton from "@/features/cart/components/CartNavButton";

export default function CheckoutAction({cancelPay, confirmPay, orderId, clearCart}) {


  const handleCancel = () => cancelPay(orderId, clearCart);
  const handleConfirm = async () => {
    await confirmPay(clearCart);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div
      style={{ marginTop: "30px" }}
      className="d-flex justify-content-center gap-3"
    >

      <CartNavButton
        handle={handleCancel}
        title="Cancelar"
        variant="light"
        visible
      />

      <CartNavButton handle={handleConfirm} title="Continuar" visible />

      {/* <CartNavButton
        visible={true}
        variant="success disabled"
        title={"ENTREGADO"} //
        icon="bi bi-check-circle me-2"
      />*/}
    </div>

  )
}
