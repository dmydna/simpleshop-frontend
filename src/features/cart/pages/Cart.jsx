import { useCart } from "@features/cart/contexts/CartContext.jsx";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import MyOrderLayout from "@features/cart/layout/MyOrderLayout";
import FetchStateCart from "@/features/order/layout/FetchStateCart";
import { useAsync } from "@/hooks/useAsync";
import { orderService } from "@/features/order/services/orderService";
import { useNavigate } from "react-router-dom";
import { MyCart } from "../components/MyCart";


function Cart() {

  const cartHook = useCart()

  const navigate = useNavigate();

  const createOrder = useAsync(orderService.createMyOrder, 
    { onSuccess: (order) => navigate(`/checkouts/${order.orderId}`) })   

  return (

    <FetchStateCart
      hook={{ ...createOrder }}
      isEmpty={ cartHook.cartItems?.length == 0}
    >
      <Container fluid="xl" className="mt-4">
        <div className="h1 d-none">Cart</div>
        <Row className="g-0" md={4}>

          {/* MY CART */}

          <Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>
              
            <MyCart  className="p-4 island" {...cartHook} >
              <p className="h5 fw-bold">
                My cart({cartHook.cartItems.length})
              </p>
            </MyCart>
              
          </Col>

          {/* ORDER */}

          <Col className={`col-12 col-md-12 col-lg-12 col-xl-5`}>
            

            <MyOrderLayout createOrder={createOrder} {...cartHook} />

          </Col>
          <ToastContainer />
        </Row>
      </Container>

    </FetchStateCart>
  )

}

export default Cart;
