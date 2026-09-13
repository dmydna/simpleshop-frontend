import { IconTint } from "@/components/common/FloatButtonCollection";
import { MyOrderDetail } from "@/features/order/components/MyOrderDetail";
import { MyOrderList } from "@/features/order/components/MyOrderList";
import { OrderDetailProvider } from "@/features/order/contexts/OrderDetailContext";
import { useOrder } from "@/features/order/hooks/useOrder";
import FormReview from "@/features/review/components/FormReview";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export default function OrderDetailPage() {

  const { hash } = useParams()
  const { setOrderHash, currentOrder, refreshElem, setCurrentOrder} = useOrder()
  const { idParam, pageVersion } = useUrlParams()
  const [ showReview, setShowReview ] = useState(false)
  const { searchParams, setSearchParams } = useUrlState()
  const navigate = useNavigate()

  useEffect(() => {
    if (hash){setOrderHash(hash);}
    if (pageVersion){refreshElem()}
  }, [hash, pageVersion])


  const closeReview = () => {
    setSearchParams(prev => ({...prev, id:null}))
  }

  return (

    <OrderDetailProvider 
        {...{
          showReview,
          setOrderHash, 
          setShowReview, 
          currentOrder, 
          setCurrentOrder
        }}
    >

      <Container fluid="xl" className="mt-4">
        <div className="h1 d-none">Cart</div>
        <Row className="g-0" md={4}>

          {/* MY CART */}

          <Col className={`col-12 col-md-12 col-lg-12 col-xl-7`}>
              

            <MyOrderList className="p-3 island">
              <div className="d-flex gap-2 align-items-center">
                < IconTint
                  className={'rounded-circle'}
                  action={()=>navigate('/user/purchases')}
                  icon={'chevron-left'}
                />
                <p className="h5 fw-bold pt-2">
                  My order
                </p>
            </div>
            </MyOrderList>


              
          </Col>

          {/* ORDER */}

          <Col className={`col-12 col-md-12 col-lg-12 col-xl-5`}>
            
            {!idParam && (
              <MyOrderDetail  currentOrder={ currentOrder } />
            )}
            {idParam && (
              <FormReview
                close={closeReview} 
                className={'p-3 island border'}
              />
            )}


          </Col>
          <ToastContainer />
        </Row>
      </Container>

    </OrderDetailProvider>
  )

}
