import CartNavButton from "@/features/cart/components/CartNavButton";
import { useCart } from "@/features/cart/contexts/CartContext";
import PaymentForm from "@/features/checkout/components/CheckoutForm";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { useValidationForm } from "@/features/form/hooks/useValidationForm";
import { MyOrderDetail } from "@/features/order/components/MyOrderDetail";
import { useOrder } from "@/features/order/hooks/useOrder";
import FetchStateCart from "@/features/order/layout/FetchStateCart";
import { useProfile } from "@/features/profile/contexts/ProfileContext";
import { PurchaseLayout } from "@/features/purchase/layout/PurchaseLayout";
import { useUrlParams } from "@/hooks/useUrlParams";
import { checkout } from "@/utils/schemas";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CheckoutAction from "../components/CheckoutAction";

export default function CheckoutPage() {
  const { profile } = useProfile();
  const { orderId } = useParams();
  const { pageVersion } = useUrlParams();
  const { clearCart } = useCart();

  const {
    setOrderHash,
    currentOrder,
    refreshElem,
    loading: loadingOrder,
    errorOrder,
  } = useOrder();

  const {
    cancelPay,
    confirmPay,
    loading,
    error: errorPurchase,
    setError,
    setSuccess,
    success: successPurchase,
  } = useCheckout();

  const validateForm = useValidationForm({
    ...profile,
    fullname: profile?.firstName + " " + profile?.lastName,
  });

  useEffect(() => {
    if (orderId) {
      setOrderHash(orderId);
    }
    if (pageVersion) {
      refreshElem();
    }
  }, [orderId, pageVersion, successPurchase]);

  // fixme: validacion ok, no ejecuta handleConfirm
  // const handleConfirmValidate = () => validateForm.handleAction(handleConfirm, checkout)

  return (
    // TODO: integrar <PurchaseLayout>
    <FetchStateCart
      hook={{
        loading: loading || loadingOrder,
        error: errorPurchase || errorOrder,
        success: successPurchase,
        setError,
        successPurchase,
        setSuccess,
      }}
      to={`/order/${currentOrder.id}`}
    >
      <PurchaseLayout>
        <PurchaseLayout.Main>
          <PaymentForm validateForm={validateForm} />
        </PurchaseLayout.Main>

        <PurchaseLayout.Detail>
          <MyOrderDetail currentOrder={currentOrder} />
          <CheckoutAction
            cancelPay={cancelPay}
            confirmPay={confirmPay}
            orderId={orderId}
            clearCart={clearCart}
          />
        </PurchaseLayout.Detail>
        <PurchaseLayout.Toolkit>
          <ToastContainer />
        </PurchaseLayout.Toolkit>
      </PurchaseLayout>
    </FetchStateCart>
  );
}
