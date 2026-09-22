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
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import CheckoutAction from "../components/CheckoutAction";
import { checkout } from "@/utils/schemas";
import ModalParam from "@/components/common/ModalParam";
import CancelOrderModal from "@/features/order/components/CancelOrderModal";


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

  const { usefetch, cancelPay, confirmPay } = useCheckout();

  const validateForm = useValidationForm({ ...profile, fullname: `${profile?.firstName} ${profile?.lastName}` });

  const checkout = useMemo(()=> usefetch ,[usefetch])
  
  useEffect(() => {
    if (orderId)     { setOrderHash(orderId); }
    if (pageVersion) { refreshElem(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, pageVersion, checkout.success]);

  // FIXME: validacion ok, no ejecuta handleConfirm
  // const handleConfirmValidate = () => validateForm.handleAction(handleConfirm, checkout)


  return (
    // TODO: integrar <PurchaseLayout>
    <FetchStateCart
      hook={{
        loading:    checkout.loading || loadingOrder,
        error:      checkout.error || errorOrder,
        success:    checkout.success,
        setError:   checkout.setError,
        setSuccess: checkout.setSuccess,
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
            <ModalParam param="dialog=cancel-order">
                {(close) => <CancelOrderModal close={close}  />}
            </ModalParam>
        </PurchaseLayout.Toolkit>
      </PurchaseLayout>
    </FetchStateCart>
  );
}
