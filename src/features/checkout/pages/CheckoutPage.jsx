import CartNavButton from "@/features/cart/components/CartNavButton";
import { useCart } from "@/features/cart/contexts/CartContext";
import PaymentForm from "@/features/checkout/components/CheckoutForm";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { useValidationForm } from "@/features/form/hooks/useValidationForm";
import { MyOrderDetail } from "@/features/order/components/MyOrderDetail";
import { useOrder } from "@/features/order/hooks/useOrder";
import FetchStateCart from "@/features/order/layout/FetchStateCart";
import { useProfile } from "@/features/profile/contexts/ProfileContext";
import { useUrlParams } from "@/hooks/useUrlParams";
import { checkout } from "@/utils/schemas";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export default function CheckoutPage() {


  const { profile } = useProfile()
  const { orderId } = useParams()
  const { pageVersion } = useUrlParams()
  const { clearCart } = useCart()

  const { setOrderHash, currentOrder, refreshElem, loading: loadingOrder, errorOrder }
    = useOrder()

  const { cancelPay, confirmPay, loading, error: errorPurchase, setError, setSuccess, success: successPurchase }
    = useCheckout()

  const validateForm = useValidationForm({ ...profile, fullname: profile?.firstName + " " + profile?.lastName });

  useEffect(() => {
    if (orderId) { setOrderHash(orderId); }
    if (pageVersion) { refreshElem() }
  }, [orderId, pageVersion, successPurchase])


  const handleCancel = () => cancelPay(orderId, clearCart )
  const handleConfirm =  async () => {
    await confirmPay(clearCart)
    window.scrollTo({ top: 0, behavior: 'instant'});
  }; 

  // fixme: validacion ok, no ejecuta handleConfirm
  const handleConfirmValidate = () => validateForm.handleAction(handleConfirm, checkout)

  return (

    <FetchStateCart
      hook={{
        loading: loading || loadingOrder,
        error: errorPurchase || errorOrder, 
        success: successPurchase,
        setError, successPurchase, 
        setSuccess
      }}
      to={`/order/${currentOrder.id}`}
    >

      <Container fluid="xl" className="mt-4">
        <div className="h1 d-none">Cart</div>
        <Row className="g-0" md={4}>

          {/* MY CART */}

          <Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>

            <PaymentForm validateForm={validateForm} />

          </Col>

          {/* ORDER */}

          <Col className={`col-12 col-md-12 col-lg-12 col-xl-5`}>

            <MyOrderDetail currentOrder={currentOrder}>
              <CartNavButton
                handle={ handleCancel }
                title="Cancelar"
                variant="light"
                visible
              />

              <CartNavButton
                handle={ handleConfirm }
                title="Continuar"
                visible
              />

            </MyOrderDetail>

          </Col>
          <ToastContainer />
        </Row>
      </Container>

    </FetchStateCart>
  )

}
